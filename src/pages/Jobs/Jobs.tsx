import { useState } from "react";
import { JobsHeroSection } from "./sections/JobsHeroSection";
import { JobsFilterBarSection } from "./sections/JobsFilterBarSection";
import { JobsListSection } from "./sections/JobsListSection";
import { JobsCTASection } from "./sections/JobsCTASection";

export const Jobs = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Jobs page search triggered:", searchQuery);
    // State is already updated by JobsHeroSection on input change.
    // If you need analytics/event tracking, add it here.
  };

  return (
    <>
      <JobsHeroSection
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <JobsFilterBarSection />
      <JobsListSection searchQuery={searchQuery} />
      <JobsCTASection />
    </>
  );
};

