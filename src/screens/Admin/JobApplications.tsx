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
    Plus,
    Bell,
    Search,
    ChevronDown,
    Download,
    Filter,
    Eye,
    MoreHorizontal,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    X,
    CheckCircle,
    XCircle,
    FileEdit,
    AlertCircle,
    Award,
    BookOpen,
    Code,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Jobs", icon: Briefcase, path: "/admin/jobs" },
    { label: "Applications", icon: FileText, path: "/admin/applications" },
    { label: "Candidates", icon: Users, path: "/admin/candidates" },
    { label: "Skill Tests", icon: FileCheck, path: "/admin/skill-tests" },
    { label: "Interviews", icon: Calendar, path: "/admin/interviews" },
    { label: "Analytics", icon: BarChart3, path: "/admin/reports" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
    { label: "Logout", icon: LogOut, path: "/logout" },
];

const baseApplications = [
    {
        id: "APP-001",
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        position: "Frontend Developer",
        type: "Remote • Full-time",
        date: "2024-01-15",
        score: 92,
        status: "Interview",
        skills: ["React", "TypeScript", "Tailwind", "Next.js"],
        experience: "5 Years",
        education: "B.S. Computer Science",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        resume: "sarah_chen_resume.pdf"
    },
    {
        id: "APP-002",
        name: "James Wilson",
        email: "j.wilson@email.com",
        position: "Backend Developer",
        type: "On-site • Full-time",
        date: "2024-01-14",
        score: 87,
        status: "Under Review",
        skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
        experience: "4 Years",
        education: "M.S. Software Engineering",
        avatar: "https://i.pravatar.cc/150?u=james",
        resume: "james_wilson_cv.pdf"
    },
    {
        id: "APP-003",
        name: "Michael Rodriguez",
        email: "m.rodriguez@email.com",
        position: "UI/UX Designer",
        type: "Remote • Part-time",
        date: "2024-01-13",
        score: 78,
        status: "Pending",
        skills: ["Figma", "User Research", "Adobe XD", "Prototyping"],
        experience: "3 Years",
        education: "B.A. Graphic Design",
        avatar: "https://i.pravatar.cc/150?u=michael",
        resume: "michael_r_portfolio.pdf"
    },
    {
        id: "APP-004",
        name: "Emily Johnson",
        email: "emily.j@email.com",
        position: "Full Stack Developer",
        type: "Remote • Full-time",
        date: "2024-01-12",
        score: 95,
        status: "Hired",
        skills: ["React", "Node.js", "GraphQL", "MongoDB"],
        experience: "6 Years",
        education: "B.S. Information Systems",
        avatar: "https://i.pravatar.cc/150?u=emily",
        resume: "emily_j_dev.pdf"
    },
    {
        id: "APP-005",
        name: "David Park",
        email: "d.park@email.com",
        position: "Frontend Developer",
        type: "On-site • Full-time",
        date: "2024-01-11",
        score: 65,
        status: "Rejected",
        skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
        experience: "2 Years",
        education: "Associate Degree IT",
        avatar: "https://i.pravatar.cc/150?u=david",
        resume: "david_park_resume.doc"
    },
];

const initialApplications = Array.from({ length: 30 }, (_, i) => ({
    ...baseApplications[i % baseApplications.length],
    id: `APP-${String(i + 1).padStart(3, '0')}`
}));

export const JobApplications = (): JSX.Element => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Applications");
    const [appData, setAppData] = useState(initialApplications);

    // Filtering States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("All Positions");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedScoreRange, setSelectedScoreRange] = useState("All Scores");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal States
    const [profileModal, setProfileModal] = useState(false);
    const [addJobModal, setAddJobModal] = useState(false);
    const [exportModal, setExportModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [optionsModal, setOptionsModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

    // Filter Logic
    const filteredApps = appData.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.position.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPosition = selectedPosition === "All Positions" || app.position === selectedPosition;
        const matchesStatus = selectedStatus === "All Status" || app.status === selectedStatus;
        const matchesScore = selectedScoreRange === "All Scores" ||
            (selectedScoreRange === "90%+" && app.score >= 90) ||
            (selectedScoreRange === "80%+" && app.score >= 80);

        return matchesSearch && matchesPosition && matchesStatus && matchesScore;
    });

    const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.max(1, Math.ceil(filteredApps.length / itemsPerPage));

    const handleNavigation = (path: string, label: string) => {
        setActiveItem(label);
        navigate(path);
    };

    const handleAction = (type: string, candidate: any) => {
        setSelectedCandidate(candidate);
        if (type === 'view') setProfileModal(true);
        if (type === 'options') setOptionsModal(true);
    };

    const updateStatus = (status: string) => {
        if (selectedCandidate) {
            setAppData(appData.map(app => app.id === selectedCandidate.id ? { ...app, status } : app));
            setOptionsModal(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Hired": return "bg-green-100 text-green-700";
            case "Interview": return "bg-amber-100 text-amber-700";
            case "Rejected": return "bg-red-100 text-red-700";
            case "Under Review": return "bg-blue-100 text-blue-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "bg-green-500";
        if (score >= 75) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-100 flex items-center sticky top-0 z-30">
                <div className="w-full px-6 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/admin/dashboard")}
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Briefcase className="w-5 h-5 shadow-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setAddJobModal(true)}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-100"
                        >
                            <Plus className="w-4 h-4" />
                            Add Job
                        </button>
                        <div className="relative">
                            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[10px] text-white flex items-center justify-center">3</span>
                            </button>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=sarah" alt="Admin" className="w-full h-full object-cover" />
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
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Applications</h2>
                            <p className="text-gray-500 font-medium mt-1">Review and manage candidate applications</p>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Search Candidates</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Position</label>
                                <div className="relative">
                                    <select
                                        value={selectedPosition}
                                        onChange={(e) => setSelectedPosition(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold appearance-none outline-none focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option>All Positions</option>
                                        <option>Frontend Developer</option>
                                        <option>Backend Developer</option>
                                        <option>UI/UX Designer</option>
                                        <option>Full Stack Developer</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold appearance-none outline-none focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option>All Status</option>
                                        <option>Interview</option>
                                        <option>Under Review</option>
                                        <option>Pending</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Skill Score</label>
                                <div className="relative">
                                    <select
                                        value={selectedScoreRange}
                                        onChange={(e) => setSelectedScoreRange(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold appearance-none outline-none focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option>All Scores</option>
                                        <option>90%+</option>
                                        <option>80%+</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky left-0">
                                <h3 className="font-bold text-gray-900">Applications ({filteredApps.length})</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setExportModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export
                                    </button>
                                    <button
                                        onClick={() => setFilterModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Advanced Filter
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-4">Candidate</th>
                                            <th className="px-8 py-4 text-center">Job Position</th>
                                            <th className="px-8 py-4 text-center">Applied Date</th>
                                            <th className="px-8 py-4 text-center">Skill Score</th>
                                            <th className="px-8 py-4 text-center">Status</th>
                                            <th className="px-8 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedApps.map((app, i) => (
                                            <tr key={i} className="hover:bg-blue-50/5 transition-all group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm ring-2 ring-transparent group-hover:ring-blue-100 transition-all">
                                                            {app.avatar ? (
                                                                <img src={app.avatar} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="bg-blue-600 w-full h-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                                                                    {app.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{app.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{app.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <p className="text-sm font-bold text-gray-700 whitespace-nowrap">{app.position}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{app.type}</p>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap uppercase tracking-wider">{new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3 justify-center min-w-[140px]">
                                                        <span className="text-sm font-black text-gray-800 tabular-nums">{app.score}%</span>
                                                        <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden max-w-[80px] border border-gray-100">
                                                            <div className={`h-full ${getScoreColor(app.score)} rounded-full shadow-lg transition-all duration-1000`} style={{ width: `${app.score}%` }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border border-transparent ${getStatusStyle(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => alert(`Downloading Resume: ${app.resume}`)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100"
                                                            title="Download Resume"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('view', app)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100"
                                                            title="View Profile"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('options', app)}
                                                            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all border border-transparent hover:border-gray-200"
                                                            title="More Options"
                                                        >
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-6 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredApps.length)} of {filteredApps.length} results</span>
                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className={`px-4 py-2 border border-gray-200 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-500 hover:bg-white'}`}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className={`px-4 py-2 border border-gray-200 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-500 hover:bg-white'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Candidate Profile Modal */}
            {profileModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 mx-4 border border-gray-100">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100">
                                    <img src={selectedCandidate.avatar} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{selectedCandidate.name}</h3>
                                    <p className="text-blue-600 font-bold text-xs uppercase tracking-[2px] mt-1 flex items-center gap-2">
                                        <Award className="w-3.5 h-3.5" />
                                        {selectedCandidate.position}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setProfileModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] flex items-center gap-2">
                                        <Mail className="w-3 h-3 text-blue-500" /> Email Address
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.email}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] flex items-center gap-2">
                                        <Briefcase className="w-3 h-3 text-blue-500" /> Experience
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.experience}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] flex items-center gap-2">
                                        <BookOpen className="w-3 h-3 text-blue-500" /> Education
                                    </label>
                                    <p className="font-bold text-gray-800 text-sm">{selectedCandidate.education}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3 text-blue-500" /> Skill Score
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-gray-900 text-sm">{selectedCandidate.score}%</span>
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${getScoreColor(selectedCandidate.score)}`} style={{ width: `${selectedCandidate.score}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] flex items-center gap-2">
                                    <Code className="w-3 h-3 text-blue-500" /> Technical Skills
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCandidate.skills.map((skill: string) => (
                                        <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold border border-gray-100 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 group">
                                    <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                    Download Candidate Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Options Modal */}
            {optionsModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 mx-4">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Manage Application</h4>
                            <button onClick={() => setOptionsModal(false)} className="p-1 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-gray-900">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-4 space-y-1">
                            <button onClick={() => updateStatus("Interview")} className="w-full flex items-center gap-3 p-4 hover:bg-blue-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-all">
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
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Finalized recruitment</p>
                                </div>
                            </button>
                            <button onClick={() => updateStatus("Rejected")} className="w-full flex items-center gap-3 p-4 hover:bg-rose-50 rounded-2xl transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-all">
                                    <XCircle className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Reject Candidate</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">End application process</p>
                                </div>
                            </button>
                            <div className="pt-2">
                                <button onClick={() => alert("Notes feature coming soon!")} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition-all group border-t border-gray-50">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-white transition-all">
                                        <FileEdit className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900 text-sm">Add Notes</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Internal team feedback</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {exportModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 mx-4">
                        <div className="p-10 text-center space-y-6">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner shadow-blue-100 animate-bounce cursor-pointer">
                                <Download className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Export Data</h3>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-[2px] mt-2">Choose preferred format</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {["CSV Spreadsheet", "Excel Document", "PDF Document"].map((fmt) => (
                                    <button
                                        key={fmt}
                                        onClick={() => {
                                            alert(`Exporting as ${fmt}...`);
                                            setExportModal(false);
                                        }}
                                        className="w-full py-4 px-6 border border-gray-100 rounded-2xl text-sm font-black text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all flex items-center justify-between group"
                                    >
                                        {fmt}
                                        <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setExportModal(false)} className="text-gray-400 font-black text-[10px] uppercase tracking-[3px] hover:text-gray-900 transition-colors">Cancel Export</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Job Modal (Consolidated Interface) */}
            {addJobModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100 mx-4">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 leading-tight">Create New Job</h3>
                                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[3px] mt-1 italic">Internal Recruitment Module</p>
                            </div>
                            <button onClick={() => setAddJobModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Job Title</label>
                                    <input type="text" placeholder="e.g. Senior Product Designer" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Department</label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer">
                                        <option>Engineering</option>
                                        <option>Product Design</option>
                                        <option>Marketing</option>
                                        <option>Customer Success</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Job Type</label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer">
                                        <option>Full-time</option>
                                        <option>Contract</option>
                                        <option>Remote</option>
                                        <option>Part-time</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Experience</label>
                                    <input type="text" placeholder="e.g. 5+ Years" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Salary Range</label>
                                    <input type="text" placeholder="e.g. $120k - $160k" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Deadline</label>
                                    <input type="date" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Required Skills</label>
                                <input type="text" placeholder="e.g. React, TypeScript, Node.js (Comma separated)" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Description</label>
                                <textarea rows={4} placeholder="Describe the role and responsibilities..." className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all resize-none"></textarea>
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
                            <button onClick={() => setAddJobModal(false)} className="flex-1 py-4 px-6 border border-gray-200 rounded-2xl text-sm font-black text-gray-500 hover:bg-white hover:text-gray-900 transition-all tracking-widest uppercase">Cancel</button>
                            <button onClick={() => {
                                alert("Job Posted Successfully!");
                                setAddJobModal(false);
                            }} className="flex-[2] py-4 px-6 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 tracking-widest uppercase">Post Job Opportunity</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Advanced Filter Modal */}
            {filterModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 mx-4">
                        <div className="p-8 flex items-center justify-between border-b border-gray-50 bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Filter className="w-5 h-5" />
                                </div>
                                <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm">Fine Filters</h4>
                            </div>
                            <button onClick={() => setFilterModal(false)} className="p-2 hover:bg-white rounded-xl transition-all text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Filter by Date Range</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="date" className="p-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                                    <input type="date" className="p-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">Candidate Name</label>
                                <input type="text" placeholder="e.g. John Doe" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 outline-none" />
                            </div>
                            <button
                                onClick={() => setFilterModal(false)}
                                className="w-full py-5 bg-blue-600 text-white rounded-[20px] font-black uppercase tracking-[3px] text-xs shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4"
                            >
                                Apply All Filters
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedPosition("All Positions");
                                    setSelectedStatus("All Status");
                                    setSelectedScoreRange("All Scores");
                                    setSearchQuery("");
                                    setFilterModal(false);
                                }}
                                className="w-full py-2 text-gray-400 font-black uppercase tracking-[2px] text-[10px] hover:text-rose-500 transition-colors"
                            >
                                Reset To Defaults
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sub-Footer from design */}
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
