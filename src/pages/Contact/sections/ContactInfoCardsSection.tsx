import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

<<<<<<< HEAD
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

=======
>>>>>>> 6c55d7c (Updated contact page and footer links)
export const ContactInfoCardsSection = (): JSX.Element => {
  return (
    <section className="bg-white -mt-16 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-[1100px]">
        {/* Top Section: Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Phone Card */}
          <Card className="group rounded-3xl border border-gray-100 bg-white p-2 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_30px_60px_rgba(37,99,235,0.12)]">
            <CardContent className="p-8 flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm mb-2">
                <PhoneIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-xl tracking-tight leading-tight">
                  Phone
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-sm tracking-[-0.1px] leading-relaxed">
                  Available Mon-Fri, 9am-6pm
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-2 w-full">
                <a
                  href="tel:+94771234567"
                  className="flex items-center justify-center gap-2 [font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700 hover:underline text-base tracking-tight leading-tight"
                >
                  <PhoneIcon className="w-4 h-4" />
                  +94 77 123 4567
                </a>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 [font-family:'Inter',Helvetica] font-semibold text-green-600 transition-all duration-300 hover:text-green-700 hover:underline text-base tracking-tight leading-tight"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="group rounded-3xl border border-gray-100 bg-white p-2 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_30px_60px_rgba(37,99,235,0.12)]">
            <CardContent className="p-8 flex flex-col items-center text-center gap-4 h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm mb-2">
                <MailIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-xl tracking-tight leading-tight">
                  Email
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-sm tracking-[-0.1px] leading-relaxed">
                  We'll respond within 24 hours
                </p>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@nexthire.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700 hover:underline text-base tracking-tight leading-tight"
                >
                  hello@nexthire.lk
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section: Address and Map */}
        <div className="flex flex-col gap-8">
          {/* Address Card */}
          <Card className="group rounded-3xl border border-gray-100 bg-white p-2 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] transition-all duration-300">
            <CardContent className="p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm flex-shrink-0">
                <MapPinIcon className="w-7 h-7" />
              </div>
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-2xl tracking-tight leading-tight mb-2">
                    Our Location
                  </h2>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-base tracking-tight leading-relaxed whitespace-pre-line">
                    NextHire Pvt Ltd{"\n"}
                    No. 25, Galle Road{"\n"}
                    Colombo 03, Sri Lanka
                  </p>
                </div>
<<<<<<< HEAD
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
=======
                <a
                  href="https://maps.google.com/?q=NextHire+Pvt+Ltd+No+25+Galle+Road+Colombo+03+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 [font-family:'Inter',Helvetica] font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700 hover:underline text-base"
                >
                  Get Directions
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Map Embed Section */}
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-gray-100 shadow-[0px_20px_50px_rgba(15,23,42,0.08)]">
            <iframe
              title="NextHire Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.916723237199!2d79.8475267750438!3d6.900570418649839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25940c6a2d04f%3A0x6b896da88612af1!2sGalle%20Rd%2C%20Colombo%2000300!5e0!3m2!1sen!2slk!4v1709975734567!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
>>>>>>> 6c55d7c (Updated contact page and footer links)
        </div>
      </div>
    </section>
  );
};

