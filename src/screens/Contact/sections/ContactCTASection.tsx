import { Button } from "../../../components/ui/button";

export const ContactCTASection = (): JSX.Element => {
  return (
    <section className="bg-blue-700 py-16">
      <div className="container mx-auto px-4 max-w-[960px] flex flex-col items-center text-center gap-6">
        <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-3xl md:text-4xl tracking-[-0.50px] leading-tight">
          Ready to Find Your Dream Job?
        </h2>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-sm md:text-base tracking-[-0.50px] leading-6 max-w-2xl">
          Join thousands of professionals who have found their perfect career match.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button className="bg-white text-blue-700 hover:bg-gray-100 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
            Browse Jobs
          </Button>
          <Button className="bg-transparent border border-blue-200 text-white hover:bg-white/10 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
};

