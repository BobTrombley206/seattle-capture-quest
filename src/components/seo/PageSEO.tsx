import { Helmet } from "react-helmet-async";
import { getSiteConfig } from "@/services/config/siteConfig";
import { getAbsoluteImageUrl } from "./utils/imageUtils";

interface PageSEOProps {
  title: string;
  description: string;
  imageUrl?: string;
  canonicalUrl?: string;
  type?: "website" | "article" | "event";
  noindex?: boolean;
  keywords?: string[];
  children?: React.ReactNode;
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  imageUrl,
  canonicalUrl,
  type = "website",
  noindex,
  keywords,
  children,
}) => {
  const { siteName, baseUrl } = getSiteConfig();
  const pageTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const absoluteImage = getAbsoluteImageUrl(imageUrl);
  const canonical = canonicalUrl || `${baseUrl}${window.location.pathname}`;

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteImage} />
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        {keywords?.length && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
      </Helmet>
      {children}
    </>
  );
};

export default PageSEO;
