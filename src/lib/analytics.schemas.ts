import { z } from "zod";

const str = (max: number) => z.string().trim().max(max).optional().nullable();

export const pageviewSchema = z.object({
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

export const heartbeatSchema = z.object({
  visitId: z.string().uuid(),
  durationSeconds: z.number().int().min(0).max(86400),
  scrollDepth: z.number().int().min(0).max(100),
});

export const eventSchema = z.object({
  visitId: z.string().uuid().optional().nullable(),
  visitorId: z.string().trim().min(1).max(64),
  sessionId: z.string().trim().min(1).max(64),
  eventName: z.string().trim().min(1).max(60),
  eventLabel: str(120),
  path: str(300),
});

export const statsSchema = z.object({ days: z.number().int().min(1).max(365) });

export type PageviewInput = z.infer<typeof pageviewSchema>;
export type EventInput = z.infer<typeof eventSchema>;
