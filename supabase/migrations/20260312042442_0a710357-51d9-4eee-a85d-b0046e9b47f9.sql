CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  package_name text NOT NULL,
  session_date date NOT NULL,
  session_time text NOT NULL DEFAULT '10:00 AM',
  stripe_session_id text,
  payment_status text NOT NULL DEFAULT 'pending',
  amount_cents integer NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.bookings
  FOR ALL USING (true) WITH CHECK (true);