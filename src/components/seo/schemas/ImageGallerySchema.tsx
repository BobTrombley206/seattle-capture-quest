import { getSiteConfig } from "@/services/config/siteConfig";

const ImageGallerySchema = () => {
  const { baseUrl } = getSiteConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "PNW Portraits Gallery",
    description:
      "Portfolio of Seattle portrait and travel photography at Pike Place Market, the waterfront, and downtown.",
    image: [
      { "@type": "ImageObject", name: "Pike Place Market portrait", contentUrl: `${baseUrl}/assets/hero-pike-place.jpg` },
      { "@type": "ImageObject", name: "Seattle skyline at sunset", contentUrl: `${baseUrl}/assets/hero-skyline.jpg` },
      { "@type": "ImageObject", name: "Gum Wall lifestyle photo", contentUrl: `${baseUrl}/assets/gallery-gumwall.jpg` },
      { "@type": "ImageObject", name: "Waterfront sunset portrait", contentUrl: `${baseUrl}/assets/gallery-sunset.jpg` },
      { "@type": "ImageObject", name: "Candid couple photography", contentUrl: `${baseUrl}/assets/hero-couple.jpg` },
      { "@type": "ImageObject", name: "Walking travel portrait", contentUrl: `${baseUrl}/assets/hero-waterfront.jpg` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ImageGallerySchema;
