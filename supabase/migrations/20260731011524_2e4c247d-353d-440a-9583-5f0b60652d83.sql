ALTER TABLE public.page_visits
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS isp text,
  ADD COLUMN IF NOT EXISTS asn text;