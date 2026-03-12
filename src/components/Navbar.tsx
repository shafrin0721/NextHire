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
        <div className="flex items-center justify-between h-[70px]">
          {/* Back button + Logo - Left */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {!isHomePage && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden />
                <span>Back</span>
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <img
                className="h-12 w-auto max-h-[60px] md:h-14 lg:h-16 object-contain"
                alt="NextHire Logo"
                src="/logo.png"
                loading="eager"
              />
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center gap-10">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`
                    text-base font-medium transition-colors duration-200 px-2 py-1 rounded-md
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hidden md:flex px-4 py-2 border border-blue-200 hover:border-blue-300 rounded-lg h-auto"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 h-auto ml-1 border-0"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

