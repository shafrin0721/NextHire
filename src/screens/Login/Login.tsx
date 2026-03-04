import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { HeaderSection } from "../Home/sections/HeaderSection";
import { FooterSection } from "../Home/sections/FooterSection";

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
        <div className="flex flex-col min-h-screen bg-white">
            <HeaderSection />

            <main className="flex-grow flex items-center justify-center py-12 px-4 shadow-sm">
                <div className="w-full max-w-[715px] bg-white rounded-3xl border border-gray-100 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-12 py-16 px-8 md:px-16">
                        <header className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-[#333333] text-4xl [font-family:'Poppins',Helvetica] font-semibold text-center tracking-tight">
                                Welcome back
                            </h1>

                            <p className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-base">
                                <span>Don&apos;t have an account?</span>
                                <Link to="/create-account" className="ml-2 text-blue-600 font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </header>

                        <form
                            className="flex flex-col items-start gap-8 w-full"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col w-full items-start gap-2">
                                <Label
                                    htmlFor="role"
                                    className="[font-family:'Poppins',Helvetica] font-medium text-[#040404] text-base"
                                >
                                    Log in as
                                </Label>
                                <select
                                    id="role"
                                    aria-label="Account type"
                                    value={role}
                                    onChange={(event) =>
                                        setRole(event.target.value === "hr" ? "hr" : "candidate")
                                    }
                                    className="w-full h-14 rounded-xl border-gray-200 bg-white [font-family:'Poppins',Helvetica] font-normal text-base text-[#040404] px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="hr">HR / Employer</option>
                                </select>
                            </div>

                            <div className="flex flex-col w-full items-start gap-2">
                                <Label
                                    htmlFor="email"
                                    className="[font-family:'Poppins',Helvetica] font-medium text-[#040404] text-base"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-14 rounded-xl border-gray-200 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-gray-400"
                                />
                            </div>

                            <div className="flex flex-col w-full items-start gap-2">
                                <div className="flex items-center justify-between w-full">
                                    <Label
                                        htmlFor="password"
                                        className="[font-family:'Poppins',Helvetica] font-medium text-[#040404] text-base"
                                    >
                                        Password
                                    </Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeIcon className="w-4 h-4" />
                                        )}
                                        <span>{showPassword ? "Hide" : "Show"}</span>
                                    </button>
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full h-14 rounded-xl border-gray-200 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-gray-400"
                                />
                                <button type="button" className="text-sm text-blue-600 hover:underline mt-1">
                                    Forgot password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-blue-600 rounded-xl text-white text-lg [font-family:'Poppins',Helvetica] font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                            >
                                Log in
                            </Button>
                        </form>

                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="relative w-full flex items-center py-2">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase tracking-widest font-medium">OR</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                {socialProviders.map((provider) => (
                                    <Button
                                        key={provider.name}
                                        type="button"
                                        variant="outline"
                                        className="w-full h-14 bg-white rounded-xl border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-4"
                                    >
                                        <img
                                            className={`${provider.name === "Google" ? "w-5 h-5" : "w-6 h-6"}`}
                                            alt={`${provider.name} logo`}
                                            src={provider.icon}
                                        />
                                        <span className="text-gray-700 font-medium text-base">
                                            Continue with {provider.name}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
};
