import { Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Browse Jobs", to: "/jobs" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

const supportLinks = [
  { label: "Help Center", to: "/help" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Contact Support", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

const contactInfo = [
  {
    icon: MailIcon,
    text: "hello@nexthire.lk",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@nexthire.lk",
  },
  {
    icon: PhoneIcon,
    text: "+94 77 123 4567",
    href: "tel:+94771234567",
  },
  {
    icon: MapPinIcon,
    text: "NextHire Pvt Ltd\nNo. 25, Galle Road\nColombo 03\nSri Lanka",
    href: "https://www.google.com/maps/search/?api=1&query=No+25+Galle+Road+Colombo+03+Sri+Lanka",
  },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center">
              <img
                className="h-14 w-auto object-contain"
                alt="NextHire Logo"
                src="/src/assets/logo.png"
              />
            </Link>
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
                <Link
                  key={`quick-link-${index}`}
                  to={link.to}
                  className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-5 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.50px] leading-7">
              Support
            </h3>
            <nav className="flex flex-col gap-3">
              {supportLinks.map((link, index) => (
                <Link
                  key={`support-link-${index}`}
                  to={link.to}
                  className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-5 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
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
<<<<<<< HEAD
                  {item.icon === MailIcon ? (
                    <a
                      href={`mailto:${item.text}?subject=General Inquiry`}
                      className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6 whitespace-pre-line hover:text-white transition-colors cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ) : item.icon === PhoneIcon ? (
                    <a
                      href={`tel:${item.text.replace(/\s/g, '')}`}
                      className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6 whitespace-pre-line hover:text-white transition-colors cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6 whitespace-pre-line">
                      {item.text}
                    </span>
                  )}
=======
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[-0.50px] leading-6 whitespace-pre-line hover:text-white hover:underline transition-colors"
                  >
                    {item.text}
                  </a>
>>>>>>> 6c55d7c (Updated contact page and footer links)
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
