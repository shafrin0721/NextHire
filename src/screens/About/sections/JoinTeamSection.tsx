import { Button } from "../../../components/ui/button";

export const JoinTeamSection = (): JSX.Element => {
  return (
    <section className="bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(15,23,42,1)_100%)] py-16">
      <div className="container mx-auto px-4 max-w-[1120px] flex flex-col items-center text-center gap-6">
        <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-3xl md:text-4xl tracking-[-0.50px] leading-tight">
          Join Our Team
        </h2>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-base md:text-lg tracking-[-0.50px] leading-7 max-w-2xl">
          We&apos;re always looking for motivated people who share our belief
          that meaningful work can change lives. Explore open roles and see how
          you can grow with NextHire.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button className="bg-white text-blue-700 hover:bg-gray-100 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
            View Open Positions
          </Button>
          <Button className="bg-transparent border border-blue-200 text-white hover:bg-white/10 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

