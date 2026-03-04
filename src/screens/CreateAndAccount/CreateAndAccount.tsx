import { AccountCreationFormSection } from "./sections/AccountCreationFormSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";

export const CreateAndAccount = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full flex flex-col">
      <AccountCreationFormSection />
      <SiteFooterSection />
    </div>
  );
};
