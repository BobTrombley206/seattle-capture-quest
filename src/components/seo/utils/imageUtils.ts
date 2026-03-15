import { getSiteConfig } from "@/services/config/siteConfig";

export const getAbsoluteImageUrl = (imageUrl: string | null | undefined): string => {
  const { defaultOgImage, baseUrl } = getSiteConfig();
  if (!imageUrl) return defaultOgImage;
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("/")) return `${baseUrl}${imageUrl}`;
  return defaultOgImage;
};
