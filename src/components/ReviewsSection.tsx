import { motion } from "framer-motion";
import { Star } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const reviews = [
  {
    text: "This was the highlight of our Seattle trip. The photos came out amazing and we discovered parts of the city we would have missed.",
    author: "Sarah & Mike, Denver",
  },
  {
    text: "As a solo traveler, I finally have gorgeous photos of myself on vacation. The whole experience felt like exploring with a friend.",
    author: "Priya K., London",
  },
  {
    text: "We booked the VIP session for our engagement and it was worth every penny. The photos captured Seattle and us perfectly.",
    author: "James & Lea, Austin",
  },
  {
    text: "Photos delivered same evening! Professional, friendly, and knew all the best spots. Highly recommend for anyone visiting Seattle.",
    author: "Tom R., Chicago",
  },
];

const ReviewsSection = () => (
  <section className="py-16 bg-secondary/50">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-4xl text-center mb-12"
      >
        What Travelers Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={r.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-sm mb-4 italic">"{r.text}"</p>
            <p className="text-meta text-xs">— {r.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
