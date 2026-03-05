import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { validateRequired, validateEmail, validatePhone, validatePassword } from "../../../../utils/validation";

const FACEBOOK_LOGIN_URL = "https://www.facebook.com/login/";
const GOOGLE_LOGIN_URL = "https://accounts.google.com/";
const APPLE_LOGIN_URL = "https://appleid.apple.com/";

const socialProviders = [
  {
    name: "Facebook",
    Icon: FaFacebookF,
    href: FACEBOOK_LOGIN_URL,
    className: "text-[#1877F2]",
  },
  {
    name: "Google",
    Icon: FcGoogle,
    href: GOOGLE_LOGIN_URL,
    className: "",
  },
  {
    name: "Apple",
    Icon: FaApple,
    href: APPLE_LOGIN_URL,
    className: "text-gray-900",
  },
] as const;

export const AccountCreationFormSection = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullNameError = validateRequired(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmError =
      validateRequired(confirmPassword) ||
      (password !== confirmPassword ? "Passwords do not match." : null);

    if (fullNameError || emailError || phoneError || passwordError || confirmError) {
      setErrors({
        fullName: fullNameError ?? undefined,
        email: emailError ?? undefined,
        phone: phoneError ?? undefined,
        password: passwordError ?? undefined,
        confirmPassword: confirmError ?? undefined,
      });
      return;
    }
    setErrors({});
    navigate("/login");
  };

  const handleSocialClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="relative flex bg-white rounded-[15px] overflow-hidden w-full">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-[72px] w-full max-w-[715px] mx-auto py-8 md:py-[62px] px-4">
        <header className="flex flex-col items-center justify-center gap-0.5 text-center">
          <h1 className="text-[#333333] text-2xl md:text-[32px] [font-family:'Poppins',Helvetica] font-medium tracking-[0] leading-[normal]">
            Create an account
          </h1>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-[normal]">
            <span className="text-[#333333]">Already have an account? </span>
            <Link to="/login" className="text-[#111111] underline hover:no-underline font-medium">
              Log in
            </Link>
          </p>
        </header>

        <form
          className="flex flex-col items-start gap-6 md:gap-10 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="full-name"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              Full Name
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full h-14 rounded-xl border-gray-300 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#30303099] focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="email"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-14 rounded-xl border-gray-300 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#30303099] focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="phone"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full h-14 rounded-xl border-gray-300 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#30303099] focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
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
                className="flex items-center gap-2 [font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-sm md:text-base tracking-[0] leading-[normal] hover:text-[#000000] transition-colors"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <EyeIcon className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-14 rounded-xl border-gray-300 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#00000099] focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-sm tracking-[0] leading-[normal]">
              Minimum 6 characters with at least one uppercase letter and one number
            </p>
          </div>

          <div className="flex flex-col w-full items-start gap-1">
            <div className="flex items-center justify-between w-full">
              <Label
                htmlFor="confirm-password"
                className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
              >
                Confirm Password
              </Label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="flex items-center gap-2 [font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-sm md:text-base tracking-[0] leading-[normal] hover:text-[#000000] transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <EyeIcon className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{showConfirmPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full h-14 rounded-xl border-gray-300 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#00000099] focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="[font-family:'Poppins',Helvetica] font-normal text-red-600 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-[normal] px-0 py-2 text-[#050505]">
              By creating an account, you agree to the{" "}
              <button type="button" className="text-[#111111] underline hover:no-underline">
                Terms of use
              </button>{" "}
              and{" "}
              <button type="button" className="text-[#111111] underline hover:no-underline">
                Privacy Policy.
              </button>
            </p>

            <Button
              type="submit"
              className="w-full h-14 md:h-16 bg-[#111111] rounded-[40px] text-[#fff9f9] text-lg md:text-[22px] [font-family:'Poppins',Helvetica] font-medium tracking-[0] leading-[normal] hover:bg-[#333333] hover:opacity-95 transition-all"
            >
              Create Account
            </Button>
          </div>
        </form>

        <div className="flex flex-col items-center gap-4 w-full">
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-base md:text-xl tracking-[0] leading-[normal]">
            OR continue with
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md sm:max-w-none">
            {socialProviders.map(({ name, Icon, href, className }) => (
              <Button
                key={name}
                type="button"
                variant="outline"
                onClick={() => handleSocialClick(href)}
                className="flex-1 h-14 rounded-2xl border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-3 px-4"
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${className}`} aria-hidden />
                <span className="[font-family:'Poppins',Helvetica] font-medium text-[#333333] text-base md:text-lg whitespace-nowrap">
                  {name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
