CREATE TABLE public.page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  visitor_id text NOT NULL,
  session_id text NOT NULL,
  path text NOT NULL DEFAULT '/',
  device_type text,
  browser text,
  os text,
  screen_w integer,
  screen_h integer,
  referrer text,
  referrer_domain text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  language text,
  timezone text,
  country text,
  city text,
  duration_seconds integer NOT NULL DEFAULT 0,
  scroll_depth integer NOT NULL DEFAULT 0
);

GRANT ALL ON public.page_visits TO service_role;
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

CREATE INDEX page_visits_created_at_idx ON public.page_visits (created_at DESC);
CREATE INDEX page_visits_session_idx ON public.page_visits (session_id);
CREATE INDEX page_visits_visitor_idx ON public.page_visits (visitor_id);

CREATE TABLE public.visit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  visit_id uuid REFERENCES public.page_visits(id) ON DELETE CASCADE,
  visitor_id text NOT NULL,
  session_id text NOT NULL,
  event_name text NOT NULL,
  event_label text,
  path text
);

GRANT ALL ON public.visit_events TO service_role;
ALTER TABLE public.visit_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX visit_events_created_at_idx ON public.visit_events (created_at DESC);
CREATE INDEX visit_events_name_idx ON public.visit_events (event_name);