import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const packages = [
  {
    name: "Seattle Photo Walk",
    price: "$150",
    popular: false,
    features: [
      "60 minute guided photo walk",
      "10 professionally edited photos",
      "Pike Place Market and downtown locations",
      "Perfect for solo travelers or couples",
    ],
  },
  {
    name: "Seattle Adventure Portrait Session",
    price: "$275",
    popular: true,
    features: [
      "90 minute session",
      "20 edited photos",
      "Multiple iconic locations (Pike Place Market, waterfront, skyline views)",
      "Creative portrait and lifestyle photography",
    ],
  },
  {
    name: "VIP Private Photo Experience",
    price: "$550",
    popular: false,
    features: [
      "2–3 hour private photography session",
      "Fully customized route through Seattle",
      "40+ edited photos",
      "Cinematic portrait shots and optional Insta360 content",
      "Ideal for influencers, engagements, or special occasions",
    ],
  },
];

const PackagesSection = () => (
  <section id="packages" className="py-16">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-3xl sm:text-4xl text-center mb-4"
      >
        Packages
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...spring, delay: 0.05 }}
        className="text-meta text-center text-sm mb-12"
      >
        Limited sessions available each week · Secure online booking
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`relative bg-card rounded-2xl p-6 flex flex-col transition-shadow ${
              pkg.popular ? "shadow-[0_0_0_2px_hsl(var(--primary)),0_0_0_1px_hsl(var(--border)),0_8px_24px_-4px_hsla(0,0%,0%,0.08)]" : "shadow-card hover:shadow-card-hover"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
            <p className="text-3xl font-bold mb-6">{pkg.price}</p>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-sm transition-shadow ${
                pkg.popular
                  ? "bg-primary text-primary-foreground shadow-card hover:shadow-card-hover"
                  : "bg-card text-foreground shadow-card hover:shadow-card-hover"
              }`}
            >
              Book Now
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PackagesSection;
