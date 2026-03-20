import { JobsHeroSection } from "./sections/JobsHeroSection";
import { JobsFilterBarSection } from "./sections/JobsFilterBarSection";
import { JobsListSection } from "./sections/JobsListSection";
import { JobsCTASection } from "./sections/JobsCTASection";

export const Jobs = (): JSX.Element => {
  return (
    <>
      <JobsHeroSection />
      <JobsFilterBarSection />
      <JobsListSection />
      <JobsCTASection />
    </>
  );
};

