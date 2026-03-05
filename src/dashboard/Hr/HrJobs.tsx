import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    FileCheck,
    Calendar,
    BarChart3,
    Settings,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Filter,
    LogOut,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Plus,
    Edit,
    Trash2,
    Eye,
    Briefcase as BriefcaseIcon,
    X,
} from "lucide-react";
import { useState } from "react";
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

const initialJobs = [
    {
        id: "JB-2024-001",
        title: "Senior Frontend Developer",
        department: "Engineering",
        type: "Full-time",
        applicants: 124,
        posted: "Oct 12, 2024",
        deadline: "2024-11-15",
        status: "Active",
        salary: "LKR 120,000 – LKR 150,000",
        description: "We are looking for a Senior Frontend Developer to lead our UI team. You will be responsible for building high-performance, responsive web applications using React and TypeScript.",
        requirements: "8+ years of experience with React, TypeScript, and modern CSS frameworks like Tailwind.",
        experience: "8+ Years",
    },
    {
        id: "JB-2024-002",
        title: "UI/UX Designer",
        department: "Design",
        type: "Contract",
        applicants: 85,
        posted: "Oct 10, 2024",
        deadline: "2024-11-10",
        status: "Active",
        salary: "LKR 90,000 – LKR 110,000",
        description: "Join our creative team as a UX Designer to craft seamless and intuitive user experiences.",
        requirements: "5+ years in UX/UI design. Proficiency in Figma and user research.",
        experience: "5+ Years",
    },
    {
        id: "JB-2024-003",
        title: "DevOps Architect",
        department: "Engineering",
        type: "Full-time",
        applicants: 42,
        posted: "Oct 08, 2024",
        deadline: "2024-10-30",
        status: "Draft",
        salary: "LKR 160,000 – LKR 190,000",
        description: "Lead our cloud infrastructure and automation strategies.",
        requirements: "AWS, Kubernetes, Terraform, and CI/CD expert.",
        experience: "10+ Years",
    },
    {
        id: "JB-2024-004",
        title: "Product Marketing Manager",
        department: "Marketing",
        type: "Full-time",
        applicants: 67,
        posted: "Oct 05, 2024",
        deadline: "2024-11-05",
        status: "Closed",
        salary: "LKR 100,000 – LKR 130,000",
        description: "Drive our product marketing strategy and growth.",
        requirements: "Experience in SaaS marketing and brand positioning.",
        experience: "6+ Years",
    },
    {
        id: "JB-2024-005",
        title: "Data Engineer",
        department: "Engineering",
        type: "Full-time",
        applicants: 38,
        posted: "Oct 03, 2024",
        deadline: "2024-11-01",
        status: "Active",
        salary: "LKR 130,000 – LKR 160,000",
        description: "Build and maintain data pipelines and analytics infrastructure.",
        requirements: "Python, SQL, Spark, and cloud data services.",
        experience: "5+ Years",
    },
    {
        id: "JB-2024-006",
        title: "HR Coordinator",
        department: "Operations",
        type: "Full-time",
        applicants: 52,
        posted: "Oct 01, 2024",
        deadline: "2024-10-25",
        status: "Active",
        salary: "LKR 70,000 – LKR 90,000",
        description: "Support recruitment and employee onboarding processes.",
        requirements: "HR experience and strong organizational skills.",
        experience: "3+ Years",
    },
];

export const HrJobs = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const [jobList, setJobList] = useState(initialJobs);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Modal States
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [viewJobModal, setViewJobModal] = useState(false);
    const [editJobModal, setEditJobModal] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [postJobModal, setPostJobModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        department: "Engineering",
        type: "Full Time",
        salary: "",
        experience: "",
        description: "",
        skills: "",
        deadline: "",
        status: "Active",
    });
    const [postFormErrors, setPostFormErrors] = useState<Record<string, string>>({});
    const [editDeadlineError, setEditDeadlineError] = useState("");

    const paginatedJobs = jobList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.max(1, Math.ceil(jobList.length / itemsPerPage));

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleAction = (type: 'view' | 'edit' | 'delete', job: any) => {
        setSelectedJob({ ...job });
        if (type === 'view') setViewJobModal(true);
        if (type === 'edit') setEditJobModal(true);
        if (type === 'delete') setDeleteConfirmModal(true);
    };

    const handleDelete = () => {
        if (selectedJob) {
            setJobList(jobList.filter(j => j.id !== selectedJob.id));
            setDeleteConfirmModal(false);
            setSelectedJob(null);
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;
        const deadlineError = validateStartDate(selectedJob.deadline);
        if (deadlineError) {
            setEditDeadlineError(deadlineError);
            return;
        }
        setEditDeadlineError("");
        setJobList(jobList.map(j => j.id === selectedJob.id ? selectedJob : j));
        setEditJobModal(false);
        setSelectedJob(null);
    };

    const handlePostJob = (e: React.FormEvent) => {
        e.preventDefault();
        const titleError = validateRequired(formData.title);
        const salaryError = validateRequired(formData.salary);
        const experienceError = validateRequired(formData.experience);
        const deadlineError = validateStartDate(formData.deadline);
        const skillsError = validateRequired(formData.skills);
        const descriptionError = validateRequired(formData.description);
        if (titleError || salaryError || experienceError || deadlineError || skillsError || descriptionError) {
            setPostFormErrors({
                ...(titleError && { title: titleError }),
                ...(salaryError && { salary: salaryError }),
                ...(experienceError && { experience: experienceError }),
                ...(deadlineError && { deadline: deadlineError }),
                ...(skillsError && { skills: skillsError }),
                ...(descriptionError && { description: descriptionError }),
            });
            return;
        }
        setPostFormErrors({});
        const nextId = `JB-2024-${String(jobList.length + 1).padStart(3, '0')}`;
        const newJob = {
            ...formData,
            id: nextId,
            applicants: 0,
            posted: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            requirements: formData.skills,
        };
        setJobList([newJob, ...jobList]);
        setPostJobModal(false);
        setFormData({
            title: "",
            department: "Engineering",
            type: "Full Time",
            salary: "",
            experience: "",
            description: "",
            skills: "",
            deadline: "",
            status: "Active",
        });
    };

    const escapeCsvValue = (value: string | number): string => {
        const str = String(value);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const handleDownloadReport = () => {
        const headers = ["Job Title", "Job ID", "Department", "Salary Range", "Number of Applicants", "Status", "Deadline", "Posted Date"];
        const rows = jobList.map((job) => [
            escapeCsvValue(job.title),
            escapeCsvValue(job.id),
            escapeCsvValue(job.department),
            escapeCsvValue(job.salary ?? ""),
            escapeCsvValue(job.applicants ?? 0),
            escapeCsvValue(job.status),
            escapeCsvValue(job.deadline ?? ""),
            escapeCsvValue(job.posted ?? ""),
        ]);
        const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "job-listings-report.csv";
        link.click();
        URL.revokeObjectURL(url);
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
                            <Briefcase className="w-5 h-5 shadow-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">NextHire</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPostJobModal(true)}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Post a Job
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
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Listings</h2>
                                <p className="text-gray-500 font-medium mt-1">Manage and track your open career opportunities</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleDownloadReport}
                                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <Download className="w-4.5 h-4.5" />
                                    Download Report
                                </button>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center gap-6">
                            <div className="flex-1 min-w-[300px] relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by job title, id or department..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative min-w-[160px]">
                                    <select className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer">
                                        <option>Department</option>
                                        <option>Engineering</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <div className="relative min-w-[160px]">
                                    <select className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 outline-none appearance-none cursor-pointer">
                                        <option>Status</option>
                                        <option>Active</option>
                                        <option>Draft</option>
                                        <option>Closed</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 transition-all border border-transparent">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Jobs Grid/Table */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-5">Job Details</th>
                                            <th className="px-8 py-5">Department</th>
                                            <th className="px-8 py-5 text-center">Applicants</th>
                                            <th className="px-8 py-5 text-center">Status</th>
                                            <th className="px-8 py-5 text-center">Deadline</th>
                                            <th className="px-8 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedJobs.map((job, i) => (
                                            <tr key={i} className="hover:bg-blue-50/5 transition-all group">
                                                <td className="px-8 py-6">
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-[15px]">{job.title}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{job.id}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{job.type}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{job.department}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">{job.salary}</p>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs ring-4 ring-blue-50/50">
                                                        {job.applicants}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.status === "Active" ? "bg-emerald-50 text-emerald-600" : job.status === "Draft" ? "bg-gray-100 text-gray-500" : "bg-rose-50 text-rose-600"}`}>
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <p className="text-xs font-bold text-gray-600">{job.deadline}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 mt-1">Posted: {job.posted}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleAction('view', job)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('edit', job)}
                                                            className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                                            title="Edit Job"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('delete', job)}
                                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                            title="Delete Job"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
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
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, jobList.length)} of {jobList.length} jobs</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        className={`p-2 border border-gray-200 rounded-lg transition-all ${currentPage === 1 ? 'text-gray-300 opacity-50 cursor-not-allowed' : 'text-gray-400 hover:bg-white'}`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            type="button"
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-white'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        className={`p-2 border border-gray-200 rounded-lg transition-all ${currentPage === totalPages ? 'text-gray-300 opacity-50 cursor-not-allowed' : 'text-gray-400 hover:bg-white'}`}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* View Job Modal */}
            {viewJobModal && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Job Detail View</h3>
                                <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">Ref: {selectedJob.id}</p>
                            </div>
                            <button onClick={() => setViewJobModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Job Title</label>
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.title}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Department</label>
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.department}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Job Type</label>
                                    <p className="text-lg font-bold text-gray-900 text-blue-600 uppercase tracking-wider text-xs">{selectedJob.type}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Experience</label>
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.experience}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Salary Range</label>
                                    <p className="text-lg font-bold text-blue-600">{selectedJob.salary}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Deadline</label>
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.deadline}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Description</label>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">{selectedJob.description}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Requirements</label>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border-l-4 border-blue-500">{selectedJob.requirements}</p>
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex justify-end">
                            <button onClick={() => setViewJobModal(false)} className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-gray-800 transition-all">Close Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Job Modal */}
            {editJobModal && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <form onSubmit={handleUpdate} className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Edit Job Details</h3>
                                <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">Editing Mode • {selectedJob.id}</p>
                            </div>
                            <button type="button" onClick={() => setEditJobModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label>
                                    <input
                                        type="text"
                                        value={selectedJob.title}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Department</label>
                                    <select
                                        value={selectedJob.department}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, department: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all cursor-pointer"
                                    >
                                        <option>Engineering</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                        <option>Operations</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Type</label>
                                    <select
                                        value={selectedJob.type}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all cursor-pointer"
                                    >
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Contract</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Salary Range</label>
                                    <input
                                        type="text"
                                        value={selectedJob.salary}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, salary: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                                    <select
                                        value={selectedJob.status}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Active</option>
                                        <option>Draft</option>
                                        <option>Closed</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Deadline</label>
                                    <input
                                        type="date"
                                        min={getTodayDateString()}
                                        value={selectedJob.deadline}
                                        onChange={(e) => { setSelectedJob({ ...selectedJob, deadline: e.target.value }); setEditDeadlineError(""); }}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all ${editDeadlineError ? "border-red-500" : ""}`}
                                    />
                                    {editDeadlineError && <p className="text-xs text-red-600">{editDeadlineError}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Experience Required</label>
                                    <input
                                        type="text"
                                        value={selectedJob.experience}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, experience: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Required Skills</label>
                                    <input
                                        type="text"
                                        value={selectedJob.requirements}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={selectedJob.description}
                                    onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Requirements</label>
                                <textarea
                                    rows={3}
                                    value={selectedJob.requirements}
                                    onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex justify-end gap-3">
                            <button type="button" onClick={() => setEditJobModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">Discard Changes</button>
                            <button type="submit" className="px-8 py-3 bg-amber-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-100 hover:bg-amber-600 transition-all">Update Job</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Post a Job Modal */}
            {postJobModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <form onSubmit={handlePostJob} className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Post a New Job</h3>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">Create a new career opportunity</p>
                            </div>
                            <button type="button" onClick={() => setPostJobModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Frontend Developer"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${postFormErrors.title ? "border-red-500" : ""}`}
                                    />
                                    {postFormErrors.title && <p className="text-xs text-red-600">{postFormErrors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Department</label>
                                    <select
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                    >
                                        <option>Engineering</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                        <option>Operations</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                    >
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Contract</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Experience Required</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 5+ Years"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${postFormErrors.experience ? "border-red-500" : ""}`}
                                    />
                                    {postFormErrors.experience && <p className="text-xs text-red-600">{postFormErrors.experience}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Salary Range</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. LKR 100,000 – LKR 120,000"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${postFormErrors.salary ? "border-red-500" : ""}`}
                                    />
                                    {postFormErrors.salary && <p className="text-xs text-red-600">{postFormErrors.salary}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Deadline</label>
                                    <input
                                        type="date"
                                        min={getTodayDateString()}
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${postFormErrors.deadline ? "border-red-500" : ""}`}
                                    />
                                    {postFormErrors.deadline && <p className="text-xs text-red-600">{postFormErrors.deadline}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Required Skills</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. React, Node.js, AWS"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${postFormErrors.skills ? "border-red-500" : ""}`}
                                    />
                                    {postFormErrors.skills && <p className="text-xs text-red-600">{postFormErrors.skills}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                    >
                                        <option>Active</option>
                                        <option>Draft</option>
                                        <option>Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the role and responsibilities..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={`w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none ${postFormErrors.description ? "border-red-500" : ""}`}
                                />
                                {postFormErrors.description && <p className="text-xs text-red-600">{postFormErrors.description}</p>}
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex justify-end gap-3">
                            <button type="button" onClick={() => { setPostJobModal(false); setPostFormErrors({}); }} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">Cancel</button>
                            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Post Job</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmModal && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900">Are you sure?</h3>
                            <p className="text-gray-500 font-medium mt-2">
                                You are about to delete <span className="font-bold text-gray-900">"{selectedJob.title}"</span>.
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <button onClick={() => setDeleteConfirmModal(false)} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Wait, Go Back</button>
                            <button onClick={handleDelete} className="px-6 py-3 bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all">Yes, Delete Job</button>
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
                                    <BriefcaseIcon className="w-6 h-6" />
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
