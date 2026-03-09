import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const infoCards = [
  {
    title: "Phone",
    description: "Give us a call",
    primary: "+1 (555) 123-4567",
    secondary: "",
    Icon: PhoneIcon,
  },
  {
    title: "Email",
    description: "Send us an email",
    primary: "hello@gmail.com",
    secondary: "",
    Icon: MailIcon,
  },
  {
    title: "Address",
    description: "Visit our office",
    primary: "123 Business Ave, Suite 100",
    secondary: "San Francisco, CA 94105",
    Icon: MapPinIcon,
  },
];

export const ContactInfoCardsSection = (): JSX.Element => {
  return (
    <section className="bg-white -mt-16 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map(({ Icon, title, description, primary, secondary }) => (
            <Card
              key={title}
              className="group rounded-3xl border border-gray-100 bg-white p-2 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_30px_60px_rgba(37,99,235,0.12)]"
            >
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm mb-2">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-xl tracking-tight leading-tight">
                    {title}
                  </h2>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-sm tracking-[-0.1px] leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  {title === "Email" ? (
                    <a
                      href={`mailto:${primary}?subject=Customer Support Request`}
                      className="[font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700 text-base tracking-tight leading-tight hover:underline cursor-pointer"
                    >
                      {primary}
                    </a>
                  ) : title === "Phone" ? (
                    <a
                      href={`tel:${primary.replace(/\s/g, '')}`}
                      className="[font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700 text-base tracking-tight leading-tight hover:underline cursor-pointer"
                    >
                      {primary}
                    </a>
                  ) : (
                    <div className="[font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700 text-base tracking-tight leading-tight">
                      {primary}
                    </div>
                  )}
                  {secondary && (
                    <div className="[font-family:'Inter',Helvetica] font-medium text-gray-800 text-sm tracking-tight leading-tight">
                      {secondary}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

