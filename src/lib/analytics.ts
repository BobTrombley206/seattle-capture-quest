declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const trackBookNowClick = (packageName?: string) =>
  trackEvent("book_now_click", {
    ...(packageName && { package_name: packageName }),
  });

export const trackContactFormSubmit = () =>
  trackEvent("contact_form_submit");

export const trackPackageInquiry = (packageName: string) =>
  trackEvent("package_inquiry", { package_name: packageName });
