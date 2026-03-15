import { motion } from "framer-motion";
import { Camera, Mail, Instagram } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0.1 };

const ComingSoon = () => {
  return (
    <>
      <PageSEO
        title="PNW Portraits — Coming Soon | Seattle Photo Walk Experiences"
        description="PNW Portraits is launching soon. Professional photo walk experiences through Seattle's iconic landmarks. Sign up to be the first to know."
      />
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              PNW Portraits
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            Something beautiful
            <br />
            is coming.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="text-muted-foreground text-lg mb-10 max-w-md mx-auto"
          >
            Professional photo walk experiences through Seattle's most iconic
            spots. Launching soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="mailto:cloudyandcoolprod@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <a
              href="https://instagram.com/pnwportraits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Follow Along
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.4 }}
            className="text-xs text-muted-foreground"
          >
            © {new Date().getFullYear()} PNW Portraits · Seattle, WA
          </motion.p>
        </div>
      </main>
    </>
  );
};

export default ComingSoon;
