export const AboutHeroSection = (): JSX.Element => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-28 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTAtNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>
      
      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>

      <div className="relative container mx-auto px-4 max-w-[1000px] text-center">
        <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-5xl md:text-6xl tracking-[-0.50px] leading-tight mb-6 animate-[fadeInUp_0.8s_ease-out]">
          About NextHire
        </h1>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-xl md:text-2xl tracking-[-0.50px] leading-8 max-w-3xl mx-auto animate-[fadeInUp_0.8s_ease-out]" style={{ animationDelay: '0.2s' }}>
          We're a dedicated team of professionals committed to helping you find your next great opportunity. Our mission is to connect talented people with companies where they can thrive and make meaningful contributions every day.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 mt-12 animate-[fadeInUp_0.8s_ease-out]" style={{ animationDelay: '0.4s' }}>
          <div className="text-center group">
            <div className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl md:text-5xl tracking-[-0.50px] group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className="[font-family:'Inter',Helvetica] font-medium text-blue-200 text-sm md:text-base tracking-[-0.50px] mt-1">Companies</div>
          </div>
          <div className="w-px h-16 bg-blue-400/30 hidden sm:block"></div>
          <div className="text-center group">
            <div className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl md:text-5xl tracking-[-0.50px] group-hover:scale-110 transition-transform duration-300">10K+</div>
            <div className="[font-family:'Inter',Helvetica] font-medium text-blue-200 text-sm md:text-base tracking-[-0.50px] mt-1">Job Seekers</div>
          </div>
          <div className="w-px h-16 bg-blue-400/30 hidden sm:block"></div>
          <div className="text-center group">
            <div className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl md:text-5xl tracking-[-0.50px] group-hover:scale-110 transition-transform duration-300">95%</div>
            <div className="[font-family:'Inter',Helvetica] font-medium text-blue-200 text-sm md:text-base tracking-[-0.50px] mt-1">Success Rate</div>
          </div>
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

