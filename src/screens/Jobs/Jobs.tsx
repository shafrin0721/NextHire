import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";
import { JobsHeroSection } from "./sections/JobsHeroSection";
import { JobsFilterBarSection } from "./sections/JobsFilterBarSection";
import { JobsListSection } from "./sections/JobsListSection";
import { JobsCTASection } from "./sections/JobsCTASection";

export const Jobs = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeaderSection />
      <JobsHeroSection />
      <JobsFilterBarSection />
      <JobsListSection />
      <JobsCTASection />
      <FooterSection />
    </div>
  );
};

