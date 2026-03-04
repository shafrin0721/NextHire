import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";
import { JobDetailsMainSection } from "./sections/JobDetailsMainSection";
import { SimilarJobsSection } from "./sections/SimilarJobsSection";

export const JobDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeaderSection />
      <JobDetailsMainSection />
      <SimilarJobsSection />
      <FooterSection />
    </div>
  );
};

