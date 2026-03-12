DROP POLICY "Service role full access" ON public.bookings;

CREATE POLICY "No public access" ON public.bookings
  FOR SELECT USING (false);