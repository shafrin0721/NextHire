import { AboutSection } from "./sections/AboutSection";
import { FeaturedJobsSection } from "./sections/FeaturedJobsSection";
import { HeroSection } from "./sections/HeroSection";
import { ImpactSection } from "./sections/ImpactSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { Chatbot } from "../../components/Chatbot";

export const Home = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <FeaturedJobsSection />
      <AboutSection />
      <ImpactSection />
      <TestimonialsSection />
      <Chatbot />
    </>
  );
};

