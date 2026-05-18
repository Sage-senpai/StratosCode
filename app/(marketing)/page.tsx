import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LanguageGrid } from "@/components/landing/language-grid";
import { ArchitectureDiagram } from "@/components/landing/architecture-diagram";
import { Founder } from "@/components/landing/founder";
import { Pricing } from "@/components/landing/pricing";
import { CtaSection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <LanguageGrid />
      <ArchitectureDiagram />
      <Founder />
      <Pricing />
      <CtaSection />
    </>
  );
}
