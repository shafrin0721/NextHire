import { Button } from "../../../components/ui/button";
import { ArrowRight, Users, Briefcase, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const JoinTeamSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-[10%] w-4 h-4 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
      <div className="absolute top-40 right-[15%] w-3 h-3 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
      <div className="absolute bottom-30 left-[20%] w-5 h-5 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>

      <div className="relative container mx-auto px-4 max-w-[1000px] flex flex-col items-center text-center gap-8">
        <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-[-0.50px] leading-tight animate-[fadeInUp_0.6s_ease-out]">
          Join Our Team
        </h2>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-lg md:text-xl tracking-[-0.50px] leading-8 max-w-2xl animate-[fadeInUp_0.6s_ease-out]" style={{ animationDelay: '0.2s' }}>
          We're always looking for motivated people who share our belief that meaningful work can change lives. Explore open roles and see how you can grow with NextHire.
        </p>

        {/* Stats cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 animate-[fadeInUp_0.6s_ease-out]" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xl">50+</p>
              <p className="text-blue-200 text-sm">Team Members</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xl">100+</p>
              <p className="text-blue-200 text-sm">Projects</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xl">15+</p>
              <p className="text-blue-200 text-sm">Awards</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-[fadeInUp_0.6s_ease-out]" style={{ animationDelay: '0.4s' }}>
          <Button asChild className="bg-white text-blue-800 hover:bg-gray-100 h-14 px-8 rounded-xl [font-family:'Inter',Helvetica] font-semibold text-lg tracking-[-0.50px] gap-2 group hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Link to="/jobs">
              View Open Positions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild className="bg-transparent border-2 border-blue-300 text-white hover:bg-white/10 h-14 px-8 rounded-xl [font-family:'Inter',Helvetica] font-semibold text-lg tracking-[-0.50px] hover:scale-105 transition-all duration-300">
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

