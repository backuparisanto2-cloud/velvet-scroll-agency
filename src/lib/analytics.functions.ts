import { createServerFn } from "@tanstack/react-start";
import {
  pageviewSchema,
  heartbeatSchema,
  eventSchema,
  statsSchema,
} from "@/lib/analytics.schemas";

export const trackPageview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pageviewSchema.parse(data))
  .handler(async ({ data }) => {
    const { insertPageview } = await import("@/lib/analytics.server");
    return insertPageview(data);
  });

export const trackHeartbeat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => heartbeatSchema.parse(data))
  .handler(async ({ data }) => {
    const { updateVisit } = await import("@/lib/analytics.server");
    return updateVisit(data);
  });

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const { insertEvent } = await import("@/lib/analytics.server");
    return insertEvent(data);
  });

export const getVisitorStats = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => statsSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildStats } = await import("@/lib/analytics.server");
    return buildStats(data.days);
  });
