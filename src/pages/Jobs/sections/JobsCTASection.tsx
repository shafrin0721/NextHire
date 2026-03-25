import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom"; // Oya JoinTeamSection eke use karana style ekatama

export const JobsCTASection = (): JSX.Element => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(15,23,42,1)_100%)] py-14">
      <div className="container mx-auto px-4 max-w-[960px] flex flex-col items-center text-center gap-6">
        <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-3xl md:text-4xl tracking-[-0.50px] leading-tight">
          Ready to Apply?
        </h2>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-sm md:text-base tracking-[-0.50px] leading-6 max-w-2xl">
          Create your profile in minutes and start applying to jobs that match
          your experience and ambitions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link to="/signup">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px] w-full sm:w-auto">
              Create an Account
            </Button>
          </Link>

          <Button 
            onClick={scrollToHero}
            className="bg-transparent border border-blue-200 text-white hover:bg-white/10 h-11 px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px] w-full sm:w-auto"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};