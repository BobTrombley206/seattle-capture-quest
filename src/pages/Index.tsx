import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import PackagesSection from "@/components/PackagesSection";
import GallerySection from "@/components/GallerySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import LocalBusinessSchema from "@/components/seo/schemas/LocalBusinessSchema";
import ImageGallerySchema from "@/components/seo/schemas/ImageGallerySchema";
import BreadcrumbSchema from "@/components/seo/schemas/BreadcrumbSchema";

const Index = () => {
  return (
    <>
      <PageSEO
        title="PNW Portraits — Seattle Photo Walk & Portrait Photography Experience"
        description="Professional portrait photography at Seattle's most iconic locations. Guided photo walks through Pike Place Market, the waterfront, and downtown Seattle. Photos delivered within 24 hours."
        canonicalUrl="https://pnwportraits.com"
        keywords={[
          "Seattle photo walk",
          "Seattle photographer for tourists",
          "Pike Place Market photoshoot",
          "Seattle travel portraits",
          "Seattle couple photoshoot",
        ]}
      >
        <LocalBusinessSchema />
        <ImageGallerySchema />
        <BreadcrumbSchema items={[{ name: "Home", path: "/" }]} />
      </PageSEO>
      <Navbar />
      <main>
        <HeroSection />
        <OverviewSection />
        <PackagesSection />
        <GallerySection />
        <HowItWorksSection />
        <AboutSection />
        <ReviewsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
