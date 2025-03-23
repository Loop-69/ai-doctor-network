
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SpecialistsSection from "@/components/home/SpecialistsSection";
import QuickActionsPreview from "@/components/home/QuickActionsPreview";
import AnalyticsSection from "@/components/home/AnalyticsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <PublicLayout showHeader={true}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <HeroSection />
        <FeaturesSection />
        <SpecialistsSection />
        <QuickActionsPreview />
        <AnalyticsSection />
        <CTASection />
      </div>
    </PublicLayout>
  );
};

export default Index;
