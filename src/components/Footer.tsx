import { Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const accountLinks = [
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
  { label: "Jobs Dashboard", to: "/dashboard" },
];

const companyLinks = [
  { label: "Post a Job", to: "/post-job" },
  { label: "HR Dashboard", to: "/hr-dashboard" },
  { label: "Contact Support", to: "/contact" },
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
    text: "No. 25, Galle Road\nColombo 03\nSri Lanka",
  },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
      {/* Top section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img
                className="h-12 w-auto"
                alt="NextHire"
src="/nexthire-logo.png"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Your trusted partner for finding the perfect career opportunities. 
              Connect with top employers and accelerate your professional journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                  >
                    {link.label}
                    <span className="block h-0.5 bg-blue-500 w-0 group-hover:w-4 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Candidates</h3>
            <ul className="space-y-3">
              {accountLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                  >
                    {link.label}
                    <span className="block h-0.5 bg-blue-500 w-0 group-hover:w-4 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Companies</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors text-sm group"
                  >
                    {link.label}
                    <span className="block h-0.5 bg-blue-500 w-0 group-hover:w-4 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <MailIcon className="w-5 h-5 text-gray-400" />
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              <MapPinIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              © 2024 NextHire. All rights reserved. | Made with ❤️ in Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

