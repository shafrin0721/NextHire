import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowRight, Home, LogIn, CheckCircle2 } from "lucide-react";

export const Logout = (): JSX.Element => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Here you would typically clear the user session/tokens
        // localStorage.removeItem('token');
        // sessionStorage.clear();

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>

            <div className="max-w-md w-full bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100 p-10 text-center relative z-10 animate-in fade-in zoom-in duration-700">
                {/* Icon Container */}
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-3xl opacity-10 animate-ping"></div>
                    <LogOut className="w-10 h-10 text-blue-600 relative z-10" />
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Successfully Logged Out</h1>
                <p className="text-gray-500 font-medium leading-relaxed mb-10">
                    Thank you for using <span className="text-blue-600 font-bold">NextHire</span>. You have been securely logged out of your account.
                </p>

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2 mb-10 py-3 px-6 bg-emerald-50 rounded-2xl w-fit mx-auto border border-emerald-100/50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-700">Session Safely Terminated</span>
                </div>

                {/* Redirect Info */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Return to Homepage
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-5 h-5" />
                        Log Back In
                    </button>
                </div>

                {/* Countdown Progress */}
                <div className="mt-12">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-3">
                        <div
                            className="bg-blue-600 h-full transition-all duration-1000 ease-linear"
                            style={{ width: `${(countdown / 5) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Redirecting to home in {countdown} seconds...
                    </p>
                </div>
            </div>

            {/* Logo Brand */}
            <div className="mt-12 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white">
                    <Home className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
            </div>
        </div>
    );
};
