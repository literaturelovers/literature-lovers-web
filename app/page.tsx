import LandingLayout from "@/components/landing/LandingLayout";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CallToActionSection from "@/components/landing/CallToActionSection";

export default function RootPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </LandingLayout>
  );
}
