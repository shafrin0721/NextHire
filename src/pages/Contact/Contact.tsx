import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactInfoCardsSection } from "./sections/ContactInfoCardsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactCTASection } from "./sections/ContactCTASection";

export const Contact = (): JSX.Element => {
  return (
    <>
      <ContactHeroSection />
      <ContactInfoCardsSection />
      <ContactFormSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
};

