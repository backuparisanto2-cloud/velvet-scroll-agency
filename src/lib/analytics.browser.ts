/**
 * Analytics jalan penuh di browser agar situs bisa di-host sebagai file statis
 * (Apache/public_html) tanpa runtime Node. Akses data memakai kunci publishable
 * + RLS publik pada tabel page_visits / visit_events.
 */
import { supabase } from "@/integrations/supabase/client";
import { pageviewSchema, heartbeatSchema, eventSchema } from "@/lib/analytics.schemas";
import type { PageviewInput, EventInput } from "@/lib/analytics.schemas";

type IpGeo = {
  ip: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  asn: string | null;
};

const EMPTY_GEO: IpGeo = {
  ip: null,
  country: null,
  city: null,
  region: null,
  isp: null,
  asn: null,
};

let geoPromise: Promise<IpGeo> | undefined;

/** Ambil IP + geolokasi pengunjung dari layanan publik (sekali per sesi halaman). */
export function lookupSelfGeo(): Promise<IpGeo> {
  if (geoPromise) return geoPromise;
  geoPromise = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(
        "https://ipwho.is/?fields=success,ip,country,city,region,connection",
        { signal: controller.signal },
      );
      clearTimeout(timer);
      if (!res.ok) return EMPTY_GEO;
      const json = (await res.json()) as {
        success?: boolean;
        ip?: string;
        country?: string;
        city?: string;
        region?: string;
        connection?: { isp?: string; org?: string; asn?: number };
      };
      if (!json.success) return EMPTY_GEO;
      return {
        ip: json.ip?.slice(0, 64) ?? null,
        country: json.country?.slice(0, 80) ?? null,
        city: json.city?.slice(0, 120) ?? null,
        region: json.region?.slice(0, 120) ?? null,
        isp: (json.connection?.isp ?? json.connection?.org)?.slice(0, 160) ?? null,
        asn: json.connection?.asn ? `AS${json.connection.asn}` : null,
      };
    } catch {
      return EMPTY_GEO;
    }
  })();
  return geoPromise;
}

export async function insertPageview(input: PageviewInput) {
  const data = pageviewSchema.parse(input);
  const geo = await lookupSelfGeo();
  const { data: row, error } = await supabase
    .from("page_visits")
    .insert({
      visitor_id: data.visitorId,
      session_id: data.sessionId,
      path: data.path,
      device_type: data.deviceType ?? null,
      browser: data.browser ?? null,
      os: data.os ?? null,
      screen_w: data.screenW ?? null,
      screen_h: data.screenH ?? null,
      referrer: data.referrer ?? null,
      referrer_domain: data.referrerDomain ?? null,
      utm_source: data.utmSource ?? null,
      utm_medium: data.utmMedium ?? null,
      utm_campaign: data.utmCampaign ?? null,
      language: data.language ?? null,
      timezone: data.timezone ?? null,
      country: geo.country,
      city: geo.city,
      region: geo.region,
      isp: geo.isp,
      asn: geo.asn,
      ip_address: geo.ip,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[analytics] pageview insert failed", error.message);
    return { visitId: null as string | null };
  }
  return { visitId: row.id as string };
}

export async function updateVisit(input: {
  visitId: string;
  durationSeconds: number;
  scrollDepth: number;
}) {
  const data = heartbeatSchema.parse(input);
  const { error } = await supabase
    .from("page_visits")
    .update({ duration_seconds: data.durationSeconds, scroll_depth: data.scrollDepth })
    .eq("id", data.visitId);
  if (error) console.error("[analytics] heartbeat failed", error.message);
  return { ok: !error };
}

export async function insertEvent(input: EventInput) {
  const data = eventSchema.parse(input);
  const { error } = await supabase.from("visit_events").insert({
    visit_id: data.visitId ?? null,
    visitor_id: data.visitorId,
    session_id: data.sessionId,
    event_name: data.eventName,
    event_label: data.eventLabel ?? null,
    path: data.path ?? null,
  });
  if (error) console.error("[analytics] event insert failed", error.message);
  return { ok: !error };
}

type CountRow = { label: string; value: number };

function tally<T>(rows: T[], pick: (r: T) => string | null | undefined): CountRow[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = (pick(r) ?? "").trim() || "(tidak diketahui)";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export async function buildStats(days: number) {
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const [visitsRes, eventsRes] = await Promise.all([
    supabase
      .from("page_visits")
      .select(
        "id, created_at, visitor_id, session_id, path, device_type, browser, os, referrer_domain, utm_source, utm_medium, utm_campaign, language, timezone, country, city, region, isp, asn, ip_address, duration_seconds, scroll_depth",
      )
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000),
    supabase
      .from("visit_events")
      .select("event_name, event_label, created_at")
      .gte("created_at", since)
      .limit(20000),
  ]);

  if (visitsRes.error) throw new Error(visitsRes.error.message);

  const visits = visitsRes.data ?? [];
  const events = eventsRes.data ?? [];

  const byDayMap = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    byDayMap.set(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), 0);
  }
  const byHour = Array.from({ length: 24 }, (_, h) => ({
    label: `${String(h).padStart(2, "0")}:00`,
    value: 0,
  }));

  const sessions = new Map<string, number>();
  for (const v of visits) {
    const day = String(v.created_at).slice(0, 10);
    if (byDayMap.has(day)) byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
    const hour = new Date(v.created_at as string).getUTCHours();
    byHour[hour].value += 1;
    sessions.set(v.session_id, (sessions.get(v.session_id) ?? 0) + 1);
  }

  const totalVisits = visits.length;
  const totalDuration = visits.reduce((a, v) => a + (v.duration_seconds ?? 0), 0);
  const totalScroll = visits.reduce((a, v) => a + (v.scroll_depth ?? 0), 0);
  const bounced = [...sessions.values()].filter((n) => n === 1).length;

  return {
    summary: {
      totalVisits,
      uniqueVisitors: new Set(visits.map((v) => v.visitor_id)).size,
      sessions: sessions.size,
      avgDuration: totalVisits ? Math.round(totalDuration / totalVisits) : 0,
      bounceRate: sessions.size ? Math.round((bounced / sessions.size) * 100) : 0,
      avgScroll: totalVisits ? Math.round(totalScroll / totalVisits) : 0,
      totalEvents: events.length,
    },
    byDay: [...byDayMap.entries()].map(([label, value]) => ({ label, value })),
    byHour,
    byDevice: tally(visits, (v) => v.device_type),
    byBrowser: tally(visits, (v) => v.browser),
    byOs: tally(visits, (v) => v.os),
    byLanguage: tally(visits, (v) => v.language),
    byCountry: tally(visits, (v) => v.country),
    byCity: tally(visits, (v) => v.city),
    byReferrer: tally(visits, (v) => v.referrer_domain || "langsung"),
    byCampaign: tally(
      visits.filter((v) => v.utm_source || v.utm_campaign),
      (v) => [v.utm_source, v.utm_medium, v.utm_campaign].filter(Boolean).join(" / "),
    ),
    byPath: tally(visits, (v) => v.path),
    byIp: tally(visits, (v) => v.ip_address),
    byRegion: tally(visits, (v) => v.region),
    byIsp: tally(visits, (v) => v.isp),
    byAsn: tally(
      visits.filter((v) => v.asn),
      (v) => v.asn,
    ),
    byEvent: tally(events, (e) => e.event_name),
    byEventLabel: tally(
      events.filter((e) => e.event_label),
      (e) => e.event_label,
    ),
    recent: visits.slice(0, 50).map((v) => ({
      createdAt: v.created_at as string,
      path: v.path as string,
      device: (v.device_type as string) ?? "-",
      browser: (v.browser as string) ?? "-",
      os: (v.os as string) ?? "-",
      location: [v.city, v.region, v.country].filter(Boolean).join(", ") || "-",
      isp: (v.isp as string) ?? "-",
      source: (v.referrer_domain as string) || "langsung",
      ip: (v.ip_address as string) ?? "-",
      duration: (v.duration_seconds as number) ?? 0,
      scroll: (v.scroll_depth as number) ?? 0,
    })),
  };
}

export type VisitorStats = Awaited<ReturnType<typeof buildStats>>;
