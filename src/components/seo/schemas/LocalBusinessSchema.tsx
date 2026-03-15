import { getSiteConfig } from "@/services/config/siteConfig";

const LocalBusinessSchema = () => {
  const { siteName, baseUrl, defaultOgImage } = getSiteConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: siteName,
    url: baseUrl,
    image: defaultOgImage,
    description:
      "Professional portrait photography and guided photo walks at Seattle's most iconic locations.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seattle",
      addressRegion: "WA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    priceRange: "$150–$550",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photo Walk Packages",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Seattle Photo Walk",
          price: "150.00",
          priceCurrency: "USD",
          description:
            "60 minute guided photo walk with 10 professionally edited photos at Pike Place Market and downtown locations.",
          url: `${baseUrl}/book?package=photo-walk`,
        },
        {
          "@type": "Offer",
          name: "Seattle Adventure Portrait Session",
          price: "275.00",
          priceCurrency: "USD",
          description:
            "90 minute session with 20 edited photos at multiple iconic locations including Pike Place Market, waterfront, and skyline views.",
          url: `${baseUrl}/book?package=adventure`,
        },
        {
          "@type": "Offer",
          name: "VIP Private Photo Experience",
          price: "550.00",
          priceCurrency: "USD",
          description:
            "2–3 hour private photography session with 40+ edited photos, fully customized route through Seattle.",
          url: `${baseUrl}/book?package=vip`,
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "5",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sarah & Mike" },
        reviewBody:
          "This was the highlight of our Seattle trip. The photos came out amazing and we discovered parts of the city we would have missed.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Priya K." },
        reviewBody:
          "As a solo traveler, I finally have gorgeous photos of myself on vacation. The whole experience felt like exploring with a friend.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "James & Lea" },
        reviewBody:
          "We booked the VIP session for our engagement and it was worth every penny. The photos captured Seattle and us perfectly.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Tom R." },
        reviewBody:
          "Photos delivered same evening! Professional, friendly, and knew all the best spots. Highly recommend for anyone visiting Seattle.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
