import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const BookingCanceled = () => (
  <>
    <PageSEO
      title="Booking Canceled"
      description="Your booking was canceled and you have not been charged. Feel free to try again whenever you're ready."
      noindex
    />
    <Navbar />
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container max-w-lg text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={spring}
          className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={40} className="text-destructive" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="text-3xl mb-3"
        >
          Booking Canceled
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="text-muted-foreground mb-8"
        >
          No worries — your session wasn't booked and you haven't been charged.
          Feel free to try again whenever you're ready.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="flex gap-3 justify-center"
        >
          <Button asChild>
            <Link to="/book">Try Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </main>
    <Footer />
  </>
);

export default BookingCanceled;
