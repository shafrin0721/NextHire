import {
    LayoutDashboard,
    Briefcase,
    Users,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    MoreHorizontal,
    Video,
    Clock,
    User,
    CheckCircle2,
    XCircle,
    Plus,
    X,
    Edit,
    RefreshCw,
    Bell,
    CheckCircle,
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { validateRequired, validateStartDate, getTodayDateString } from "../../utils/validation";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
    { label: "Jobs", icon: Briefcase, path: "/hr/jobs" },
    { label: "Candidates", icon: Users, path: "/hr/candidates" },
    { label: "Interviews", icon: Calendar, path: "/hr/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/hr/reports" },
    { label: "Settings", icon: Settings, path: "/hr/settings" },
    { label: "Logout", icon: LogOut, path: "/logout" },
];

type Interview = {
    id: string;
    candidate: string;
    position: string;
    interviewer: string;
    date: string;
    time: string;
    type: string;
    status: string;
    location: string;
    notes?: string;
    avatar: string;
};

const baseInterviews: Interview[] = [
    {
        id: "INT-001",
        candidate: "Sarah Jenkins",
        position: "Senior Frontend Developer",
        interviewer: "Mark Wilson",
        date: "2024-03-15",
        time: "10:30 AM",
        type: "Video Call",
        status: "Upcoming",
        location: "zoom.us/j/123456789",
        avatar: "https://i.pravatar.cc/150?u=sarahj",
    },
    {
        id: "INT-002",
        candidate: "David Miller",
        position: "Backend Engineer",
        interviewer: "Dr. Sarah Adams",
        date: "2024-03-15",
        time: "02:00 PM",
        type: "On-site",
        status: "Confirmed",
        location: "Meeting Room B, 4th Floor",
        avatar: "https://i.pravatar.cc/150?u=davidm",
    },
    {
        id: "INT-003",
        candidate: "Emily Chen",
        position: "UI/UX Designer",
        interviewer: "Jessica Lee",
        date: "2024-03-16",
        time: "11:00 AM",
        type: "Video Call",
        status: "Pending",
        location: "google.meet/xyz-abc-123",
        avatar: "https://i.pravatar.cc/150?u=emilyc",
    },
    {
        id: "INT-004",
        candidate: "Michael Brown",
        position: "DevOps Engineer",
        interviewer: "Robert Taylor",
        date: "2024-03-14",
        time: "09:30 AM",
        type: "Video Call",
        status: "Completed",
        location: "zoom.us/j/987654321",
        avatar: "https://i.pravatar.cc/150?u=michaelb",
    },
    {
        id: "INT-005",
        candidate: "Jessica White",
        position: "Product Manager",
        interviewer: "Amelia Scott",
        date: "2024-03-14",
        time: "04:30 PM",
        type: "Video Call",
        status: "Cancelled",
        location: "zoom.us/j/456789123",
        avatar: "https://i.pravatar.cc/150?u=jessicaw",
    },
    {
        id: "INT-006",
        candidate: "Liam Torres",
        position: "Data Scientist",
        interviewer: "Nina Patel",
        date: "2024-03-17",
        time: "01:00 PM",
        type: "Video Call",
        status: "Upcoming",
        location: "teams.microsoft.com/meet/liam",
        avatar: "https://i.pravatar.cc/150?u=liamt",
    },
    {
        id: "INT-007",
        candidate: "Priya Sharma",
        position: "QA Engineer",
        interviewer: "Ben Carter",
        date: "2024-03-18",
        time: "10:00 AM",
        type: "On-site",
        status: "Pending",
        location: "Conference Room A, 2nd Floor",
        avatar: "https://i.pravatar.cc/150?u=priyas",
    },
];

const initialInterviews: Interview[] = Array.from({ length: 30 }, (_, i) => ({
    ...baseInterviews[i % baseInterviews.length],
    id: `INT-${String(i + 1).padStart(3, '0')}`
}));

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Upcoming": return "bg-blue-50 text-blue-600 border border-blue-100";
        case "Confirmed": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
        case "Pending": return "bg-amber-50 text-amber-600 border border-amber-100";
        case "Completed": return "bg-gray-100 text-gray-500 border border-gray-200";
        case "Cancelled": return "bg-rose-50 text-rose-600 border border-rose-100";
        default: return "bg-gray-50 text-gray-500";
    }
};

const ITEMS_PER_PAGE = 10;

export const HrInterviews = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [currentPage, setCurrentPage] = useState(1);

    // Modals
    const [scheduleModal, setScheduleModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Schedule Form
    const emptyForm = {
        candidate: "", position: "", date: "", time: "",
        type: "Video Call", location: "", interviewer: "", notes: "",
    };
    const [form, setForm] = useState(emptyForm);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    // Filtered + Paginated
    const filtered = useMemo(() => {
        let res = interviews.filter(iv =>
            iv.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            iv.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (statusFilter !== "All Statuses") res = res.filter(iv => iv.status === statusFilter);
        if (typeFilter !== "All Types") res = res.filter(iv => iv.type === typeFilter);
        return res;
    }, [interviews, searchTerm, statusFilter, typeFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Reset to page 1 on filter change
    const applyFilter = (fn: () => void) => { fn(); setCurrentPage(1); };

    // --- Actions ---
    const handleConfirm = (id: string) => {
        setInterviews(prev => prev.map(iv => iv.id === id ? { ...iv, status: "Confirmed" } : iv));
    };

    const handleCancelConfirm = () => {
        if (!selectedInterview) return;
        setInterviews(prev => prev.map(iv => iv.id === selectedInterview.id ? { ...iv, status: "Cancelled" } : iv));
        setCancelModal(false);
        setSelectedInterview(null);
    };

    const handleMarkCompleted = (id: string) => {
        setInterviews(prev => prev.map(iv => iv.id === id ? { ...iv, status: "Completed" } : iv));
        setOpenMenuId(null);
    };

    const handleReschedule = (iv: Interview) => {
        setSelectedInterview(iv);
        setForm({ candidate: iv.candidate, position: iv.position, date: iv.date, time: iv.time, type: iv.type, location: iv.location, interviewer: iv.interviewer, notes: iv.notes ?? "" });
        setFormErrors({});
        setEditModal(true);
        setOpenMenuId(null);
    };

    const handleSendReminder = (iv: Interview) => {
        alert(`✅ Reminder sent to ${iv.candidate} for interview on ${iv.date} at ${iv.time}.`);
        setOpenMenuId(null);
    };

    const validateInterviewForm = () => {
        const candidateError = validateRequired(form.candidate);
        const positionError = validateRequired(form.position);
        const dateError = validateStartDate(form.date);
        const timeError = validateRequired(form.time);
        const interviewerError = validateRequired(form.interviewer);
        const locationError = validateRequired(form.location);
        const err: Record<string, string> = {};
        if (candidateError) err.candidate = candidateError;
        if (positionError) err.position = positionError;
        if (dateError) err.date = dateError;
        if (timeError) err.time = timeError;
        if (interviewerError) err.interviewer = interviewerError;
        if (locationError) err.location = locationError;
        setFormErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleScheduleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInterviewForm()) return;
        const newInterview: Interview = {
            id: `INT-${String(interviews.length + 1).padStart(3, "0")}`,
            ...form,
            status: "Upcoming",
            avatar: `https://i.pravatar.cc/150?u=${form.candidate.replace(/\s/g, "")}`,
        };
        setInterviews(prev => [newInterview, ...prev]);
        setForm(emptyForm);
        setFormErrors({});
        setScheduleModal(false);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInterview) return;
        if (!validateInterviewForm()) return;
        setInterviews(prev => prev.map(iv => iv.id === selectedInterview.id ? { ...iv, ...form } : iv));
        setFormErrors({});
        setEditModal(false);
        setSelectedInterview(null);
    };

    const exportToCSV = () => {
        const headers = ["Candidate Name", "Job Position", "Interview Date", "Interview Time", "Interview Type", "Status", "Interviewer Name", "Location"];
        const rows = filtered.map(iv => [iv.candidate, iv.position, iv.date, iv.time, iv.type, iv.status, iv.interviewer, iv.location]);
        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "interview_schedule.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Shared form UI
    const InterviewForm = ({ onSubmit, title, sub }: { onSubmit: (e: React.FormEvent) => void; title: string; sub: string }) => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-white rounded-[28px] w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="p-7 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                        <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[3px] mt-0.5">{sub}</p>
                    </div>
                    <button type="button" onClick={() => { setScheduleModal(false); setEditModal(false); setFormErrors({}); }} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all text-gray-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="p-7 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidate Name</label>
                            <input value={form.candidate} onChange={e => setForm(f => ({ ...f, candidate: e.target.value }))} placeholder="e.g. John Smith" className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.candidate ? "border-red-500" : ""}`} />
                            {formErrors.candidate && <p className="text-xs text-red-600">{formErrors.candidate}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Job Position</label>
                            <input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder="e.g. Senior Developer" className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.position ? "border-red-500" : ""}`} />
                            {formErrors.position && <p className="text-xs text-red-600">{formErrors.position}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interview Date</label>
                            <input type="date" min={getTodayDateString()} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.date ? "border-red-500" : ""}`} />
                            {formErrors.date && <p className="text-xs text-red-600">{formErrors.date}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interview Time</label>
                            <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.time ? "border-red-500" : ""}`} />
                            {formErrors.time && <p className="text-xs text-red-600">{formErrors.time}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interview Type</label>
                            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-50 transition-all">
                                <option>Video Call</option>
                                <option>On-site</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interviewer Name</label>
                            <input value={form.interviewer} onChange={e => setForm(f => ({ ...f, interviewer: e.target.value }))} placeholder="e.g. Dr. Smith" className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.interviewer ? "border-red-500" : ""}`} />
                            {formErrors.interviewer && <p className="text-xs text-red-600">{formErrors.interviewer}</p>}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location / Meeting Link</label>
                        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. zoom.us/j/... or Room 4B" className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all ${formErrors.location ? "border-red-500" : ""}`} />
                        {formErrors.location && <p className="text-xs text-red-600">{formErrors.location}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notes (Optional)</label>
                        <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any special instructions or topics to cover..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all resize-none" />
                    </div>
                    <div className="flex gap-4 pt-2">
                        <button type="button" onClick={() => { setScheduleModal(false); setEditModal(false); setFormErrors({}); }} className="flex-1 py-3.5 border border-gray-200 rounded-xl text-xs font-black text-gray-500 hover:bg-gray-50 transition-all tracking-widest uppercase">Cancel</button>
                        <button type="submit" className="flex-[2] py-3.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 tracking-widest uppercase">{title}</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-100 flex items-center sticky top-0 z-30">
                <div className="w-full px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/hr/dashboard")}>
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { setForm(emptyForm); setFormErrors({}); setScheduleModal(true); }}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-100"
                        >
                            <Plus className="w-4 h-4" />
                            Schedule Interview
                        </button>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
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
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interview Schedule</h2>
                                <p className="text-gray-500 font-medium mt-1">Manage and track upcoming candidate interviews</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Export Schedule
                                </button>
                                <button
                                    onClick={() => { setForm(emptyForm); setFormErrors({}); setScheduleModal(true); }}
                                    className="flex md:hidden items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Schedule
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-[260px] relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by candidate or interviewer..."
                                    value={searchTerm}
                                    onChange={e => applyFilter(() => setSearchTerm(e.target.value))}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div className="relative min-w-[170px]">
                                <select
                                    value={statusFilter}
                                    onChange={e => applyFilter(() => setStatusFilter(e.target.value))}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                >
                                    <option>All Statuses</option>
                                    <option>Upcoming</option>
                                    <option>Confirmed</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative min-w-[160px]">
                                <select
                                    value={typeFilter}
                                    onChange={e => applyFilter(() => setTypeFilter(e.target.value))}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                >
                                    <option>All Types</option>
                                    <option>Video Call</option>
                                    <option>On-site</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/60 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                            <th className="px-7 py-5">Candidate</th>
                                            <th className="px-7 py-5">Position</th>
                                            <th className="px-7 py-5 text-center">Date & Time</th>
                                            <th className="px-7 py-5 text-center">Type</th>
                                            <th className="px-7 py-5 text-center">Status</th>
                                            <th className="px-7 py-5 text-center">Interviewer</th>
                                            <th className="px-7 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginated.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-8 py-16 text-center text-gray-400 font-semibold text-sm">
                                                    No interviews match your search or filters.
                                                </td>
                                            </tr>
                                        ) : paginated.map((iv) => (
                                            <tr key={iv.id} className="hover:bg-blue-50/5 transition-all group">
                                                <td className="px-7 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <img src={iv.avatar} className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm" alt="" />
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{iv.candidate}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">{iv.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-7 py-5">
                                                    <p className="text-sm font-bold text-gray-700 whitespace-nowrap">{iv.position}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate max-w-[180px]" title={iv.location}>{iv.location}</p>
                                                </td>
                                                <td className="px-7 py-5">
                                                    <div className="flex flex-col items-center gap-0.5">
                                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
                                                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                                            {iv.date}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {iv.time}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-7 py-5">
                                                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-600">
                                                        {iv.type === "Video Call"
                                                            ? <Video className="w-4 h-4 text-blue-500" />
                                                            : <MapPin className="w-4 h-4 text-emerald-500" />}
                                                        {iv.type}
                                                    </div>
                                                </td>
                                                <td className="px-7 py-5 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(iv.status)}`}>
                                                        {iv.status}
                                                    </span>
                                                </td>
                                                <td className="px-7 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <User className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-700 whitespace-nowrap">{iv.interviewer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-7 py-5">
                                                    <div className="flex items-center justify-center gap-2" ref={openMenuId === iv.id ? menuRef : undefined}>
                                                        {/* Confirm button */}
                                                        <button
                                                            onClick={() => handleConfirm(iv.id)}
                                                            title="Confirm Interview"
                                                            className={`p-1.5 rounded-lg transition-all ${iv.status === "Confirmed" || iv.status === "Completed" || iv.status === "Cancelled" ? "text-gray-300 cursor-not-allowed" : "text-emerald-600 hover:bg-emerald-50"}`}
                                                            disabled={iv.status === "Confirmed" || iv.status === "Completed" || iv.status === "Cancelled"}
                                                        >
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </button>
                                                        {/* Cancel button */}
                                                        <button
                                                            onClick={() => { setSelectedInterview(iv); setCancelModal(true); }}
                                                            title="Cancel Interview"
                                                            className={`p-1.5 rounded-lg transition-all ${iv.status === "Cancelled" || iv.status === "Completed" ? "text-gray-300 cursor-not-allowed" : "text-rose-500 hover:bg-rose-50"}`}
                                                            disabled={iv.status === "Cancelled" || iv.status === "Completed"}
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                        {/* More options */}
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setOpenMenuId(openMenuId === iv.id ? null : iv.id)}
                                                                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-all"
                                                            >
                                                                <MoreHorizontal className="w-5 h-5" />
                                                            </button>
                                                            {openMenuId === iv.id && (
                                                                <div className="absolute right-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden" ref={menuRef}>
                                                                    <button onClick={() => handleReschedule(iv)} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                                                                        <Edit className="w-4 h-4 text-blue-500" /> Edit Interview
                                                                    </button>
                                                                    <button onClick={() => handleReschedule(iv)} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                                                                        <RefreshCw className="w-4 h-4 text-amber-500" /> Reschedule
                                                                    </button>
                                                                    <button onClick={() => handleMarkCompleted(iv.id)} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                                                                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Mark as Completed
                                                                    </button>
                                                                    <button onClick={() => handleSendReminder(iv)} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all border-t border-gray-50">
                                                                        <Bell className="w-4 h-4 text-purple-500" /> Send Reminder
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
                                <span className="text-xs font-bold text-gray-400">
                                    Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} interviews
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className={`p-2 border border-gray-200 rounded-lg transition-all ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white text-gray-500"}`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-white"}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 border border-gray-200 rounded-lg transition-all ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-white text-gray-500"}`}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Modals ── */}

            {/* Schedule Modal */}
            {scheduleModal && (
                <InterviewForm onSubmit={handleScheduleSubmit} title="Schedule Interview" sub="Add a new interview to the calendar" />
            )}

            {/* Edit / Reschedule Modal */}
            {editModal && (
                <InterviewForm onSubmit={handleEditSubmit} title="Edit Interview" sub="Update interview details" />
            )}

            {/* Cancel Confirmation Modal */}
            {cancelModal && selectedInterview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">Cancel Interview?</h3>
                        <p className="text-gray-500 text-sm font-medium mt-2 mb-6">
                            Are you sure you want to cancel the interview with <span className="font-bold text-gray-800">{selectedInterview.candidate}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setCancelModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                                Keep It
                            </button>
                            <button onClick={handleCancelConfirm} className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-[#0B1221] text-gray-400 pt-16 pb-8 border-t border-gray-800">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-2xl text-white tracking-tight">NextHire</span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400 font-medium">
                                Your gateway to amazing career opportunities.
                            </p>
                            <div className="flex gap-3 pt-2">
                                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                        <Icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[12px]">Quick Links</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                {["Browse Jobs", "Post a Job", "Companies", "Candidates", "Resources"].map(link => (
                                    <li key={link}><Link to="#" className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]">{link}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[12px]">Support</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                {["Help Center", "Privacy Policy", "Terms of Service", "Contact Support", "FAQ"].map(link => (
                                    <li key={link}><Link to="#" className="hover:text-blue-500 transition-colors uppercase tracking-tight text-[11px]">{link}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[12px]">Contact Info</h4>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 transition-all"><Mail className="w-4 h-4" /></div>
                                <span className="text-[12px] group-hover:text-white transition-all">hello@NextHire.com</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 transition-all"><Phone className="w-4 h-4" /></div>
                                <span className="text-[12px] group-hover:text-white transition-all">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="p-2.5 rounded-lg bg-gray-800 group-hover:bg-blue-600/10 transition-all shrink-0"><MapPin className="w-4 h-4" /></div>
                                <span className="text-[12px] group-hover:text-white transition-all leading-relaxed">123 Business Ave, Suite 100<br />San Francisco, CA 94105</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-800 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-600">© 2024 NextHire. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

