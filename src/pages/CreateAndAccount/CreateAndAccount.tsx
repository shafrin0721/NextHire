import { Navbar } from "../../components/Navbar";
import { AccountCreationFormSection } from "./sections/AccountCreationFormSection";
import { Footer } from "../../components/Footer";

export const CreateAndAccount = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AccountCreationFormSection />
      </main>
      <Footer />
    </div>
  );
};
