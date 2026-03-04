import { Button } from "../../../components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Jobs", to: "/jobs" },
  { label: "Contact", to: "/contact" },
];

export const HeaderSection = (): JSX.Element => {
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow-[0px_1px_2px_#0000000d] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center h-full">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 w-auto object-contain"
                alt="NextHire"
                src="logo.png"
                loading="eager"
              />
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
              <Link to="/create-account">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
