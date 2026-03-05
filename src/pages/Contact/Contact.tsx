import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactInfoCardsSection } from "./sections/ContactInfoCardsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactCTASection } from "./sections/ContactCTASection";

export const Contact = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />
      <ContactHeroSection />
      <ContactInfoCardsSection />
      <ContactFormSection />
      <FAQSection />
      <ContactCTASection />
      <Footer />
    </div>
  );
};

