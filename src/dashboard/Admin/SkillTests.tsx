import {
    LayoutDashboard,
    Briefcase,
    Users,
    FileCheck,
    Calendar,
    BarChart3,
    Settings,
    Search,
    LogOut,
    Plus as PlusIcon,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    FileText,
    Download,
    X,
    CheckCircle,
    FileEdit,
    Award,
    Clock,
} from "lucide-react";
import { useState, useMemo } from "react";
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

const baseCandidates = [
    {
        id: "NH-2024-001",
        name: "Alexander Wright",
        email: "alex.wright@example.com",
        phone: "+1 (555) 012-3456",
        resume: "alexander_wright_cv.pdf",
        jobApplied: "Senior React Developer",
        skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS", "Docker"],
        experience: "5 years",
        experienceYears: 5,
        certifications: ["AWS Certified Developer", "React Professional"],
        certSub: "React Developer",
        match: 94,
    },
    {
        id: "NH-2024-002",
        name: "Sarah Chen",
        email: "sarah.c@tech.io",
        phone: "+1 (555) 987-6543",
        resume: "sarah_chen_expert.pdf",
        jobApplied: "Backend Lead",
        skills: ["Python", "Django", "PostgreSQL", "Redis", "Kubernetes"],
        experience: "7 years",
        experienceYears: 7,
        certifications: ["Google Cloud Architect", "Python Institute"],
        certSub: "Python Institute Pro",
        match: 89,
    },
    {
        id: "NH-2024-003",
        name: "Marcus Johnson",
        email: "m.johnson@dev.com",
        phone: "+1 (555) 444-3322",
        resume: "johnson_marcus_resume.pdf",
        jobApplied: "Full Stack Engineer",
        skills: ["Java", "Spring", "MySQL", "Angular", "Hibernate"],
        experience: "4 years",
        experienceYears: 4,
        certifications: ["Oracle Certified", "Spring Professional"],
        certSub: "Spring Professional",
        match: 76,
    },
    {
        id: "NH-2024-004",
        name: "Elena Rodriguez",
        email: "elena.rod@webflow.com",
        phone: "+1 (555) 222-1111",
        resume: "elena_rod_cv.pdf",
        jobApplied: "Frontend Developer",
        skills: ["Angular", "TypeScript", "Firebase", "Sass", "RxJS"],
        experience: "3 years",
        experienceYears: 3,
        certifications: ["Angular Certified", "Google Analytics"],
        certSub: "Google Analytics Expert",
        match: 82,
    },
    {
        id: "NH-2024-005",
        name: "David Kim",
        email: "d.kim@vision.net",
        phone: "+1 (555) 000-8888",
        resume: "david_kim_portfolio.pdf",
        jobApplied: "PHP Developer",
        skills: ["Vue.js", "PHP", "Laravel", "MySQL", "Tailwind"],
        experience: "6 years",
        experienceYears: 6,
        certifications: ["Zend Certified", "Vue.js Expert"],
        certSub: "Vue.js Expert",
        match: 68,
    },
    {
        id: "NH-2024-006",
        name: "Sophie Laurent",
        email: "s.laurent@design.fr",
        phone: "+33 6 12 34 56 78",
        resume: "sophie_laurent_ux.pdf",
        jobApplied: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        experience: "4 years",
        experienceYears: 4,
        certifications: ["HCI Certification", "Google UX Design"],
        certSub: "Interaction Design",
        match: 55,
    },
    {
        id: "NH-2024-007",
        name: "Thomas Müller",
        email: "t.mueller@corp.de",
        phone: "+49 171 2345678",
        resume: "thomas_m_dev.pdf",
        jobApplied: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "Go"],
        experience: "8 years",
        experienceYears: 8,
        certifications: ["CKA Specialist", "HashiCorp Certified"],
        certSub: "Cloud Infrastructure",
        match: 91,
    }
];

const initialCandidates = Array.from({ length: 30 }, (_, i) => ({
    ...baseCandidates[i % baseCandidates.length],
    id: `NH-2024-${String(i + 1).padStart(3, '0')}`
}));

const initialAssessments = [
    { title: "React Proficiency Test", role: "Senior Frontend Developer", skill: "React", questions: 25, time: "45m", passing: 75 },
    { title: "Python Backend Mastery", role: "Backend Engineer", skill: "Python", questions: 30, time: "60m", passing: 80 },
];

export const SkillTests = (): JSX.Element => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Skill Tests");
    const [searchTerm, setSearchTerm] = useState("");
    const [expFilter, setExpFilter] = useState("All Experience Levels");
    const [matchFilter, setMatchFilter] = useState("All Skill Matches");
    const [sortOption, setSortOption] = useState("Skill Match % (High to Low)");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modals
    const [identityModal, setIdentityModal] = useState(false);
    const [assessmentModal, setAssessmentModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [assessments, setAssessments] = useState(initialAssessments);

    const handleNavigation = (path: string, label: string) => {
        setActiveItem(label);
        navigate(path);
    };

    const getStatusColor = (match: number) => {
        if (match >= 80) return "text-emerald-600";
        if (match >= 60) return "text-amber-600";
        return "text-rose-600";
    };

    const getProgressBarColor = (match: number) => {
        if (match >= 80) return "bg-emerald-500";
        if (match >= 60) return "bg-amber-500";
        return "bg-rose-500";
    };

    // Filtered and Sorted Candidates
    const filteredCandidates = useMemo(() => {
        let result = initialCandidates.filter(c =>
            c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (expFilter !== "All Experience Levels") {
            const minYears = parseInt(expFilter);
            result = result.filter(c => c.experienceYears >= minYears);
        }

        if (matchFilter !== "All Skill Matches") {
            const minMatch = parseInt(matchFilter);
            result = result.filter(c => c.match >= minMatch);
        }

        // Sorting
        result.sort((a, b) => {
            if (sortOption === "Skill Match % (High to Low)") return b.match - a.match;
            if (sortOption === "Skill Match % (Low to High)") return a.match - b.match;
            if (sortOption === "Experience Level") return b.experienceYears - a.experienceYears;
            return 0;
        });

        return result;
    }, [searchTerm, expFilter, matchFilter, sortOption]);

    const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / itemsPerPage));
    const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const exportToCSV = () => {
        const headers = ["Candidate ID", "Skills", "Experience", "Certifications", "Skill Match Percentage"];
        const rows = filteredCandidates.map(c => [
            c.id,
            `"${c.skills.join(", ")}"`,
            c.experience,
            `"${c.certifications.join(", ")}"`,
            `${c.match}%`
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "skill_assessments.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRevealIdentity = (candidate: any) => {
        setSelectedCandidate(candidate);
        setIdentityModal(true);
    };

    const handleCreateAssessment = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newAsm = {
            title: formData.get("title") as string,
            role: formData.get("role") as string,
            skill: formData.get("skill") as string,
            questions: parseInt(formData.get("questions") as string),
            time: formData.get("time") as string,
            passing: parseInt(formData.get("passing") as string),
        };
        setAssessments([...assessments, newAsm]);
        setAssessmentModal(false);
        alert("Assessment created successfully!");
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
                            <FileCheck className="w-5 h-5 shadow-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setAssessmentModal(true)}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            <PlusIcon className="w-4 h-4" />
                            New Assessment
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
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Skill Assessments</h2>
                                <p className="text-gray-500 font-medium mt-1">Review anonymous candidate performance and screening results</p>
                            </div>
                            <div className="bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Candidates</span>
                                <p className="text-xl font-extrabold text-blue-600">{filteredCandidates.length}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden p-8 min-h-[800px]">
                            {/* Filters */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm mb-10 flex flex-wrap items-center gap-4">
                                <div className="flex-1 min-w-[300px] relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by skills or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>

                                <div className="relative min-w-[200px]">
                                    <select
                                        value={expFilter}
                                        onChange={(e) => setExpFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>All Experience Levels</option>
                                        <option value="3">3+ Years</option>
                                        <option value="5">5+ Years</option>
                                        <option value="7">7+ Years</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <div className="relative min-w-[180px]">
                                    <select
                                        value={matchFilter}
                                        onChange={(e) => setMatchFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>All Skill Matches</option>
                                        <option value="60">60%+</option>
                                        <option value="80">80%+</option>
                                        <option value="90">90%+</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                            </div>

                            <div className="flex items-center justify-between mb-6 px-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-400">Sort by:</span>
                                    <div className="relative min-w-[240px]">
                                        <select
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer"
                                        >
                                            <option>Skill Match % (High to Low)</option>
                                            <option>Skill Match % (Low to High)</option>
                                            <option>Experience Level</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                            <th className="px-8 py-5">Candidate ID</th>
                                            <th className="px-8 py-5 text-center">Skills</th>
                                            <th className="px-8 py-5 text-center">Experience</th>
                                            <th className="px-8 py-5 text-center">Certifications</th>
                                            <th className="px-8 py-5 text-center">Skill Match</th>
                                            <th className="px-8 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedCandidates.map((candidate: any) => (
                                            <tr key={candidate.id} className="hover:bg-blue-50/5 transition-all group">
                                                <td className="px-8 py-6 font-bold text-gray-800 text-sm">{candidate.id}</td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-[250px] mx-auto">
                                                        {candidate.skills.slice(0, 3).map((skill: string) => (
                                                            <span key={skill} className="px-2 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-md">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {candidate.skills.length > 3 && (
                                                            <span className="text-[10px] font-bold text-gray-400">+{candidate.skills.length - 3} more</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center text-sm font-bold text-gray-700">{candidate.experience}</td>
                                                <td className="px-8 py-6 text-center">
                                                    <p className="text-sm font-bold text-gray-800 leading-tight">{candidate.certifications[0]}</p>
                                                    <p className="text-[11px] font-medium text-gray-400">{candidate.certSub}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden min-w-[80px] max-w-[100px]">
                                                            <div
                                                                className={`h-full ${getProgressBarColor(candidate.match)} rounded-full transition-all duration-1000`}
                                                                style={{ width: `${candidate.match}%` }}
                                                            />
                                                        </div>
                                                        <span className={`text-sm font-extrabold ${getStatusColor(candidate.match)}`}>
                                                            {candidate.match}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <button
                                                        onClick={() => handleRevealIdentity(candidate)}
                                                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mx-auto"
                                                    >
                                                        <Eye className="w-4 h-4 text-gray-200" />
                                                        Reveal Identity
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-10 flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-400">
                                    Showing {(currentPage - 1) * itemsPerPage + 1}-
                                    {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} candidates
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className={`p-2 border border-gray-200 rounded-lg text-gray-400 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-blue-600'}`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 border border-gray-200 rounded-lg text-gray-400 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-blue-600'}`}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Reveal Identity Modal */}
            {identityModal && selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">
                                    {selectedCandidate.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{selectedCandidate.name}</h3>
                                    <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">{selectedCandidate.jobApplied}</p>
                                </div>
                            </div>
                            <button onClick={() => setIdentityModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-8 grid grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</label>
                                    <p className="font-bold text-gray-800 text-[13px]">{selectedCandidate.email}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone</label>
                                    <p className="font-bold text-gray-800 text-[13px]">{selectedCandidate.phone}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> Experience</label>
                                    <p className="font-bold text-gray-800 text-[13px]">{selectedCandidate.experience}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Resume</label>
                                    <p className="font-bold text-blue-600 text-[13px] cursor-pointer hover:underline">{selectedCandidate.resume}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Award className="w-3.5 h-3.5" /> Certifications</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.certifications.map((c: string) => (
                                            <span key={c} className="px-2 py-1 bg-amber-50 text-[10px] font-bold text-amber-600 border border-amber-100 rounded-lg">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><FileEdit className="w-3.5 h-3.5" /> Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((s: string) => (
                                            <span key={s} className="px-2 py-1 bg-gray-50 text-[10px] font-bold text-gray-600 border border-gray-100 rounded-lg">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Skill Match</span>
                                        <span className="text-xl font-black text-emerald-600">{selectedCandidate.match}%</span>
                                    </div>
                                    <div className="h-2 bg-white rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedCandidate.match}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
                            <button onClick={() => alert("Redirecting to profile...")} className="flex-1 py-4.5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-700 hover:bg-gray-50 transition-all tracking-[3px] uppercase">View Full Profile</button>
                            <button onClick={() => alert("Moved to Interview!")} className="flex-1 py-4.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 tracking-[3px] uppercase">Move to Interview</button>
                            <button onClick={() => alert("Candidate Shortlisted!")} className="flex-1 py-4.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 tracking-[3px] uppercase">Shortlist</button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Assessment Modal */}
            {assessmentModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Create Skill Assessment</h3>
                                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[3px] mt-1">Define new screening criteria</p>
                            </div>
                            <button onClick={() => setAssessmentModal(false)} className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 shadow-sm border border-transparent hover:border-gray-100"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleCreateAssessment} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Assessment Title</label>
                                    <input name="title" required type="text" placeholder="e.g. Senior Backend Node.js" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Job Role</label>
                                    <input name="role" required type="text" placeholder="e.g. Lead Engineer" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Required Principal Skill</label>
                                    <input name="skill" required type="text" placeholder="e.g. Node.js" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Experience Level</label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all">
                                        <option>Junior (1-2y)</option>
                                        <option>Mid-Level (3-5y)</option>
                                        <option>Senior (5-8y)</option>
                                        <option>Expert (8y+)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Time Limit</label>
                                    <input name="time" required type="text" placeholder="e.g. 60m" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> Passing Score %</label>
                                    <input name="passing" required type="number" placeholder="e.g. 75" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Number of Questions</label>
                                <input name="questions" required type="number" placeholder="e.g. 25" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
                            </div>
                            <div className="flex items-center gap-4 pt-4">
                                <button type="button" onClick={() => setAssessmentModal(false)} className="flex-1 py-4.5 px-6 border border-gray-200 rounded-2xl text-[10px] font-black text-gray-500 hover:bg-gray-50 transition-all tracking-[3px] uppercase">Cancel</button>
                                <button type="submit" className="flex-[2] py-4.5 px-6 bg-blue-600 text-white rounded-2xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 tracking-[3px] uppercase">Create Assessment</button>
                            </div>
                        </form>
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
