import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    FileCheck,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Filter,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    MoreHorizontal,
    Star,
    MessageSquare,
    Eye,
    X,
    Plus,
    UserPlus,
    CheckCircle,
    XCircle,
    FileEdit,
    AlertCircle,
    Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
    { label: "Jobs", icon: Briefcase, path: "/hr/jobs" },
    { label: "Applications", icon: FileText, path: "/hr/applications" },
    { label: "Candidates", icon: Users, path: "/hr/candidates" },
    { label: "Skill Tests", icon: FileCheck, path: "/hr/skill-tests" },
    { label: "Interviews", icon: Calendar, path: "/hr/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/hr/reports" },
    { label: "Settings", icon: Settings, path: "/hr/settings" },
    { label: "Logout", icon: LogOut, path: "/logout" },
];

const baseCandidates = [
    {
        id: "CAN-001",
        name: "Alexander Thomsen",
        email: "a.thomsen@example.com",
        phone: "+1 (555) 123-4567",
        position: "Senior Frontend Engineer",
        experience: "8 Years",
        salary: "LKR 120,000 – LKR 140,000",
        rating: 4.8,
        status: "Interviewing",
        skills: ["React", "TypeScript", "Next.js", "Tailwind"],
        avatar: "https://i.pravatar.cc/150?u=alex",
        resume: "alex_thomsen_cv.pdf",
        department: "Engineering",
        seniority: "Senior"
    },
    {
        id: "CAN-002",
        name: "Sofia Rodriguez",
        email: "sofia.r@example.com",
        phone: "+1 (555) 234-5678",
        position: "Product Designer",
        experience: "5 Years",
        salary: "LKR 95,000 – LKR 115,000",
        rating: 4.5,
        status: "Shortlisted",
        skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
        avatar: "https://i.pravatar.cc/150?u=sofia",
        resume: "sofia_rod_portfolio.pdf",
        department: "Design",
        seniority: "Mid-Level"
    },
    {
        id: "CAN-003",
        name: "Marcus Aurelius",
        email: "marcus.a@example.com",
        phone: "+1 (555) 345-6789",
        position: "Backend Architect",
        experience: "12 Years",
        salary: "LKR 150,000 – LKR 180,000",
        rating: 4.9,
        status: "Hired",
        skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
        avatar: "https://i.pravatar.cc/150?u=marcus",
        resume: "marcus_arch_resume.pdf",
        department: "Engineering",
        seniority: "Senior"
    },
    {
        id: "CAN-004",
        name: "Elena Gilbert",
        email: "elena.g@example.com",
        phone: "+1 (555) 456-7890",
        position: "Marketing Manager",
        experience: "4 Years",
        salary: "LKR 70,000 – LKR 85,000",
        rating: 4.2,
        status: "New",
        skills: ["SEO", "AdWords", "Content Marketing", "Analytics"],
        avatar: "https://i.pravatar.cc/150?u=elena",
        resume: "elena_gilbert_mk.pdf",
        department: "Marketing",
        seniority: "Mid-Level"
    },
    {
        id: "CAN-005",
        name: "David Beckham",
        email: "david.b@example.com",
        phone: "+1 (555) 567-8901",
        position: "Quality Assurance",
        experience: "6 Years",
        salary: "LKR 80,000 – LKR 95,000",
        rating: 4.4,
        status: "Rejected",
        skills: ["Selenium", "Jest", "TDD", "Cypress"],
        avatar: "https://i.pravatar.cc/150?u=david",
        resume: "david_b_qa.doc",
        department: "Engineering",
        seniority: "Mid-Level"
    },
    {
        id: "CAN-006",
        name: "Isabella Swan",
        email: "bella.s@example.com",
        phone: "+1 (555) 678-9012",
        position: "Data Scientist",
        experience: "3 Years",
        salary: "LKR 110,000 – LKR 130,000",
        rating: 4.6,
        status: "Shortlisted",
        skills: ["Python", "PyTorch", "Tableau", "Machine Learning"],
        avatar: "https://i.pravatar.cc/150?u=isabella",
        resume: "isabella_swan_data.pdf",
        department: "Engineering",
        seniority: "Junior"
    },
];

const initialCandidates = Array.from({ length: 30 }, (_, i) => ({
    ...baseCandidates[i % baseCandidates.length],
    id: `CAN-${String(i + 1).padStart(3, '0')}`
}));

export const HrCandidates = (): JSX.Element => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Candidates");
    const [candidates, setCandidates] = useState(initialCandidates);

    // Filtering States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("Department");
    const [selectedSeniority, setSelectedSeniority] = useState("Seniority");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal States
    const [profileModal, setProfileModal] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [optionsModal, setOptionsModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [messageSubject, setMessageSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [messageSentSuccess, setMessageSentSuccess] = useState(false);

    // Filter Logic
    const filteredCandidates = candidates.filter(can => {
        const matchesSearch = can.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            can.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            can.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesDept = selectedDept === "Department" || can.department === selectedDept;
        const matchesSeniority = selectedSeniority === "Seniority" || can.seniority === selectedSeniority;

        return matchesSearch && matchesDept && matchesSeniority;
    });

    const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / itemsPerPage));

    const handleNavigation = (path: string, label: string) => {
        setActiveItem(label);
        navigate(path);
    };

    const handleAction = (type: string, candidate: any) => {
        setSelectedCandidate(candidate);
        if (type === 'view') setProfileModal(true);
        if (type === 'message') {
            setMessageSubject("Interview Invitation - NextHire");
            setMessageBody("");
            setMessageSentSuccess(false);
            setMessageModal(true);
        }
        if (type === 'options') setOptionsModal(true);
    };

    const handleCloseMessageModal = () => {
        setMessageModal(false);
        setMessageSubject("");
        setMessageBody("");
        setMessageSentSuccess(false);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setMessageSentSuccess(true);
        setMessageSubject("");
        setMessageBody("");
        setTimeout(() => {
            handleCloseMessageModal();
        }, 1500);
    };

    const updateStatus = (status: string) => {
        if (selectedCandidate) {
            setCandidates(candidates.map(can => can.id === selectedCandidate.id ? { ...can, status } : can));
            setOptionsModal(false);
        }
    };

    const exportToCSV = () => {
        const headers = ["Candidate Name", "Email", "Experience", "Average Score", "Status", "Top Skills"];
        const rows = filteredCandidates.map(can => [
            can.name,
            can.email,
            can.experience,
            can.rating.toString(),
            can.status,
            can.skills.join("; ")
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "candidates_export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Hired": return "bg-emerald-50 text-emerald-600";
            case "Interviewing": return "bg-blue-50 text-blue-600";
            case "Rejected": return "bg-rose-50 text-rose-600";
            case "Shortlisted": return "bg-emerald-50 text-emerald-600";
            case "New": return "bg-purple-50 text-purple-600";
            default: return "bg-gray-50 text-gray-600";
        }
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
                            <Users className="w-5 h-5 shadow-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setInviteModal(true)}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-100"
                        >
                            <UserPlus className="w-4 h-4" />
                            Invite Candidate
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
                        {sidebarItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item.path, item.label)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeItem === item.label
                                    ? "bg-blue-50 text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${activeItem === item.label ? "text-blue-600" : "text-gray-400"}`} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Candidate Database</h2>
                                <p className="text-gray-500 font-medium mt-1">Manage and track all talent in your organization</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                                >
                                    <Download className="w-4.5 h-4.5" />
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center gap-6">
                            <div className="flex-1 min-w-[300px] relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or skill..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative min-w-[160px]">
                                    <select
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>Department</option>
                                        <option>Engineering</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <div className="relative min-w-[160px]">
                                    <select
                                        value={selectedSeniority}
                                        onChange={(e) => setSelectedSeniority(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>Seniority</option>
                                        <option>Senior</option>
                                        <option>Mid-Level</option>
                                        <option>Junior</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 transition-all border border-transparent">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Candidate Grid/Table */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-5">Candidate</th>
                                            <th className="px-8 py-5">Experience</th>
                                            <th className="px-8 py-5 text-center">Avg Score</th>
                                            <th className="px-8 py-5 text-center">Status</th>
                                            <th className="px-8 py-5 text-center">Top Skills</th>
                                            <th className="px-8 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedCandidates.map((candidate, i) => (
                                            <tr key={i} className="hover:bg-blue-50/5 transition-all group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm group-hover:ring-4 group-hover:ring-blue-50 transition-all">
                                                            <img src={candidate.avatar} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-[15px]">{candidate.name}</p>
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{candidate.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-gray-700">{candidate.experience}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{candidate.position}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full w-fit mx-auto border border-amber-100 shadow-sm shadow-amber-50/50">
                                                        <Star className="w-3.5 h-3.5 fill-current" />
                                                        <span className="text-xs font-black">{candidate.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[1.5px] border border-transparent shadow-sm ${getStatusStyle(candidate.status)}`}>
                                                        {candidate.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {candidate.skills.slice(0, 2).map((skill, idx) => (
                                                            <span key={idx} className="bg-white text-gray-500 px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-100 shadow-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {candidate.skills.length > 2 && (
                                                            <span className="text-[10px] font-black text-gray-300">+{candidate.skills.length - 2}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleAction('view', candidate)}
                                                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100 shadow-sm hover:shadow-blue-100"
                                                            title="View Profile"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAction('message', candidate)}
                                                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100 shadow-sm hover:shadow-blue-100"
                                                            title="Send Message"
                                                        >
                                                            <MessageSquare className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('options', candidate)}
                                                            className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200"
                                                            title="More Options"
                                                        >
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[2px]">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} potential hires</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className={`p-2.5 border border-gray-200 rounded-xl transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-400 hover:bg-white hover:text-blue-600 shadow-sm'}`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className={`p-2.5 border border-gray-200 rounded-xl transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-400 hover:bg-white hover:text-blue-600 shadow-sm'}`}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Candidate Profile Modal */}
            {profileModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100">
                                    <img src={selectedCandidate.avatar} className="w-full h-full object-cover" alt={selectedCandidate.name} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{selectedCandidate.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(selectedCandidate.status)}`}>
                                            {selectedCandidate.status}
                                        </span>
                                        <span className="text-gray-300 text-xs font-bold">•</span>
                                        <p className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                            {selectedCandidate.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setProfileModal(false)} className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-blue-500" /> Email
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.email}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.phone}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Experience
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.experience}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <AlertCircle className="w-3.5 h-3.5 text-blue-500" /> Avg Score
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-gray-900 text-sm">{selectedCandidate.rating} / 5.0</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(selectedCandidate.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <LinkIcon className="w-3.5 h-3.5 text-blue-500" /> Portfolio
                                    </label>
                                    <a href="#" className="font-bold text-blue-600 text-sm hover:underline">viewportfolio.link/candidate</a>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> Current Location
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">San Francisco, CA</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2.5px] flex items-center gap-2">
                                    Core Skills & Proficiency
                                </label>
                                <div className="flex flex-wrap gap-2.5">
                                    {selectedCandidate.skills.map((skill: string) => (
                                        <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold border border-gray-100 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <button className="w-full py-4.5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 group">
                                    <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                    Download Full Resume ({selectedCandidate.resume})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Invite Candidate Modal */}
            {inviteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Invite Candidate</h3>
                                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[3px] mt-1">Add new talent to database</p>
                            </div>
                            <button onClick={() => setInviteModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-gray-400 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Full Name</label>
                                    <input type="text" placeholder="e.g. John Doe" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Phone Number</label>
                                    <input type="text" placeholder="+1 (234) 567-890" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Job Position</label>
                                    <input type="text" placeholder="e.g. UX Designer" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Experience Level</label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer">
                                        <option>Junior (1-2 Years)</option>
                                        <option>Mid-Level (3-5 Years)</option>
                                        <option>Senior (5+ Years)</option>
                                        <option>Expert (10+ Years)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Resume Upload</label>
                                    <div className="w-full px-5 py-3.5 bg-blue-50/50 border border-dashed border-blue-200 rounded-2xl text-sm font-bold text-blue-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-100 transition-all">
                                        <Plus className="w-4 h-4" />
                                        Upload PDF/DOC
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Top Skills (Comma separated)</label>
                                <input type="text" placeholder="e.g. React, UI Design, Project Management" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
                            <button onClick={() => setInviteModal(false)} className="flex-1 py-4.5 px-6 border border-gray-200 rounded-2xl text-[10px] font-black text-gray-500 hover:bg-white hover:text-gray-900 transition-all tracking-[3px] uppercase">Cancel</button>
                            <button onClick={() => {
                                alert("Invitation Sent Successfully!");
                                setInviteModal(false);
                            }} className="flex-[2] py-4.5 px-6 bg-blue-600 text-white rounded-2xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 tracking-[3px] uppercase">Send Invite</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {messageModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Send Message</h3>
                                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider mt-0.5">Contact candidate</p>
                                </div>
                            </div>
                            <button type="button" onClick={handleCloseMessageModal} className="p-2.5 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-900" aria-label="Close">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSendMessage} className="p-6 space-y-5 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Candidate Name</label>
                                    <p className="font-bold text-gray-900 text-sm mt-1">{selectedCandidate.name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Candidate Email</label>
                                    <p className="font-bold text-gray-800 text-sm mt-1">{selectedCandidate.email}</p>
                                </div>
                            </div>
                            {messageSentSuccess ? (
                                <div className="py-8 px-4 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <p className="font-black text-gray-900 text-lg">Message sent successfully</p>
                                    <p className="text-gray-500 text-sm font-bold mt-1">Your message has been sent to {selectedCandidate.email}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Subject</label>
                                        <input
                                            type="text"
                                            value={messageSubject}
                                            onChange={(e) => setMessageSubject(e.target.value)}
                                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                                            placeholder="e.g. Interview Invitation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Message</label>
                                        <textarea
                                            rows={4}
                                            value={messageBody}
                                            onChange={(e) => setMessageBody(e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 pt-2">
                                        <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[20px] font-black uppercase tracking-[3px] text-xs shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                                            Send Message
                                        </button>
                                        <button type="button" onClick={handleCloseMessageModal} className="text-gray-400 font-black text-[10px] uppercase tracking-[3px] hover:text-gray-900 transition-colors">
                                            Discard Message
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* Options Modal */}
            {optionsModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 px-4">
                    <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Bulk Actions</h4>
                            <button onClick={() => setOptionsModal(false)} className="p-1 hover:bg-white rounded-lg transition-all text-gray-400">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-4 space-y-1">
                            <button onClick={() => updateStatus("Shortlisted")} className="w-full flex items-center gap-3 p-4 hover:bg-emerald-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-all">
                                    <Star className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Shortlist Candidate</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Add to top priority list</p>
                                </div>
                            </button>
                            <button onClick={() => updateStatus("Interviewing")} className="w-full flex items-center gap-3 p-4 hover:bg-blue-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Move to Interview</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Schedule screening call</p>
                                </div>
                            </button>
                            <button onClick={() => updateStatus("Hired")} className="w-full flex items-center gap-3 p-4 hover:bg-green-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-all">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Mark as Hired</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Onboard to the team</p>
                                </div>
                            </button>
                            <button onClick={() => updateStatus("Rejected")} className="w-full flex items-center gap-3 p-4 hover:bg-rose-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-all">
                                    <XCircle className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Reject Candidate</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Remove from pipeline</p>
                                </div>
                            </button>
                            <button onClick={() => alert("Notes feature coming soon!")} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition-all group border-t border-gray-50 mt-2">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-white transition-all">
                                    <FileEdit className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Add Internal Notes</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">For hiring team review</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sub-Footer */}
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
        </div>
    );
};
