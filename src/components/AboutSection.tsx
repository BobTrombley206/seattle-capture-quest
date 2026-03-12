import { motion } from "framer-motion";
import heroWaterfront from "@/assets/hero-waterfront.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="rounded-2xl overflow-hidden shadow-elevated aspect-[4/5]"
      >
        <img src={heroWaterfront} alt="Your Seattle photographer" className="w-full h-full object-cover img-frame" loading="lazy" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-3xl sm:text-4xl">Your Local Seattle Guide</h2>
        <p className="text-muted-foreground">
          I'm a photographer and lifelong Pacific Northwest local who knows every corner of Pike Place Market, Pioneer Square, and the downtown waterfront.
        </p>
        <p className="text-muted-foreground">
          My photo walks combine authentic local storytelling with professional photography — so you don't just get beautiful images, you get a genuine Seattle experience with stories and hidden spots you won't find in any guidebook.
        </p>
        <motion.a
          href="#packages"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-card hover:shadow-card-hover transition-shadow self-start mt-2"
        >
          Book a Session
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
