
-- User roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Site content (key/value)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read public site content
CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert content"
  ON public.site_content FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content"
  ON public.site_content FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content"
  ON public.site_content FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed default content
INSERT INTO public.site_content (key, value) VALUES
  ('contact_phone', '+92 3166513780'),
  ('contact_email', 'apexforex0@gmail.com'),
  ('contact_address', 'Plot Number 44 45 Mumtaz Market Gujranwala, Pakistan'),
  ('contact_hours', 'Monday – Saturday · 9:00 AM – 6:00 PM'),
  ('maps_url', 'https://www.google.com/maps/place/Forex+Trading+Academy+%7C+Apex+Forex+Trading+Academy+%7C+Forex+Trading+Course+near+Gujranwala+%7C+Forex+trading/data=!4m2!3m1!1s0x0:0xf98e8b0378baa157?sa=X&ved=1t:2428&ictx=111&cshid=1783603530019561'),
  ('social_instagram', 'https://www.instagram.com/apexforexacademy?igsh=MTNyeW5jcThqa29u'),
  ('social_telegram', 'https://t.me/apexforexacademy'),
  ('social_tiktok', 'https://www.tiktok.com/@apex.forex.academy?_r=1&_t=ZS-97cK7bAxcAL'),
  ('social_youtube', 'https://www.youtube.com/@apexforexacademy'),
  ('social_facebook', 'https://www.facebook.com/share/1EniqmTA4D/?mibextid=wwXIfr'),
  ('social_whatsapp', 'https://wa.me/923166513780');
