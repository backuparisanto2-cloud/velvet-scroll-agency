import { getRequestHeader } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { PageviewInput, EventInput } from "./analytics.schemas";

export function readGeo() {
  const country =
    getRequestHeader("cf-ipcountry") ?? getRequestHeader("x-vercel-ip-country") ?? null;
  const rawCity = getRequestHeader("cf-ipcity") ?? getRequestHeader("x-vercel-ip-city") ?? null;
  let city: string | null = rawCity;
  if (city) {
    try {
      city = decodeURIComponent(city);
    } catch {
      /* keep raw value */
    }
  }
  return {
    country: country && country !== "XX" ? country.slice(0, 80) : null,
    city: city ? city.slice(0, 120) : null,
  };
}

export async function insertPageview(data: PageviewInput) {
  const geo = readGeo();
  const { data: row, error } = await supabaseAdmin
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
  const { error } = await supabaseAdmin
    .from("page_visits")
    .update({ duration_seconds: input.durationSeconds, scroll_depth: input.scrollDepth })
    .eq("id", input.visitId);
  if (error) console.error("[analytics] heartbeat failed", error.message);
  return { ok: !error };
}

export async function insertEvent(data: EventInput) {
  const { error } = await supabaseAdmin.from("visit_events").insert({
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
    supabaseAdmin
      .from("page_visits")
      .select(
        "id, created_at, visitor_id, session_id, path, device_type, browser, os, referrer_domain, utm_source, utm_medium, utm_campaign, language, timezone, country, city, duration_seconds, scroll_depth",
      )
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000),
    supabaseAdmin
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
      location: [v.city, v.country].filter(Boolean).join(", ") || "-",
      source: (v.referrer_domain as string) || "langsung",
      duration: (v.duration_seconds as number) ?? 0,
      scroll: (v.scroll_depth as number) ?? 0,
    })),
  };
}

export type VisitorStats = Awaited<ReturnType<typeof buildStats>>;
