
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SpecialistsSection from "@/components/home/SpecialistsSection";
import QuickActionsPreview from "@/components/home/QuickActionsPreview";
import AnalyticsSection from "@/components/home/AnalyticsSection";
import CTASection from "@/components/home/CTASection";
import RoundQuickActions from "@/components/home/RoundQuickActions";
import { useEffect } from "react";

const Index = () => {
  // Preload agent profile images
  useEffect(() => {
    const agentIds = ["cardio", "neuro", "path", "gen", "opth", "radiology", "pharma"];
    agentIds.forEach(id => {
      const img = new Image();
      img.src = `/agents/${id}.jpg`;
    });
  }, []);

  return (
    <PublicLayout showHeader={true}>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
        <div className="relative">
          <HeroSection />
          <RoundQuickActions />
        </div>
        <SpecialistsSection />
        <QuickActionsPreview />
        <FeaturesSection />
        <AnalyticsSection />
        <CTASection />
      </div>
    </PublicLayout>
  );
};

export default Index;
