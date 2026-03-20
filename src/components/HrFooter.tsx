import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const HrFooter = (): JSX.Element => {
  const quickLinks = [
    { label: "Browse Jobs", to: "/hr/jobs" },
    { label: "Post a Job", to: "/hr/jobs" },
    { label: "Companies", to: "/hr/dashboard" },
    { label: "Candidates", to: "/hr/candidates" },
    { label: "Resources", to: "/hr/reports" },
  ];

  const supportLinks = [
    { label: "Help Center", to: "/contact" },
    { label: "Privacy Policy", to: "/contact" },
    { label: "Terms of Service", to: "/contact" },
    { label: "Contact Support", to: "/contact" },
    { label: "FAQ", to: "/contact" },
  ];

  return (
    <footer className="bg-[#0B1221] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/nexthire-logo.png"
                alt="NextHire"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <span className="font-bold text-2xl text-white tracking-tight">NextHire</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              Your gateway to amazing career opportunities. Connect with top employers and find your dream job today.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-[12px]">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-[12px]">Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              {supportLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-[12px]">Contact Info</h4>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:hello@NextHire.com"
                  className="text-[12px] group-hover:text-white transition-all"
                >
                  hello@NextHire.com
                </a>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+15551234567"
                  className="text-[12px] group-hover:text-white transition-all"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[12px] group-hover:text-white transition-all leading-relaxed">
                  123 Business Ave, Suite 100<br />San Francisco, CA 94105
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-600">
            © 2024 NextHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
