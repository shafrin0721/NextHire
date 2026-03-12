import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    FileCheck,
    Calendar,
    BarChart3,
    Settings as SettingsIcon,
    User,
    Mail,
    Lock,
    Bell,
    Globe,
    Shield,
    LogOut,
    Palette,
    Save,
    Camera,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Phone,
    MapPin,
    Briefcase as BriefcaseDefault,
    X,
    Check,
    AlertCircle,
    Eye,
    EyeOff,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
    { label: "Jobs", icon: Briefcase, path: "/hr/jobs" },
    { label: "Candidates", icon: Users, path: "/hr/candidates" },
    { label: "Interviews", icon: Calendar, path: "/hr/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/hr/reports" },
    { label: "Settings", icon: SettingsIcon, path: "/hr/settings" },
    { label: "Logout", icon: LogOut, path: "/logout" },
];

// Notification Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 ${
            type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"
        }`}>
            {type === "success" ? (
                <Check className="w-4 h-4" />
            ) : (
                <AlertCircle className="w-4 h-4" />
            )}
            <p className="font-semibold text-sm">{message}</p>
        </div>
    );
};

// Password Change Modal
const PasswordChangeModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password");
            return;
        }

        onSave({ currentPassword, newPassword });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="Enter new password (min 8 chars)"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-200"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Two-Factor Authentication Modal
const TwoFactorModal = ({ isOpen, onClose, onSave, is2FAEnabled }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; is2FAEnabled: boolean }) => {
    const [method, setMethod] = useState<"email" | "authenticator">("email");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!verificationCode || verificationCode.length < 6) {
            setError("Please enter a valid verification code");
            return;
        }

        onSave({ method, verificationCode, enabled: !is2FAEnabled });
        setVerificationCode("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {!is2FAEnabled && (
                        <>
                            <p className="text-sm text-gray-600 font-medium">
                                Choose your two-factor authentication method:
                            </p>

                            <div className="space-y-3">
                                <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all" style={{borderColor: method === "email" ? "#2563EB" : "#E5E7EB", backgroundColor: method === "email" ? "#EFF6FF" : "#FAFAFA"}}>
                                    <input
                                        type="radio"
                                        checked={method === "email"}
                                        onChange={() => setMethod("email")}
                                        className="w-4 h-4 cursor-pointer accent-blue-600"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Email Authentication</p>
                                        <p className="text-xs text-gray-500">Receive codes via email</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all" style={{borderColor: method === "authenticator" ? "#2563EB" : "#E5E7EB", backgroundColor: method === "authenticator" ? "#EFF6FF" : "#FAFAFA"}}>
                                    <input
                                        type="radio"
                                        checked={method === "authenticator"}
                                        onChange={() => setMethod("authenticator")}
                                        className="w-4 h-4 cursor-pointer accent-blue-600"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Authenticator App</p>
                                        <p className="text-xs text-gray-500">Use apps like Google Authenticator</p>
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verification Code</label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase().slice(0, 6))}
                                    maxLength={6}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-center tracking-widest"
                                    placeholder="000000"
                                />
                            </div>
                        </>
                    )}

                    {is2FAEnabled && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-3 rounded-xl">
                            <p>Disabling 2FA will reduce your account security. Are you sure?</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-4 py-3 font-bold text-sm rounded-xl transition-all shadow-lg ${
                                is2FAEnabled
                                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                            }`}
                        >
                            {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface SettingsState {
    profile: {
        fullName: string;
        email: string;
        phoneNumber: string;
        jobTitle: string;
        bio: string;
        photoUrl: string;
    };
    system: {
        companyName: string;
        domain: string;
        defaultLanguage: string;
        timezone: string;
        dateFormat: string;
        themeMode: "light" | "dark";
    };
    branding: {
        companyName: string;
        primaryColor: string;
        logoUrl: string;
        faviconUrl: string;
        navigationStyle: "sidebar-left" | "header-top";
    };
    notifications: {
        emailNotifications: boolean;
        interviewReminders: boolean;
        applicationAlerts: boolean;
        candidateUpdates: boolean;
    };
    security: {
        twoFactorEnabled: boolean;
        twoFactorMethod: string;
        lastPasswordChange: string;
    };
}

export const HrSettings = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("Profile");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const defaultSettings: SettingsState = {
        profile: {
            fullName: "NextHire Admin",
            email: "admin@nexthire.site",
            phoneNumber: "+1 (555) 123-4567",
            jobTitle: "Platform Administrator",
            bio: "Platform Administrator managing recruitment workflows and system configurations for NextHire.",
            photoUrl: "https://i.pravatar.cc/150?u=admin",
        },
        system: {
            companyName: "NextHire Inc.",
            domain: "https://nexthire.site",
            defaultLanguage: "en",
            timezone: "UTC-5",
            dateFormat: "MM/DD/YYYY",
            themeMode: "light",
        },
        branding: {
            companyName: "NextHire Inc.",
            primaryColor: "#2563EB",
            logoUrl: "https://nexthire.site/logo.png",
            faviconUrl: "https://nexthire.site/favicon.ico",
            navigationStyle: "sidebar-left",
        },
        notifications: {
            emailNotifications: true,
            interviewReminders: true,
            applicationAlerts: false,
            candidateUpdates: true,
        },
        security: {
            twoFactorEnabled: true,
            twoFactorMethod: "email",
            lastPasswordChange: "2 months ago",
        },
    };

    const [settings, setSettings] = useState<SettingsState>(() => {
        const saved = localStorage.getItem("adminSettings");
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const [formData, setFormData] = useState<SettingsState>(settings);

    useEffect(() => {
        setFormData(settings);
    }, [activeTab]);

    const handleInputChange = (section: keyof SettingsState, field: string, value: any) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [field]: value,
            },
        });
    };

    const handleNotificationToggle = (field: string) => {
        setFormData({
            ...formData,
            notifications: {
                ...formData.notifications,
                [field]: !formData.notifications[field as keyof typeof formData.notifications],
            },
        });
    };

    const handleSaveChanges = () => {
        setSettings(formData);
        localStorage.setItem("adminSettings", JSON.stringify(formData));
        setToast({ message: "Settings saved successfully!", type: "success" });
    };

    const handlePasswordChange = (_data: any) => {
        setSettings({
            ...settings,
            security: {
                ...settings.security,
                lastPasswordChange: "just now",
            },
        });
        localStorage.setItem("adminSettings", JSON.stringify({
            ...formData,
            security: {
                ...formData.security,
                lastPasswordChange: "just now",
            },
        }));
        setShowPasswordModal(false);
        setToast({ message: "Password changed successfully!", type: "success" });
    };

    const handleTwoFactorChange = (data: any) => {
        const updatedSettings = {
            ...formData,
            security: {
                ...formData.security,
                twoFactorEnabled: data.enabled,
                twoFactorMethod: data.method,
            },
        };
        setFormData(updatedSettings);
        setSettings(updatedSettings);
        localStorage.setItem("adminSettings", JSON.stringify(updatedSettings));
        setShow2FAModal(false);
        setToast({
            message: data.enabled ? "2FA enabled successfully!" : "2FA disabled successfully!",
            type: "success",
        });
    };

    const tabs = [
        { name: "Profile", icon: User },
        { name: "System", icon: Globe },
        { name: "Branding", icon: Palette },
        { name: "Notifications", icon: Bell },
        { name: "Security", icon: Shield },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-100 flex items-center sticky top-0 z-30">
                <div className="w-full px-6 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/hr/dashboard")}
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <SettingsIcon className="w-5 h-5 shadow-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                            <img src={formData.profile.photoUrl} alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
                    <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                        {sidebarItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                        ? "bg-blue-50 text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h2>
                            <p className="text-gray-500 font-medium mt-1">Manage your professional profile and application preferences</p>
                        </div>

                        {/* Settings Container */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                            {/* Settings Tabs */}
                            <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.name
                                            ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                                            }`}
                                    >
                                        <tab.icon className={`w-4.5 h-4.5 ${activeTab === tab.name ? "text-blue-600" : "text-gray-400"}`} />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Settings Form */}
                            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                                {activeTab === "Profile" && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="relative group">
                                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-sm">
                                                    <img src={formData.profile.photoUrl} className="w-full h-full object-cover" alt="Profile" />
                                                </div>
                                                <button
                                                    onClick={() => setToast({ message: "Photo upload feature coming soon!", type: "success" })}
                                                    className="absolute -right-2 -bottom-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-all border-2 border-white"
                                                >
                                                    <Camera className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900">{formData.profile.fullName}</h4>
                                                <p className="text-sm text-gray-400 font-medium">Update your photo and personal details.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={formData.profile.fullName}
                                                        onChange={(e) => handleInputChange("profile", "fullName", e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        value={formData.profile.email}
                                                        onChange={(e) => handleInputChange("profile", "email", e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        value={formData.profile.phoneNumber}
                                                        onChange={(e) => handleInputChange("profile", "phoneNumber", e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label>
                                                <div className="relative">
                                                    <BriefcaseDefault className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={formData.profile.jobTitle}
                                                        onChange={(e) => handleInputChange("profile", "jobTitle", e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Bio</label>
                                                <textarea
                                                    rows={4}
                                                    value={formData.profile.bio}
                                                    onChange={(e) => handleInputChange("profile", "bio", e.target.value)}
                                                    className="w-full p-4 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "System" && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold text-gray-900">System Configuration</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Company Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.system.companyName}
                                                        onChange={(e) => handleInputChange("system", "companyName", e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Primary Domain</label>
                                                    <div className="relative">
                                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={formData.system.domain}
                                                            onChange={(e) => handleInputChange("system", "domain", e.target.value)}
                                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Default Language</label>
                                                    <select
                                                        value={formData.system.defaultLanguage}
                                                        onChange={(e) => handleInputChange("system", "defaultLanguage", e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    >
                                                        <option value="en">English</option>
                                                        <option value="es">Spanish</option>
                                                        <option value="fr">French</option>
                                                        <option value="de">German</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Time Zone</label>
                                                    <select
                                                        value={formData.system.timezone}
                                                        onChange={(e) => handleInputChange("system", "timezone", e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    >
                                                        <option value="UTC-5">UTC-5 (Eastern)</option>
                                                        <option value="UTC-6">UTC-6 (Central)</option>
                                                        <option value="UTC-7">UTC-7 (Mountain)</option>
                                                        <option value="UTC-8">UTC-8 (Pacific)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Date Format</label>
                                                    <select
                                                        value={formData.system.dateFormat}
                                                        onChange={(e) => handleInputChange("system", "dateFormat", e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    >
                                                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Theme Mode</label>
                                                    <select
                                                        value={formData.system.themeMode}
                                                        onChange={(e) => handleInputChange("system", "themeMode", e.target.value as "light" | "dark")}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    >
                                                        <option value="light">Light Mode</option>
                                                        <option value="dark">Dark Mode</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Branding" && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold text-gray-900">Custom Branding</h4>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-12 h-12 rounded-xl shadow-lg"
                                                            style={{ backgroundColor: formData.branding.primaryColor }}
                                                        ></div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">Primary Brand Color</p>
                                                            <p className="text-[11px] text-gray-400 font-bold uppercase">
                                                                {formData.branding.primaryColor.toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="color"
                                                        value={formData.branding.primaryColor}
                                                        onChange={(e) => handleInputChange("branding", "primaryColor", e.target.value)}
                                                        className="w-12 h-10 rounded-lg cursor-pointer"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Company Name</label>
                                                        <input
                                                            type="text"
                                                            value={formData.branding.companyName}
                                                            onChange={(e) => handleInputChange("branding", "companyName", e.target.value)}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Logo URL</label>
                                                        <input
                                                            type="text"
                                                            value={formData.branding.logoUrl}
                                                            onChange={(e) => handleInputChange("branding", "logoUrl", e.target.value)}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Favicon URL</label>
                                                        <input
                                                            type="text"
                                                            value={formData.branding.faviconUrl}
                                                            onChange={(e) => handleInputChange("branding", "faviconUrl", e.target.value)}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Navigation Style</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => handleInputChange("branding", "navigationStyle", "sidebar-left")}
                                                            className={`p-4 rounded-2xl border-2 flex flex-col gap-2 items-center text-center transition-all ${
                                                                formData.branding.navigationStyle === "sidebar-left"
                                                                    ? "border-blue-600 bg-blue-50/20 text-blue-600"
                                                                    : "border-transparent bg-gray-50 text-gray-400 hover:bg-white hover:border-gray-200"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`w-12 h-1 rounded-full ${formData.branding.navigationStyle === "sidebar-left" ? "bg-blue-600" : "bg-gray-300"}`}
                                                            ></div>
                                                            <span className="text-xs font-bold uppercase tracking-widest">Sidebar (Left)</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleInputChange("branding", "navigationStyle", "header-top")}
                                                            className={`p-4 rounded-2xl border-2 flex flex-col gap-2 items-center text-center transition-all ${
                                                                formData.branding.navigationStyle === "header-top"
                                                                    ? "border-blue-600 bg-blue-50/20 text-blue-600"
                                                                    : "border-transparent bg-gray-50 text-gray-400 hover:bg-white hover:border-gray-200"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`w-full h-1 rounded-full ${formData.branding.navigationStyle === "header-top" ? "bg-blue-600" : "bg-gray-300"}`}
                                                            ></div>
                                                            <span className="text-xs font-bold uppercase tracking-widest">Header (Top)</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Notifications" && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold text-gray-900">Email Preferences</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between py-4 border-b border-gray-50">
                                                    <div className="flex-1 pr-4">
                                                        <p className="text-sm font-bold text-gray-900">Email Notifications</p>
                                                        <p className="text-xs text-gray-400 font-medium mt-0.5">Receive email notifications for important events</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationToggle("emailNotifications")}
                                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                                                            formData.notifications.emailNotifications ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                                                                formData.notifications.emailNotifications ? "left-7" : "left-1"
                                                            }`}
                                                        ></div>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between py-4 border-b border-gray-50">
                                                    <div className="flex-1 pr-4">
                                                        <p className="text-sm font-bold text-gray-900">Interview Reminders</p>
                                                        <p className="text-xs text-gray-400 font-medium mt-0.5">Get notified 1 hour before an interview</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationToggle("interviewReminders")}
                                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                                                            formData.notifications.interviewReminders ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                                                                formData.notifications.interviewReminders ? "left-7" : "left-1"
                                                            }`}
                                                        ></div>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between py-4 border-b border-gray-50">
                                                    <div className="flex-1 pr-4">
                                                        <p className="text-sm font-bold text-gray-900">Application Alerts</p>
                                                        <p className="text-xs text-gray-400 font-medium mt-0.5">Alert when new applications are received</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationToggle("applicationAlerts")}
                                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                                                            formData.notifications.applicationAlerts ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                                                                formData.notifications.applicationAlerts ? "left-7" : "left-1"
                                                            }`}
                                                        ></div>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between py-4">
                                                    <div className="flex-1 pr-4">
                                                        <p className="text-sm font-bold text-gray-900">Candidate Updates</p>
                                                        <p className="text-xs text-gray-400 font-medium mt-0.5">Updates about candidate activities and progress</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationToggle("candidateUpdates")}
                                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                                                            formData.notifications.candidateUpdates ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                                                                formData.notifications.candidateUpdates ? "left-7" : "left-1"
                                                            }`}
                                                        ></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Security" && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold text-gray-900">Password & Authentication</h4>
                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => setShowPasswordModal(true)}
                                                    className="w-full p-4 flex items-center justify-between bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-gray-100"
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-amber-500">
                                                            <Lock className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">Change Password</p>
                                                            <p className="text-xs text-gray-400 font-medium">Last updated {formData.security.lastPasswordChange}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-blue-600 font-bold text-xs uppercase pr-2">Update</span>
                                                </button>

                                                <button
                                                    onClick={() => setShow2FAModal(true)}
                                                    className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all group border ${
                                                        formData.security.twoFactorEnabled
                                                            ? "bg-emerald-50 border-emerald-100"
                                                            : "bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-md"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div
                                                            className={`p-3 rounded-xl shadow-sm ${
                                                                formData.security.twoFactorEnabled
                                                                    ? "bg-white text-emerald-600"
                                                                    : "bg-white text-gray-400 group-hover:text-blue-500"
                                                            }`}
                                                        >
                                                            <Shield className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                                                            <p
                                                                className={`text-xs font-bold uppercase tracking-widest mt-0.5 ${
                                                                    formData.security.twoFactorEnabled
                                                                        ? "text-emerald-600/70"
                                                                        : "text-gray-400"
                                                                }`}
                                                            >
                                                                {formData.security.twoFactorEnabled ? "Enabled • Very Secure" : "Disabled"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`font-bold text-xs uppercase pr-2 ${
                                                            formData.security.twoFactorEnabled ? "text-emerald-600" : "text-blue-600"
                                                        }`}
                                                    >
                                                        {formData.security.twoFactorEnabled ? "Manage" : "Enable"}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Save Button */}
                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-4">
                                    <button
                                        onClick={() => setFormData(settings)}
                                        className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveChanges}
                                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all"
                                    >
                                        <Save className="w-4.5 h-4.5" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-[#0B1221] text-gray-400 pt-16 pb-8 border-t border-gray-800">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                                    <BriefcaseDefault className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-2xl text-white tracking-tight">NextHire</span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400 font-medium">
                                Your gateway to amazing career opportunities. Connect with top employers and find your dream job today.
                            </p>
                            <div className="flex gap-3 pt-2">
                                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-[12px]">Quick Links</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                {["Browse Jobs", "Post a Job", "Companies", "Candidates", "Resources"].map(link => (
                                    <li key={link}><Link to="#" className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]">{link}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-[12px]">Support</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                {["Help Center", "Privacy Policy", "Terms of Service", "Contact Support", "FAQ"].map(link => (
                                    <li key={link}><Link to="#" className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]">{link}</Link></li>
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
                                    <span className="text-[12px] group-hover:text-white transition-all">hello@NextHire.com</span>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="text-[12px] group-hover:text-white transition-all">+1 (555) 123-4567</span>
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

            {/* Modals */}
            <PasswordChangeModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} onSave={handlePasswordChange} />
            <TwoFactorModal isOpen={show2FAModal} onClose={() => setShow2FAModal(false)} onSave={handleTwoFactorChange} is2FAEnabled={formData.security.twoFactorEnabled} />

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

