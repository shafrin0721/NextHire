import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { JobsHeroSection } from "./sections/JobsHeroSection";
import { JobsFilterBarSection } from "./sections/JobsFilterBarSection";
import { JobsListSection } from "./sections/JobsListSection";
import { JobsCTASection } from "./sections/JobsCTASection";

export const Jobs = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />
      <JobsHeroSection />
      <JobsFilterBarSection />
      <JobsListSection />
      <JobsCTASection />
      <Footer />
    </div>
  );
};

