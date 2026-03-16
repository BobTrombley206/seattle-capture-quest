import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trackBookNowClick } from "@/lib/analytics";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const CtaSection = () => (
  <section className="py-32">
    <div className="container max-w-2xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-5xl mb-4"
      >
        Turn Your Seattle Trip Into Beautiful Memories
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.1 }}
        className="text-muted-foreground mb-8"
      >
        Professional portraits at Seattle's most iconic locations.
      </motion.p>
      <Link to="/book" onClick={() => trackBookNowClick()}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold shadow-card hover:shadow-card-hover transition-shadow"
        >
          Reserve Your Photo Walk
        </motion.span>
      </Link>
    </div>
  </section>
);

export default CtaSection;
