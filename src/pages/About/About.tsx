import { AboutHeroSection } from "./sections/AboutHeroSection";
import { MissionVisionSection } from "./sections/MissionVisionSection";
import { TeamSection } from "./sections/TeamSection";
import { CoreValuesSection } from "./sections/CoreValuesSection";
import { JoinTeamSection } from "./sections/JoinTeamSection";

export const About = (): JSX.Element => {
  return (
    <>
      <div id="about-home">
        <AboutHeroSection />
      </div>
      <MissionVisionSection />
      <TeamSection />
      <CoreValuesSection />
      <JoinTeamSection />
    </>
  );
};