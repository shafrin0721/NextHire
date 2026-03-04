import { AboutSection } from "./sections/AboutSection";
import { FeaturedJobsSection } from "./sections/FeaturedJobsSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { ImpactSection } from "./sections/ImpactSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeaderSection />
      <HeroSection />
      <FeaturedJobsSection />
      <AboutSection />
      <ImpactSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};
