import { Search as SearchIcon, Send as SendIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <div className="relative min-h-[750px] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Large gradient circles for depth */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-blue-800/30 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-[100px] left-[10%] w-4 h-4 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
      <div className="absolute top-[200px] right-[15%] w-3 h-3 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
      <div className="absolute bottom-[200px] left-[20%] w-5 h-5 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-[150px] right-[10%] w-3 h-3 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2.2s' }} />

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-5xl lg:text-6xl xl:text-7xl tracking-[-0.50px] leading-tight mb-6">
              Find Your Dream Job
              <br />
              <span className="text-blue-200">Today</span>
            </h1>

            <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-lg lg:text-xl tracking-[-0.50px] leading-7 mb-8 max-w-xl mx-auto lg:mx-0">
              Connect with top employers and discover opportunities that match your skills and aspirations. Start your career journey with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 [font-family:'Inter',Helvetica] font-semibold text-lg tracking-[-0.50px] animate-[bounce_2s_infinite]"
              >
                <Link to="/jobs" className="flex items-center">
                  <SearchIcon className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-500 h-14 px-8 rounded-xl border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 [font-family:'Inter',Helvetica] font-semibold text-lg tracking-[-0.50px]"
              >
                <Link to="/signup" className="flex items-center">
                  <SendIcon className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Trust Stats */}
            <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white animate-[pulse_2s_infinite]">500+</p>
                <p className="text-blue-200 text-sm">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white animate-[pulse_2s_infinite]" style={{ animationDelay: '0.5s' }}>10k+</p>
                <p className="text-blue-200 text-sm">Candidates</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white animate-[pulse_2s_infinite]" style={{ animationDelay: '1s' }}>95%</p>
                <p className="text-blue-200 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="relative hidden lg:block order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="relative">
              <img 
                src="/about-office.png" 
                alt="Professional team at work" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border-4 border-white/20 animate-[float_6s_ease-in-out_infinite]"
              />
              
              {/* Floating Card 1 - Interview Success */}
              <div className="absolute -left-6 top-[10%] bg-white rounded-xl shadow-2xl p-4 animate-[bounce_2s_infinite]" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">98%</p>
                    <p className="text-xs text-gray-500">Interview Success</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Top Companies */}
              <div className="absolute -right-6 bottom-[20%] bg-white rounded-xl shadow-2xl p-4 animate-[bounce_2s_infinite]" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">200+</p>
                    <p className="text-xs text-gray-500">Top Companies</p>
                  </div>
                </div>
              </div>

            {/* Floating Card 3 - Happy Candidates */}
              <div className="absolute left-[20%] bottom-[-20px] bg-white rounded-xl shadow-2xl p-4 animate-[bounce_2s_infinite]" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">😊</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">8k+</p>
                    <p className="text-xs text-gray-500">Happy Candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 text-white">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Custom animation keyframes via style */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};
