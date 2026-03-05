import { AboutSection } from "./sections/AboutSection";
import { FeaturedJobsSection } from "./sections/FeaturedJobsSection";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { ImpactSection } from "./sections/ImpactSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedJobsSection />
      <AboutSection />
      <ImpactSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};
