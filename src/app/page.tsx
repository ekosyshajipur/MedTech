import HeroSection from "@/components/sections/HeroSection";
import StatsCounter from "@/components/sections/StatsCounter";
import ProductDiscovery from "@/components/sections/ProductDiscovery";
import CategoryUniverse from "@/components/sections/CategoryUniverse";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HealthcareSolutions from "@/components/sections/HealthcareSolutions";
import QualityManufacturing from "@/components/sections/QualityManufacturing";
import ReviewsFaqSplit from "@/components/sections/ReviewsFaqSplit";
import NationwideTrust from "@/components/sections/NationwideTrust";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      {/* 01. Cinematic Hero with 3D WebGL Device Showcase & Layered Depth */}
      <HeroSection />

      {/* 02. Verified Operational Metrics & Regulatory Accreditations */}
      <StatsCounter />

      {/* 03. Intelligent Product Discovery & Clinical Application Switcher */}
      <ProductDiscovery />

      {/* 04. Comprehensive Category Universe — All 31 Documented Categories */}
      <CategoryUniverse />

      {/* 05. Featured Medical Innovations Showcase */}
      <FeaturedProducts />

      {/* 06. Turnkey Healthcare Solutions (ICU, Modular OT, Ward, Diagnostic, Trauma) */}
      <HealthcareSolutions />

      {/* 07. Precision Manufacturing & ISO 13485 Quality Story */}
      <QualityManufacturing />

      {/* 08. Merged Client Reviews + Technical FAQ (50/50 Split Screen) */}
      <ReviewsFaqSplit />

      {/* 09. Nationwide Trust & Hajipur Production Facility Network (India SEO) */}
      <NationwideTrust />

      {/* 10. Institutional B2B Tender & Distributor Onboarding Banner */}
      <CTABanner />
    </>
  );
}
