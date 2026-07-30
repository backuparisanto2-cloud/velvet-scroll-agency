import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export default function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/mystats")) return;
    let cleanup: (() => void) | undefined;
    void import("@/lib/analytics").then((mod) => {
      cleanup = mod.startAnalytics();
    });
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
