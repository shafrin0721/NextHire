import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
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

          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img className="w-8 h-8" alt="NextHire Logo" src="/div.svg" />
              <span className="font-bold text-white text-xl">
                NextHire
              </span>
            </div>

            <p className="text-gray-400 text-base">
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

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg">Quick Links</h3>

            <nav className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg">Support</h3>

            <nav className="flex flex-col gap-3">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg">Contact Info</h3>

            <div className="flex flex-col gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-3">

                  <item.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />

                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-white hover:underline whitespace-pre-line transition-colors"
                  >
                    {item.text}
                  </a>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-base text-center">
            © 2024 NextHire. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};