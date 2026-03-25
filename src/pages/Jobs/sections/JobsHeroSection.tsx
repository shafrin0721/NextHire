import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface JobsHeroSectionProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
}

export const JobsHeroSection = ({ searchQuery, onSearchQueryChange, onSearch }: JobsHeroSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      console.log("Search query is empty");
      return;
    }
    console.log("Searching jobs:", trimmed);
    onSearch();
  };

  return (
    <section className="relative bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(96,165,250,1)_100%)] py-16 md:py-20">
      <div className="absolute inset-0 bg-[#0000001a]" />
      <div className="relative container mx-auto px-4 max-w-[960px] text-center flex flex-col items-center gap-6">
        <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          Explore Job Opportunities
        </h1>

        <p className="text-blue-100 text-base md:text-lg leading-7 max-w-2xl">
          Browse curated roles from top companies and find the position that
          matches your skills, experience, and career goals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/95 rounded-xl shadow-lg flex flex-col md:flex-row items-stretch gap-2 md:gap-0 p-3 mt-2"
        >
          <input
            type="text"
            placeholder="Search by title, company, or keyword"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 text-sm md:text-base outline-none"
          />

          <Button
            type="submit"
            disabled={!searchQuery.trim()}
            className="md:w-40 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SearchIcon className="w-4 h-4" />
            Search Jobs
          </Button>
        </form>
      </div>
    </section>
  );
};