import React, { useState } from "react";
import { JobsHeroSection } from "./sections/JobsHeroSection";
import { JobsFilterBarSection } from "./sections/JobsFilterBarSection";
import { JobsListSection } from "./sections/JobsListSection";
import { JobsCTASection } from "./sections/JobsCTASection";


export const Jobs = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <JobsHeroSection onSearchChange={setSearchQuery} />
      <JobsFilterBarSection />
      <JobsListSection searchQuery={searchQuery} />
      <JobsCTASection />
    </>
  );
};