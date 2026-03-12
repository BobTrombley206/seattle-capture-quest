import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Camera, ImageDown } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const steps = [
  { icon: CalendarCheck, title: "Book your time online", desc: "Choose a session and reserve your spot." },
  { icon: MapPin, title: "Meet your photographer", desc: "We'll meet you in downtown Seattle." },
  { icon: Camera, title: "Walk through iconic locations", desc: "Explore Pike Place, the waterfront, and more." },
  { icon: ImageDown, title: "Receive edited photos within 24 hours", desc: "Delivered to your inbox, ready to share." },
];

const HowItWorksSection = () => (
  <section className="py-16 bg-secondary/50">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-4xl text-center mb-12"
      >
        How It Works
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <s.icon size={24} className="text-primary" />
            </div>
            <h3 className="text-base font-bold">{s.title}</h3>
            <p className="text-meta text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
