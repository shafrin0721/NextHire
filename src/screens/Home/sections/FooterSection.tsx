import { Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon } from "lucide-react";

const quickLinks = [
  "Browse Jobs",
  "Post a Job",
  "Companies",
  "Candidates",
  "Resources",
];

const supportLinks = [
  "Help Center",
  "Privacy Policy",
  "Terms of Service",
  "Contact Support",
  "FAQ",
];

const contactInfo = [
  {
    icon: MailIcon,
    text: "hello@nexthire.com",
  },
  {
    icon: PhoneIcon,
    text: "+1 (555) 123-4567",
  },
  {
    icon: MapPinIcon,
    text: "123 Business Ave, Suite 100\nSan Francisco, CA 94105",
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <img
                className="h-12 w-auto"
                alt="NextHire"
                src="/logo.png"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes("/logo.png")) {
                    img.src = "logo.png";
                  }
                }}
              />
            </div>
            <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6">
              Your gateway to amazing career opportunities. Connect with top
              employers and find your dream job today.
            </p>
            <img
              className="w-full max-w-[288px] h-10"
              alt="Social Media Icons"
              src="/div-12.svg"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.50px] leading-7">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={`quick-link-${index}`}
                  href="#"
                  className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-5 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.50px] leading-7">
              Support
            </h3>
            <nav className="flex flex-col gap-3">
              {supportLinks.map((link, index) => (
                <a
                  key={`support-link-${index}`}
                  href="#"
                  className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-5 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.50px] leading-7">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, index) => (
                <div key={`contact-${index}`} className="flex gap-3">
                  <item.icon className="w-4 h-6 text-gray-400 flex-shrink-0" />
                  <span className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6 whitespace-pre-line">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base text-center tracking-[-0.50px] leading-6">
            © 2024 NextHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
