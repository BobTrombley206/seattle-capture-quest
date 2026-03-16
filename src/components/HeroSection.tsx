import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Camera, Clock, MapPin } from "lucide-react";
import { trackBookNowClick } from "@/lib/analytics";
import heroPikePlace from "@/assets/hero-pike-place.jpg";
import heroWaterfront from "@/assets/hero-waterfront.jpg";
import heroCouple from "@/assets/hero-couple.jpg";
import heroSkyline from "@/assets/hero-skyline.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} className="relative min-h-svh flex items-center pt-16 overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-0">
        {/* Text */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            Capture Your Seattle Adventure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="text-meta text-sm"
          >
            📍 Pike Place Market • Waterfront • Downtown Seattle
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-muted-foreground max-w-[50ch]"
          >
            Professional portraits at Seattle's most iconic locations. Explore the city with a local photographer and leave with beautiful photos of your trip.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-card hover:shadow-card-hover transition-shadow"
            >
              Book Your Photo Walk
            </motion.a>
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-card text-foreground font-bold text-sm shadow-card hover:shadow-card-hover transition-shadow"
            >
              View Packages
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
            className="flex flex-col gap-2 mt-2"
          >
            {[
              { icon: Clock, text: "Photos delivered within 24 hours" },
              { icon: MapPin, text: "Guided by a local Seattle photographer" },
              { icon: Camera, text: "Perfect for couples, solo travelers, families, and content creators" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-meta text-sm">
                <Icon size={14} className="text-primary flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image collage */}
        <div className="lg:col-span-7 relative grid grid-cols-6 grid-rows-4 gap-3 h-[400px] sm:h-[500px] lg:h-[600px]">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="col-span-4 row-span-3 rounded-2xl overflow-hidden"
          >
            <img src={heroPikePlace} alt="Couple at Pike Place Market Seattle" className="w-full h-full object-cover img-frame" loading="eager" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden"
          >
            <img src={heroWaterfront} alt="Solo traveler at Seattle waterfront" className="w-full h-full object-cover img-frame" loading="eager" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.45 }}
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden"
          >
            <img src={heroCouple} alt="Couple laughing in downtown Seattle" className="w-full h-full object-cover img-frame" loading="eager" />
          </motion.div>
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.55 }}
            className="col-span-4 row-span-1 rounded-2xl overflow-hidden"
          >
            <img src={heroSkyline} alt="Seattle skyline at sunset" className="w-full h-full object-cover img-frame" loading="eager" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
