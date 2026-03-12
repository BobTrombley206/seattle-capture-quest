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

const Index = () => {
  return (
    <>
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
