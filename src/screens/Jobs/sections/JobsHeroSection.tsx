import { Search as SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

export const JobsHeroSection = (): JSX.Element => {
  return (
    <section className="relative bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(96,165,250,1)_100%)] py-16 md:py-20">
      <div className="absolute inset-0 bg-[#0000001a]" />
      <div className="relative container mx-auto px-4 max-w-[960px] text-center flex flex-col items-center gap-6">
        <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-[-0.50px] leading-tight">
          Explore Job Opportunities
        </h1>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-base md:text-lg tracking-[-0.50px] leading-7 max-w-2xl">
          Browse curated roles from top companies and find the position that
          matches your skills, experience, and career goals.
        </p>

        <div className="w-full max-w-2xl bg-white/95 rounded-xl shadow-[0px_10px_30px_rgba(15,23,42,0.25)] flex flex-col md:flex-row items-stretch gap-2 md:gap-0 p-3 mt-2">
          <input
            placeholder="Search by title, company, or keyword"
            className="flex-1 rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm md:text-base outline-none focus-visible:border-blue-500"
          />
          <Button className="md:w-40 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center justify-center gap-2 [font-family:'Inter',Helvetica] font-medium text-sm md:text-base tracking-[-0.50px]">
            <SearchIcon className="w-4 h-4" />
            <span>Search Jobs</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

