import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const BookingSuccess = () => (
  <>
    <PageSEO
      title="Booking Confirmed"
      description="Your Seattle photo session is confirmed! Check your email for session details. Edited photos delivered within 24 hours."
      noindex
    />
    <Navbar />
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container max-w-lg text-center">
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
          className="text-3xl mb-3"
        >
          You're Booked!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="text-muted-foreground mb-2"
        >
          Payment confirmed. Check your email for session details and meeting
          point info.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="text-sm text-muted-foreground mb-8"
        >
          Your edited photos will be delivered within 24 hours of your session.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: 0.25 }}
        >
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </main>
    <Footer />
  </>
);

export default BookingSuccess;
