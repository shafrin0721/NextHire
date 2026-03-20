import { AccountCreationFormSection } from "./sections/AccountCreationFormSection";

export const CreateAndAccount = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full flex flex-col">
      <main className="flex-grow">
        <AccountCreationFormSection />
      </main>
    </div>
  );
};
