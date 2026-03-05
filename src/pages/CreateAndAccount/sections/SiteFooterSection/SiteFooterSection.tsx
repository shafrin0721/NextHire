import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";

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
    text: "hello@nexthire.lk",
  },
  {
    icon: PhoneIcon,
    text: "+94 77 123 4567",
  },
  {
    icon: MapPinIcon,
    text: "NextHire Pvt Ltd\nNo. 25, Galle Road\nColombo 03\nSri Lanka",
  },
];

const socialIcons = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: TwitterIcon, label: "Twitter" },
  { Icon: LinkedinIcon, label: "LinkedIn" },
  { Icon: InstagramIcon, label: "Instagram" },
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img className="w-8 h-8" alt="NextHire Logo" src="/div.svg" />
              <span className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[-0.50px] leading-7">
                NextHire
              </span>
            </div>
            <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6">
              Your gateway to amazing career opportunities. Connect with top
              employers and find your dream job today.
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.50px] leading-7">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link}
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
              {supportLinks.map((link) => (
                <a
                  key={link}
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
                <div key={index} className="flex gap-3">
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
