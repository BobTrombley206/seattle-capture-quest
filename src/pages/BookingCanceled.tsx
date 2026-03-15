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
      title="Booking Canceled | PNW Portraits"
      description="Your booking was canceled and you have not been charged. Feel free to try again whenever you're ready."
      noindex
    />
    <Navbar />
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="w-full max-w-lg text-center">
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
          className="text-3xl sm:text-4xl font-bold mb-3"
        >
          Booking Canceled
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="text-muted-foreground mb-8"
        >
          It looks like the checkout process was canceled. You can return
          anytime to schedule your Seattle Photo Walk.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild>
            <Link to="/book">Try Booking Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://pnwportraits.com">Return to Home</a>
          </Button>
        </motion.div>
      </div>
    </main>
    <Footer />
  </>
);

export default BookingCanceled;
