import { useEffect, useState } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import { supabase } from "@/integrations/supabase/client";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface BookingDetails {
  customer_name: string;
  package_name: string;
  amount_cents: number;
  session_date: string;
  session_time: string;
}

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    supabase
      .from("bookings")
      .select("customer_name, package_name, amount_cents, session_date, session_time")
      .eq("stripe_session_id", sessionId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setBooking(data);
      });
  }, [sessionId]);

  const packageName = booking?.package_name ?? "Seattle Photo Walk";
  const price = booking ? `$${(booking.amount_cents / 100).toFixed(0)}` : "$150";

  return (
    <>
      <PageSEO
        title="Booking Confirmed | PNW Portraits Seattle Photo Walk"
        description="Your Seattle photo session is confirmed! Check your email for session details. Edited photos delivered within 24 hours."
        noindex
      />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="w-full max-w-lg text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={spring}
            className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-3"
          >
            Your Seattle Photo Walk is Booked!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="text-muted-foreground mb-6"
          >
            Your booking was successful. You'll receive confirmation details and
            meeting point info by email shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardContent className="pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium text-foreground">{packageName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-foreground">{price}</span>
                </div>
                {booking?.session_date && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{booking.session_date}</span>
                  </div>
                )}
                {booking?.session_time && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{booking.session_time}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button asChild>
              <a href="https://pnwportraits.com">
                Return to Home <ExternalLink size={14} className="ml-1" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/book">Book Another Photo Walk</Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-xs text-muted-foreground mt-6"
          >
            Your edited photos will be delivered within 24 hours of your session.
          </motion.p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingSuccess;
