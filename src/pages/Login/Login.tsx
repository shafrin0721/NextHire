import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { validateEmail, validatePassword } from "../../utils/validation";
import { setAuthSession, loginAdmin } from "../../utils/auth";

const GOOGLE_LOGIN_URL = "https://accounts.google.com";
const FACEBOOK_LOGIN_URL = "https://www.facebook.com/login";
const APPLE_LOGIN_URL = "https://appleid.apple.com";

const socialProviders = [
    { name: "Google", Icon: FcGoogle, href: GOOGLE_LOGIN_URL, iconClass: "" },
    { name: "Facebook", Icon: FaFacebookF, href: FACEBOOK_LOGIN_URL, iconClass: "text-[#1877F2]" },
    { name: "Apple", Icon: FaApple, href: APPLE_LOGIN_URL, iconClass: "text-gray-900" },
] as const;

export const Login = (): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"candidate" | "hr" | "admin">("candidate");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        if (emailError || passwordError) {
            setErrors({ email: emailError ?? undefined, password: passwordError ?? undefined });
            setAuthError(null);
            return;
        }

        setErrors({});

        if (role === "admin") {
            const result = loginAdmin(email, password);
            if (!result.success) {
                setAuthError(result.message);
                return;
            }
            setAuthError(null);
            navigate("/admin/dashboard");
            return;
        }

        // Non-admin users still get a simple session flag
        setAuthSession();
        setAuthError(null);

        if (role === "hr") {
            navigate("/hr/dashboard");
        } else {
            navigate("/jobs");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-12 px-4 shadow-sm">
                <div className="w-full max-w-[715px] bg-white rounded-3xl border border-gray-100 shadow-[0px_20px_50px_rgba(37,99,235,0.08)] overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-12 py-16 px-8 md:px-16">
                        <header className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-[#333333] text-4xl [font-family:'Poppins',Helvetica] font-semibold text-center tracking-tight">
                                Welcome back
                            </h1>

                            <p className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-base">
                                <span>Don&apos;t have an account?</span>
                                <Link to="/signup" className="ml-2 text-blue-600 font-medium hover:underline">
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
                                        setRole(event.target.value as "candidate" | "hr" | "admin")
                                    }
                                    className="w-full h-14 rounded-xl border-gray-200 bg-white [font-family:'Poppins',Helvetica] font-normal text-base text-[#040404] px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="hr">HR / Employer</option>
                                    <option value="admin">Admin</option>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full h-14 rounded-xl border-gray-200 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-gray-400 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full h-14 rounded-xl border-gray-200 [font-family:'Poppins',Helvetica] font-normal text-base placeholder:text-gray-400 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                <button type="button" className="text-sm text-blue-600 hover:underline mt-1">
                                    Forgot password?
                                </button>
                            </div>

                            {authError && (
                                <p className="w-full text-sm text-red-600 text-center">
                                    {authError}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-14 bg-blue-600 rounded-xl text-white text-lg [font-family:'Poppins',Helvetica] font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                            >
                                Log in
                            </Button>
                        </form>

                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="relative w-full flex items-center py-2">
                                <div className="flex-grow border-t border-gray-200" />
                                <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase tracking-widest font-medium">
                                    OR Continue with
                                </span>
                                <div className="flex-grow border-t border-gray-200" />
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                                {socialProviders.map(({ name, Icon, href, iconClass }) => (
                                    <Button
                                        key={name}
                                        type="button"
                                        variant="outline"
                                        onClick={() => { window.location.href = href; }}
                                        className="flex-1 h-14 rounded-2xl border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-3 px-4 min-w-0"
                                    >
                                        <Icon className={`w-6 h-6 flex-shrink-0 ${iconClass}`} aria-hidden />
                                        <span className="[font-family:'Poppins',Helvetica] font-medium text-gray-700 text-base whitespace-nowrap">
                                            {name}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
