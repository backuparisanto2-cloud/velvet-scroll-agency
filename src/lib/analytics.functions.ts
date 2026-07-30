import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const str = (max: number) => z.string().trim().max(max).optional().nullable();

const pageviewSchema = z.object({
  visitorId: z.string().trim().min(1).max(64),
  sessionId: z.string().trim().min(1).max(64),
  path: z.string().trim().min(1).max(300),
  deviceType: str(20),
  browser: str(40),
  os: str(40),
  screenW: z.number().int().min(0).max(20000).optional().nullable(),
  screenH: z.number().int().min(0).max(20000).optional().nullable(),
  referrer: str(500),
  referrerDomain: str(200),
  utmSource: str(120),
  utmMedium: str(120),
  utmCampaign: str(120),
  language: str(20),
  timezone: str(80),
});

const heartbeatSchema = z.object({
  visitId: z.string().uuid(),
  durationSeconds: z.number().int().min(0).max(86400),
  scrollDepth: z.number().int().min(0).max(100),
});

const eventSchema = z.object({
  visitId: z.string().uuid().optional().nullable(),
  visitorId: z.string().trim().min(1).max(64),
  sessionId: z.string().trim().min(1).max(64),
  eventName: z.string().trim().min(1).max(60),
  eventLabel: str(120),
  path: str(300),
});

const statsSchema = z.object({ days: z.number().int().min(1).max(365) });

function readGeo() {
  const country =
    getRequestHeader("cf-ipcountry") ?? getRequestHeader("x-vercel-ip-country") ?? null;
  const rawCity = getRequestHeader("cf-ipcity") ?? getRequestHeader("x-vercel-ip-city") ?? null;
  let city = rawCity;
  if (city) {
    try {
      city = decodeURIComponent(city);
    } catch {
      /* keep raw */
    }
  }
  return {
    country: country && country !== "XX" ? country.slice(0, 80) : null,
    city: city ? city.slice(0, 120) : null,
  };
}

export const trackPageview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pageviewSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
      console.error("[analytics] pageview insert failed", error);
      return { visitId: null as string | null };
    }
    return { visitId: row.id as string };
  });

export const trackHeartbeat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => heartbeatSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("page_visits")
      .update({
        duration_seconds: data.durationSeconds,
        scroll_depth: data.scrollDepth,
      })
      .eq("id", data.visitId);
    if (error) console.error("[analytics] heartbeat failed", error);
    return { ok: !error };
  });

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("visit_events").insert({
      visit_id: data.visitId ?? null,
      visitor_id: data.visitorId,
      session_id: data.sessionId,
      event_name: data.eventName,
      event_label: data.eventLabel ?? null,
      path: data.path ?? null,
    });
    if (error) console.error("[analytics] event insert failed", error);
    return { ok: !error };
  });

export const getVisitorStats = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => statsSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();

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

    const count = <T,>(rows: T[], pick: (r: T) => string | null | undefined) => {
      const map = new Map<string, number>();
      for (const r of rows) {
        const key = (pick(r) ?? "").trim() || "(tidak diketahui)";
        map.set(key, (map.get(key) ?? 0) + 1);
      }
      return [...map.entries()]
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);
    };

    const byDayMap = new Map<string, number>();
    for (let i = data.days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      byDayMap.set(d, 0);
    }
    const byHour = Array.from({ length: 24 }, (_, h) => ({ label: `${h}:00`, value: 0 }));

    const sessions = new Map<string, number>();
    for (const v of visits) {
      const day = String(v.created_at).slice(0, 10);
      if (byDayMap.has(day)) byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
      const hour = new Date(v.created_at as string).getHours();
      byHour[hour].value += 1;
      sessions.set(v.session_id, (sessions.get(v.session_id) ?? 0) + 1);
    }

    const totalVisits = visits.length;
    const totalDuration = visits.reduce((a, v) => a + (v.duration_seconds ?? 0), 0);
    const totalScroll = visits.reduce((a, v) => a + (v.scroll_depth ?? 0), 0);
    const bouncedSessions = [...sessions.values()].filter((n) => n === 1).length;

    return {
      summary: {
        totalVisits,
        uniqueVisitors: new Set(visits.map((v) => v.visitor_id)).size,
        sessions: sessions.size,
        avgDuration: totalVisits ? Math.round(totalDuration / totalVisits) : 0,
        bounceRate: sessions.size ? Math.round((bouncedSessions / sessions.size) * 100) : 0,
        avgScroll: totalVisits ? Math.round(totalScroll / totalVisits) : 0,
        totalEvents: events.length,
      },
      byDay: [...byDayMap.entries()].map(([label, value]) => ({ label, value })),
      byHour,
      byDevice: count(visits, (v) => v.device_type),
      byBrowser: count(visits, (v) => v.browser),
      byOs: count(visits, (v) => v.os),
      byLanguage: count(visits, (v) => v.language),
      byCountry: count(visits, (v) => v.country),
      byCity: count(visits, (v) => v.city),
      byReferrer: count(visits, (v) => v.referrer_domain || "langsung"),
      byCampaign: count(
        visits.filter((v) => v.utm_source || v.utm_campaign),
        (v) => [v.utm_source, v.utm_medium, v.utm_campaign].filter(Boolean).join(" / "),
      ),
      byPath: count(visits, (v) => v.path),
      byEvent: count(events, (e) => e.event_name),
      byEventLabel: count(
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
  });
