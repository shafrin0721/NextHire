import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AboutHeroSection } from "./sections/AboutHeroSection";
import { MissionVisionSection } from "./sections/MissionVisionSection";
import { TeamSection } from "./sections/TeamSection";
import { CoreValuesSection } from "./sections/CoreValuesSection";
import { JoinTeamSection } from "./sections/JoinTeamSection";

export const About = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />
      <AboutHeroSection />
      <MissionVisionSection />
      <TeamSection />
      <CoreValuesSection />
      <JoinTeamSection />
      <Footer />
    </div>
  );
};

