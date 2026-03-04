import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

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

export const AccountCreationFormSection = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"candidate" | "hr">("candidate");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (role === "hr") {
      navigate("/hr/dashboard");
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div className="relative flex bg-white rounded-[15px] overflow-hidden w-full">
      <div className="flex flex-col items-center justify-center gap-[72px] w-full max-w-[715px] mx-auto py-[62px] px-4">
        <header className="flex flex-col items-center justify-center gap-0.5">
          <h1 className="text-[#333333] text-[32px] [font-family:'Poppins',Helvetica] font-medium text-center tracking-[0] leading-[normal]">
            Create an account
          </h1>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-[normal]">
            <span className="text-[#333333]">Already have an account?</span>
            <span className="text-[#666666]">&nbsp;</span>
            <Link to="/login" className="text-[#111111] underline hover:no-underline">
              Log in
            </Link>
          </p>
        </header>

        <form
          className="flex flex-col items-start gap-10 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="profile-name"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              What should we call you?
            </Label>
            <Input
              id="profile-name"
              type="text"
              placeholder="Enter your profile name"
              className="w-full h-14 rounded-xl border-black [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-[#30303099]"
            />
          </div>

          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="role"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              What type of account do you need?
            </Label>
            <select
              id="role"
              aria-label="Account type"
              value={role}
              onChange={(event) =>
                setRole(event.target.value === "hr" ? "hr" : "candidate")
              }
              className="w-full h-14 rounded-xl border-black bg-white [font-family:'Poppins',Helvetica] font-normal text-base text-[#040404]"
            >
              <option value="candidate">Candidate</option>
              <option value="hr">HR / Employer</option>
            </select>
          </div>

          <div className="flex flex-col w-full items-start gap-1">
            <Label
              htmlFor="email"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-base tracking-[0] leading-[normal]"
            >
              What&apos;s your email?
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
                Create a password
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
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#040404] text-sm tracking-[0] leading-[normal]">
              Use 8 or more characters with a mix of letters, numbers &amp;
              symbols
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-[normal] px-0 py-2">
              <span className="text-[#050505]">
                By creating an account, you agree to the{" "}
              </span>
              <button
                type="button"
                className="text-[#111111] underline hover:no-underline"
              >
                Terms of use
              </button>
              <span className="text-[#050505]"> and </span>
              <button
                type="button"
                className="text-[#111111] underline hover:no-underline"
              >
                Privacy Policy.
              </button>
            </p>

            <Button
              type="submit"
              className="w-full h-16 bg-[#111111] rounded-[40px] text-[#fff9f9] text-[22px] [font-family:'Poppins',Helvetica] font-medium tracking-[0] leading-[normal] hover:opacity-90"
            >
              Create an account
            </Button>
          </div>
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
  );
};
