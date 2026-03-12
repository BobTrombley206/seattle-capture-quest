import { motion } from "framer-motion";
import heroPikePlace from "@/assets/hero-pike-place.jpg";
import heroSkyline from "@/assets/hero-skyline.jpg";
import heroWaterfront from "@/assets/hero-waterfront.jpg";
import heroCouple from "@/assets/hero-couple.jpg";
import galleryGumwall from "@/assets/gallery-gumwall.jpg";
import gallerySunset from "@/assets/gallery-sunset.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const images = [
  { src: heroPikePlace, alt: "Pike Place Market portrait", span: "col-span-2 row-span-2" },
  { src: heroSkyline, alt: "Seattle skyline", span: "col-span-2 row-span-1" },
  { src: galleryGumwall, alt: "Gum Wall lifestyle photo", span: "col-span-1 row-span-2" },
  { src: gallerySunset, alt: "Waterfront sunset portrait", span: "col-span-2 row-span-1" },
  { src: heroCouple, alt: "Candid couple photography", span: "col-span-1 row-span-1" },
  { src: heroWaterfront, alt: "Walking travel portrait", span: "col-span-1 row-span-1" },
];

const GallerySection = () => (
  <section id="gallery" className="py-32">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-4xl text-center mb-12"
      >
        Gallery
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`${img.span} rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover img-frame"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
