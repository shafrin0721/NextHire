import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactInfoCardsSection } from "./sections/ContactInfoCardsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactCTASection } from "./sections/ContactCTASection";

export const Contact = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeaderSection />
      <ContactHeroSection />
      <ContactInfoCardsSection />
      <ContactFormSection />
      <FAQSection />
      <ContactCTASection />
      <FooterSection />
    </div>
  );
};

