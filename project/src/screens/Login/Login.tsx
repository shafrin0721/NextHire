import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const socialProviders = [
  {
    name: "Facebook",
    icon: "/social-media-logo.svg",
  },
  {
    name: "Google",
    icon: "/social-media-logo-2.svg",
  },
  {
    name: "Apple",
    icon: "/social-media-logo-1.svg",
  },
];

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white overflow-hidden w-full flex flex-col min-h-screen">
      <header className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-[1280px] h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8 h-8" alt="NextHire Logo" src="/div.svg" />
            <span className="[font-family:'Inter',Helvetica] font-bold text-[#111111] text-xl tracking-[-0.50px] leading-7">
              NextHire
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="[font-family:'Poppins',Helvetica] font-normal text-[#333333] text-base">
              Don't have an account?
            </span>
            <Link to="/signup">
              <Button className="bg-[#111111] text-white hover:bg-[#333333] [font-family:'Inter',Helvetica] font-medium text-base h-11 px-6 rounded-lg">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[500px] flex flex-col gap-12">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-[#333333] text-[32px] [font-family:'Poppins',Helvetica] font-medium text-center tracking-[0] leading-[normal]">
              Welcome Back
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-base tracking-[0] leading-[normal] text-center">
              Log in to continue your job search
            </p>
          </div>

          <form className="flex flex-col items-start gap-8 w-full">
            <div className="flex flex-col w-full items-start gap-1">
              <Label
                htmlFor="email"
                className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full h-14 rounded-xl border-black [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#30303099]"
              />
            </div>

            <div className="flex flex-col w-full items-start gap-1">
              <div className="flex items-center justify-between w-full">
                <Label
                  htmlFor="password"
                  className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
                >
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-2 [font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-lg tracking-[0] leading-[normal] hover:text-[#000000]"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                  <span>{showPassword ? "Show" : "Hide"}</span>
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-14 rounded-xl border-black [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#00000099]"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="[font-family:'Poppins',Helvetica] font-normal text-[#333333] text-sm">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="[font-family:'Poppins',Helvetica] font-normal text-[#111111] text-sm underline hover:no-underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-16 bg-[#111111] rounded-[40px] text-[#fff9f9] text-[22px] [font-family:'Poppins',Helvetica] font-medium tracking-[0] leading-[normal] hover:bg-[#333333]"
            >
              Log in
            </Button>
          </form>

          <div className="flex flex-col items-start gap-4 w-full">
            <p className="[font-family:'Avenir-Roman',Helvetica] font-normal text-[#666666] text-2xl tracking-[0] leading-[normal]">
              OR Continue with
            </p>

            <div className="flex items-start gap-4 w-full">
              {socialProviders.map((provider) => (
                <Button
                  key={provider.name}
                  type="button"
                  variant="outline"
                  className="flex-1 h-16 bg-[#fff9f9] rounded-[40px] border-[#333333] hover:bg-[#f5f5f5]"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      className={`${provider.name === "Google" ? "w-6 h-6" : "w-8 h-8"}`}
                      alt={`${provider.name} logo`}
                      src={provider.icon}
                    />
                    <span className="[font-family:'Avenir-Roman',Helvetica] font-normal text-[#333333] text-[22px] tracking-[0] leading-[normal]">
                      {provider.name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="relative w-full bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="border-t border-gray-800 pt-8">
            <p className="[font-family:'Inter',Helvetica] font-normal text-gray-400 text-base text-center tracking-[-0.50px] leading-6">
              © 2024 NextHire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
