import { Button } from "../../../components/ui/button";

export const AboutSection = (): JSX.Element => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-800 text-4xl tracking-[-0.50px] leading-10 mb-6">
              About CareerHub
            </h2>

            <div className="mb-8">
              <h3 className="[font-family:'Inter',Helvetica] font-normal text-blue-600 text-xl tracking-[-0.50px] leading-7 mb-4">
                Our Mission
              </h3>
              <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-[26px]">
                To bridge the gap between talented professionals and innovative
                companies,
                <br />
                creating meaningful career connections that drive success for
                both
                <br />
                candidates and employers.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="[font-family:'Inter',Helvetica] font-normal text-blue-600 text-xl tracking-[-0.50px] leading-7 mb-4">
                Our Vision
              </h3>
              <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base tracking-[-0.50px] leading-[26px]">
                To become the world's most trusted career platform, empowering
                millions of
                <br />
                professionals to find their dream jobs and helping companies
                build
                <br />
                exceptional teams.
              </p>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 w-fit px-8 rounded-lg [font-family:'Inter',Helvetica] font-medium text-base tracking-[-0.50px]">
              Learn More About Us
            </Button>
          </div>

          <div className="w-full aspect-[4/3] min-h-[280px] lg:min-h-[400px] lg:aspect-auto lg:h-[592px] rounded-[12px] overflow-hidden shadow-[0px_10px_40px_rgba(15,23,42,0.12),0px_4px_10px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
              srcSet="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=85 400w, https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85 800w, https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85 1200w"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              alt="Team discussing job opportunities and career growth in a modern office"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
