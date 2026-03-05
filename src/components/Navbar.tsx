import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Jobs", to: "/jobs" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-white shadow-[0px_1px_2px_#0000000d] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Back button (all pages except Home) + Logo - Left */}
          <div className="flex-shrink-0 flex items-center gap-3 md:gap-4 h-full">
            {!isHomePage && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 rounded-full px-3 py-2 md:px-4 md:py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors [font-family:'Inter',Helvetica] font-medium text-sm md:text-base tracking-[-0.50px] order-first"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" aria-hidden />
                <span>Back</span>
              </Button>
            )}
            <Link to="/" className="flex items-center h-full">
              <div
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-100 shadow-[0px_2px_8px_rgba(15,23,42,0.08),0px_1px_3px_rgba(15,23,42,0.06)] p-2 overflow-hidden"
                title="NextHire"
              >
                <img
                  className="w-full h-full object-contain"
                  alt="NextHire Logo"
                  src="/logo.png"
                  loading="eager"
                  width={48}
                  height={48}
                />
              </div>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex flex-grow items-center justify-center gap-8 px-4">
            {navigationItems.map((item) => {
              const isRouteLink = item.to.startsWith("/");
              const isActive = isRouteLink && location.pathname === item.to;

              const baseClasses =
                "[font-family:'Inter',Helvetica] text-base tracking-[-0.50px] leading-5 transition-colors duration-200";
              const stateClasses = isActive
                ? "font-semibold text-blue-600"
                : "font-normal text-gray-600 hover:text-blue-600";

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-3 flex-shrink-0 h-full">
            <Button
              asChild
              variant="ghost"
              className="[font-family:'Inter',Helvetica] font-medium text-blue-600 text-base tracking-[-0.50px] leading-5 hover:bg-transparent hover:text-blue-700 hidden sm:inline-flex"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="[font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[-0.50px] leading-5 bg-blue-600 hover:bg-blue-700 rounded-lg px-6 transition-all"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
