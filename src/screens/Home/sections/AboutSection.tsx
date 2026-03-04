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

          <div className="w-full h-[592px] rounded-xl shadow-[0px_10px_15px_#0000001a,0px_4px_6px_#0000001a] [background:url(/img.png)_50%_50%_/_cover]" />
        </div>
      </div>
    </div>
  );
};
