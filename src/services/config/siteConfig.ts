export interface SiteConfig {
  siteName: string;
  baseUrl: string;
  locationName: string;
  zipcode: string;
  defaultOgImage: string;
}

const defaultConfig: SiteConfig = {
  siteName: "PNW Portraits",
  baseUrl: "https://pnwportraits.com",
  locationName: "Seattle",
  zipcode: "98101",
  defaultOgImage: "https://pnwportraits.com/og-image.jpg",
};

export const getSiteConfig = (): SiteConfig => defaultConfig;
