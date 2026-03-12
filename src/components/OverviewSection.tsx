import { motion } from "framer-motion";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const OverviewSection = () => (
  <section className="py-24">
    <div className="container max-w-3xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-4xl mb-6"
      >
        Your Seattle Story, Beautifully Told
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.1 }}
        className="text-muted-foreground mb-4"
      >
        PNW Portraits offers guided photo walks through Seattle's most photogenic locations. Guests explore Pike Place Market, the waterfront, and historic downtown while a professional photographer captures beautiful portraits and candid moments.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.15 }}
        className="text-muted-foreground mb-4"
      >
        Perfect for travelers who want professional photos of their Seattle adventure.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.2 }}
        className="text-foreground font-bold"
      >
        Photos delivered within 24 hours.
      </motion.p>
    </div>
  </section>
);

export default OverviewSection;
