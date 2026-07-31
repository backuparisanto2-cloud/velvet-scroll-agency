GRANT SELECT, INSERT, UPDATE ON public.page_visits TO anon, authenticated;
GRANT SELECT, INSERT ON public.visit_events TO anon, authenticated;
GRANT ALL ON public.page_visits TO service_role;
GRANT ALL ON public.visit_events TO service_role;

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public insert page_visits" ON public.page_visits;
DROP POLICY IF EXISTS "public update page_visits" ON public.page_visits;
DROP POLICY IF EXISTS "public read page_visits" ON public.page_visits;
DROP POLICY IF EXISTS "public insert visit_events" ON public.visit_events;
DROP POLICY IF EXISTS "public read visit_events" ON public.visit_events;

CREATE POLICY "public insert page_visits" ON public.page_visits FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public update page_visits" ON public.page_visits FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "public read page_visits" ON public.page_visits FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public insert visit_events" ON public.visit_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public read visit_events" ON public.visit_events FOR SELECT TO anon, authenticated USING (true);