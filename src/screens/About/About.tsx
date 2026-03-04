import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";
import { AboutHeroSection } from "./sections/AboutHeroSection";
import { MissionVisionSection } from "./sections/MissionVisionSection";
import { TeamSection } from "./sections/TeamSection";
import { CoreValuesSection } from "./sections/CoreValuesSection";
import { JoinTeamSection } from "./sections/JoinTeamSection";

export const About = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeaderSection />
      <AboutHeroSection />
      <MissionVisionSection />
      <TeamSection />
      <CoreValuesSection />
      <JoinTeamSection />
      <FooterSection />
    </div>
  );
};

