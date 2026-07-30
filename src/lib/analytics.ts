import { trackPageview, trackHeartbeat, trackEvent } from "@/lib/analytics.functions";

const VISITOR_KEY = "msg-visitor-id";
const SESSION_KEY = "msg-session-id";

function uid() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function persistentId(storage: Storage, key: string) {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const created = uid();
    storage.setItem(key, created);
    return created;
  } catch {
    return uid();
  }
}

function detectDevice(ua: string) {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(ua: string) {
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/SamsungBrowser/.test(ua)) return "Samsung Internet";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Lainnya";
}

function detectOs(ua: string) {
  if (/Windows/.test(ua)) return "Windows";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Lainnya";
}

let visitId: string | null = null;
let visitorId = "";
let sessionId = "";
let startedAt = 0;
let maxScroll = 0;
let started = false;

function currentScroll() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)));
}

function flush() {
  if (!visitId) return;
  void trackHeartbeat({
    data: {
      visitId,
      durationSeconds: Math.min(86400, Math.round((Date.now() - startedAt) / 1000)),
      scrollDepth: maxScroll,
    },
  }).catch(() => undefined);
}

export function logEvent(eventName: string, eventLabel?: string) {
  if (typeof window === "undefined" || !visitorId) return;
  void trackEvent({
    data: {
      visitId,
      visitorId,
      sessionId,
      eventName,
      eventLabel: eventLabel ?? null,
      path: window.location.pathname,
    },
  }).catch(() => undefined);
}

export function startAnalytics() {
  if (typeof window === "undefined" || started) return;
  started = true;
  startedAt = Date.now();

  visitorId = persistentId(window.localStorage, VISITOR_KEY);
  sessionId = persistentId(window.sessionStorage, SESSION_KEY);

  const ua = navigator.userAgent;
  const params = new URLSearchParams(window.location.search);
  let referrerDomain: string | null = null;
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      referrerDomain = host === window.location.hostname ? null : host;
    } catch {
      referrerDomain = null;
    }
  }

  void trackPageview({
    data: {
      visitorId,
      sessionId,
      path: window.location.pathname,
      deviceType: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOs(ua),
      screenW: window.screen?.width ?? null,
      screenH: window.screen?.height ?? null,
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
      referrerDomain,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      language: navigator.language ?? null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    },
  })
    .then((res) => {
      visitId = res.visitId;
    })
    .catch(() => undefined);

  const onScroll = () => {
    maxScroll = Math.max(maxScroll, currentScroll());
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const interval = window.setInterval(flush, 20000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);

  return () => {
    window.clearInterval(interval);
    window.removeEventListener("scroll", onScroll);
  };
}
