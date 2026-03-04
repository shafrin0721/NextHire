import { Search as SearchIcon, Send as SendIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <div className="relative h-[600px] bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(96,165,250,1)_100%)]">
      <div className="absolute inset-0 bg-[#0000001a]" />

      <img
        className="absolute top-[68px] right-[208px] w-32 h-[155px]"
        alt="Decorative element"
        src="/div-10.svg"
      />

      <img
        className="absolute bottom-[74px] right-[235px] w-[75px] h-[72px]"
        alt="Decorative element"
        src="/div-9.svg"
      />

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-6xl tracking-[-0.50px] leading-[60px] mb-6">
            Find Your Dream Job
            <br />
            Today
          </h1>

          <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-xl tracking-[-0.50px] leading-7 mb-8">
            Connect with top employers and discover opportunities that match
            <br />
            your skills and aspirations. Start your career journey with us.
          </p>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 h-16 px-8 rounded-lg shadow-[0px_10px_15px_#0000001a,0px_4px_6px_#0000001a] [font-family:'Inter',Helvetica] font-normal text-lg tracking-[-0.50px]"
            >
              <SearchIcon className="w-[18px] h-[21px] mr-1" />
              View Jobs
            </Button>

            <Button
              size="lg"
              className="bg-blue-700 text-white hover:bg-blue-800 h-16 px-8 rounded-lg border-2 border-white [font-family:'Inter',Helvetica] font-normal text-lg tracking-[-0.50px]"
            >
              <SendIcon className="w-[18px] h-[21px] mr-1" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
