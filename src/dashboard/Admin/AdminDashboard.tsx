import {
    LayoutDashboard,
    Briefcase,
    Users,
    FileCheck,
    Calendar,
    BarChart3,
    LogOut,
    CheckCircle,
    XCircle,
    FileText,
    Plus,
    Download,
    Edit,
    Trash2,
    ChevronDown,
    Eye,
    Settings,
    X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const summaryCards = [
    { label: "Total Jobs", value: "24", icon: Briefcase, bg: "bg-blue-600", path: "/admin/dashboard" },
    { label: "Applications", value: "1,247", icon: FileText, bg: "bg-blue-600", path: "/admin/applications" },
    { label: "Shortlisted", icon: CheckCircle, value: "89", bg: "bg-blue-600", path: "/admin/applications" },
    { label: "Rejected", icon: XCircle, value: "156", bg: "bg-blue-600", path: "/admin/applications" },
];

const initialJobs = [
    {
        id: "JB-001",
        title: "Frontend Developer",
        department: "Engineering",
        candidates: "45",
        status: "Open",
        deadline: "2024-03-25",
        description: "We are looking for a Senior Frontend Developer to lead our UI team. You will be responsible for building high-performance, responsive web applications using React and TypeScript.",
        requirements: "8+ years of experience with React, TypeScript, and modern CSS frameworks like Tailwind. Strong understanding of state management and performance optimization.",
        salary: "LKR 120,000 – LKR 140,000",
    },
    {
        id: "JB-002",
        title: "UX Designer",
        department: "Design",
        candidates: "32",
        status: "Open",
        deadline: "2024-03-22",
        description: "Join our creative team as a UX Designer to craft seamless and intuitive user experiences. You'll work closely with product managers and engineers to bring ideas to life.",
        requirements: "5+ years in UX/UI design. Proficiency in Figma, user research, and prototyping. Strong portfolio demonstrating user-centric design principles.",
        salary: "LKR 95,000 – LKR 115,000",
    },
    {
        id: "JB-003",
        title: "Marketing Manager",
        department: "Marketing",
        candidates: "18",
        status: "Closed",
        deadline: "2024-03-15",
        description: "Lead our marketing efforts and grow our brand presence globally. You'll be responsible for multi-channel campaigns and strategic partnerships.",
        requirements: "7+ years in marketing management. Experience with digital ads, content strategy, and team leadership. Data-driven approach to marketing.",
        salary: "LKR 80,000 – LKR 100,000",
    },
    {
        id: "JB-004",
        title: "Backend Engineer",
        department: "Engineering",
        candidates: "28",
        status: "Open",
        deadline: "2024-03-28",
        description: "Build robust and scalable microservices. You'll design APIs and manage data architecture for high-traffic systems.",
        requirements: "6+ years with Node.js, PostgreSQL, and AWS. Experience with Docker and CI/CD pipelines is a must.",
        salary: "LKR 130,000 – LKR 160,000",
    },
    {
        id: "JB-005",
        title: "Product Manager",
        department: "Product",
        candidates: "22",
        status: "Open",
        deadline: "2024-04-01",
        description: "Lead product strategy and drive innovation across our platform. You'll work with engineering, design, and marketing teams.",
        requirements: "5+ years in product management. Experience with SaaS products and agile methodologies. Strong analytical and communication skills.",
        salary: "LKR 110,000 – LKR 135,000",
    },
    {
        id: "JB-006",
        title: "DevOps Engineer",
        department: "Operations",
        candidates: "15",
        status: "Open",
        deadline: "2024-03-30",
        description: "Manage our cloud infrastructure and CI/CD pipelines. You'll optimize deployment processes and ensure system reliability.",
        requirements: "4+ years with AWS, Docker, Kubernetes. Strong scripting skills in Python or Bash.",
        salary: "LKR 125,000 – LKR 150,000",
    },
    {
        id: "JB-007",
        title: "Data Scientist",
        department: "Analytics",
        candidates: "19",
        status: "Open",
        deadline: "2024-04-05",
        description: "Analyze complex datasets and build predictive models. You'll drive insights that shape product decisions.",
        requirements: "4+ years in data science. Proficiency in Python, SQL, and machine learning frameworks. Experience with big data tools.",
        salary: "LKR 105,000 – LKR 130,000",
    },
    {
        id: "JB-008",
        title: "Quality Assurance Engineer",
        department: "QA",
        candidates: "12",
        status: "Open",
        deadline: "2024-03-27",
        description: "Ensure quality across our products through comprehensive testing strategies. You'll identify bugs and improve test coverage.",
        requirements: "3+ years in QA. Experience with automation testing, test frameworks, and bug tracking systems.",
        salary: "LKR 70,000 – LKR 90,000",
    },
    {
        id: "JB-009",
        title: "HR Specialist",
        department: "Human Resources",
        candidates: "8",
        status: "Closed",
        deadline: "2024-03-10",
        description: "Support our growing team with recruitment, onboarding, and employee development initiatives.",
        requirements: "2+ years in HR. Knowledge of recruitment processes and employee relations.",
        salary: "LKR 60,000 – LKR 75,000",
    },
    {
        id: "JB-010",
        title: "Sales Manager",
        department: "Sales",
        candidates: "14",
        status: "Open",
        deadline: "2024-04-08",
        description: "Lead our sales team and drive revenue growth through client acquisition and retention strategies.",
        requirements: "5+ years in sales management. Proven track record of exceeding targets and building strong teams.",
        salary: "LKR 95,000 – LKR 120,000",
    },
];

const initialJobs2 = [
    {
        id: "JB-001",
        title: "Frontend Developer",
        department: "Engineering",
        candidates: "45",
        status: "Open",
        deadline: "2024-03-25",
        description: "We are looking for a Senior Frontend Developer to lead our UI team. You will be responsible for building high-performance, responsive web applications using React and TypeScript.",
        requirements: "8+ years of experience with React, TypeScript, and modern CSS frameworks like Tailwind. Strong understanding of state management and performance optimization.",
        salary: "LKR 120,000 – LKR 140,000",
    },
    {
        id: "JB-002",
        title: "UX Designer",
        department: "Design",
        candidates: "32",
        status: "Open",
        deadline: "2024-03-22",
        description: "Join our creative team as a UX Designer to craft seamless and intuitive user experiences. You'll work closely with product managers and engineers to bring ideas to life.",
        requirements: "5+ years in UX/UI design. Proficiency in Figma, user research, and prototyping. Strong portfolio demonstrating user-centric design principles.",
        salary: "LKR 95,000 – LKR 115,000",
    },
    {
        id: "JB-003",
        title: "Marketing Manager",
        department: "Marketing",
        candidates: "18",
        status: "Closed",
        deadline: "2024-03-15",
        description: "Lead our marketing efforts and grow our brand presence globally. You'll be responsible for multi-channel campaigns and strategic partnerships.",
        requirements: "7+ years in marketing management. Experience with digital ads, content strategy, and team leadership. Data-driven approach to marketing.",
        salary: "LKR 80,000 – LKR 100,000",
    },
    {
        id: "JB-004",
        title: "Backend Engineer",
        department: "Engineering",
        candidates: "28",
        status: "Open",
        deadline: "2024-03-28",
        description: "Build robust and scalable microservices. You'll design APIs and manage data architecture for high-traffic systems.",
        requirements: "6+ years with Node.js, PostgreSQL, and AWS. Experience with Docker and CI/CD pipelines is a must.",
        salary: "LKR 130,000 – LKR 160,000",
    },
    {
        id: "JB-005",
        title: "Product Manager",
        department: "Product",
        candidates: "22",
        status: "Open",
        deadline: "2024-04-01",
        description: "Lead product strategy and drive innovation across our platform. You'll work with engineering, design, and marketing teams.",
        requirements: "5+ years in product management. Experience with SaaS products and agile methodologies. Strong analytical and communication skills.",
        salary: "LKR 110,000 – LKR 135,000",
    },
    {
        id: "JB-006",
        title: "DevOps Engineer",
        department: "Operations",
        candidates: "15",
        status: "Open",
        deadline: "2024-03-30",
        description: "Manage our cloud infrastructure and CI/CD pipelines. You'll optimize deployment processes and ensure system reliability.",
        requirements: "4+ years with AWS, Docker, Kubernetes. Strong scripting skills in Python or Bash.",
        salary: "LKR 125,000 – LKR 150,000",
    },
    {
        id: "JB-007",
        title: "Data Scientist",
        department: "Analytics",
        candidates: "19",
        status: "Open",
        deadline: "2024-04-05",
        description: "Analyze complex datasets and build predictive models. You'll drive insights that shape product decisions.",
        requirements: "4+ years in data science. Proficiency in Python, SQL, and machine learning frameworks. Experience with big data tools.",
        salary: "LKR 105,000 – LKR 130,000",
    },
    {
        id: "JB-008",
        title: "Quality Assurance Engineer",
        department: "QA",
        candidates: "12",
        status: "Open",
        deadline: "2024-03-27",
        description: "Ensure quality across our products through comprehensive testing strategies. You'll identify bugs and improve test coverage.",
        requirements: "3+ years in QA. Experience with automation testing, test frameworks, and bug tracking systems.",
        salary: "LKR 70,000 – LKR 90,000",
    },
    {
        id: "JB-009",
        title: "HR Specialist",
        department: "Human Resources",
        candidates: "8",
        status: "Closed",
        deadline: "2024-03-10",
        description: "Support our growing team with recruitment, onboarding, and employee development initiatives.",
        requirements: "2+ years in HR. Knowledge of recruitment processes and employee relations.",
        salary: "LKR 60,000 – LKR 75,000",
    },
    {
        id: "JB-010",
        title: "Sales Manager",
        department: "Sales",
        candidates: "14",
        status: "Open",
        deadline: "2024-04-08",
        description: "Lead our sales team and drive revenue growth through client acquisition and retention strategies.",
        requirements: "5+ years in sales management. Proven track record of exceeding targets and building strong teams.",
        salary: "LKR 95,000 – LKR 120,000",
    },
];

export const AdminDashboard = (): JSX.Element => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [jobList, setJobList] = useState(initialJobs);
    const [statusSort, setStatusSort] = useState<"All" | "Open" | "Closed" | "Draft">("All");

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4;
    const displayedJobs = statusSort === "All" ? jobList : jobList.filter((job) => job.status === statusSort);
    const totalJobs = displayedJobs.length;
    const totalPages = Math.max(1, Math.ceil(totalJobs / jobsPerPage));
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = displayedJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Modal States
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [viewJobModal, setViewJobModal] = useState(false);
    const [editJobModal, setEditJobModal] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [createJobModal, setCreateJobModal] = useState(false);

    const [newJobData, setNewJobData] = useState({
        title: "",
        department: "",
        type: "Full Time",
        experience: "",
        salary: "",
        description: "",
        skills: "",
        deadline: "",
        status: "Open",
    });

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
            // Reset to page 1 when deleting
            setCurrentPage(1);
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedJob) {
            setJobList(jobList.map(j => j.id === selectedJob.id ? selectedJob : j));
            setEditJobModal(false);
            setSelectedJob(null);
        }
    };

    const handleCreateJob = (e: React.FormEvent) => {
        e.preventDefault();
        const nextId = `JB-${String(jobList.length + 1).padStart(3, '0')}`;
        const jobToAdd = {
            ...newJobData,
            id: nextId,
            candidates: "0",
            requirements: newJobData.skills, // Map skills to requirements for consistency
        };
        setJobList([jobToAdd, ...jobList]);
        setCreateJobModal(false);
        setCurrentPage(1);
        setNewJobData({
            title: "",
            department: "",
            type: "Full Time",
            experience: "",
            salary: "",
            description: "",
            skills: "",
            deadline: "",
            status: "Open",
        });
    };

    const handleNavigation = (path: string, label: string) => {
        setActiveTab(label);
        navigate(path);
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleStatusSortChange = (value: "All" | "Open" | "Closed" | "Draft") => {
        setStatusSort(value);
        setCurrentPage(1);
    };

    const handleDownloadJobs = () => {
        const headers = ["Job ID", "Job Title", "Department", "Candidates", "Status", "Deadline"];
        const rows = displayedJobs.map((job) => [
            job.id,
            job.title,
            job.department,
            job.candidates,
            job.status,
            job.deadline,
        ]);
        const csv = [headers.join(","), ...rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "recent-job-postings.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-gray-900 font-bold text-lg leading-tight tracking-tight">Admin Portal</h1>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Recruitment</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path, item.label)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === item.label
                                ? "bg-blue-50 text-blue-600 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${activeTab === item.label ? "text-blue-600" : "text-gray-400"}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50/50">
                <header className="bg-white border-b border-gray-100 p-8 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Recruitment Dashboard</h2>
                            <p className="text-gray-500 text-sm font-medium mt-1">Welcome back, Admin! Here's what's happening today.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCreateJobModal(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                            >
                                <Plus className="w-4 h-4" />
                                Create New Job
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {summaryCards.map((card) => (
                            <button
                                key={card.label}
                                onClick={() => navigate(card.path)}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group text-left w-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${card.bg} p-3 rounded-xl text-white shadow-lg`}>
                                        <card.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
                                </div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{card.label}</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{card.value}</h3>
                            </button>
                        ))}
                    </div>

                    {/* Job Listings Table */}
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky left-0">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Recent Job Postings</h3>
                                <p className="text-sm text-gray-500">Manage your active and closed job listings.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleDownloadJobs}
                                    className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all border border-gray-100"
                                    title="Download job postings"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <div className="relative">
                                    <select
                                        value={statusSort}
                                        onChange={(e) => handleStatusSortChange(e.target.value as "All" | "Open" | "Closed" | "Draft")}
                                        className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                    >
                                        <option value="All">Sort by Status (All)</option>
                                        <option value="Open">Open jobs</option>
                                        <option value="Closed">Closed jobs</option>
                                        <option value="Draft">Draft jobs</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <th className="px-8 py-4">Job Info</th>
                                        <th className="px-8 py-4">Department</th>
                                        <th className="px-8 py-4">Candidates</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4">Deadline</th>
                                        <th className="px-8 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {currentJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-blue-50/5 transition-colors group">
                                            <td className="px-8 py-4">
                                                <p className="font-bold text-gray-900">{job.title}</p>
                                                <p className="text-xs text-gray-400">{job.id}</p>
                                            </td>
                                            <td className="px-8 py-4 font-semibold text-gray-700">{job.department}</td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                        {job.candidates}
                                                    </div>
                                                    <span className="text-gray-400 text-xs">Applicants</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    job.status === "Open"
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : job.status === "Closed"
                                                            ? "bg-rose-50 text-rose-600"
                                                            : "bg-amber-50 text-amber-600"
                                                }`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 font-semibold text-gray-600">{job.deadline}</td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAction('view', job)}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('edit', job)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Edit Job"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('delete', job)}
                                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentJobs.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-10 text-center text-sm font-semibold text-gray-400">
                                                No job postings found for the selected status.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Showing {totalJobs === 0 ? 0 : indexOfFirstJob + 1}–{Math.min(indexOfLastJob, totalJobs)} of {totalJobs} jobs
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-lg ${
                                        currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {/* Generate page numbers dynamically */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                                currentPage === pageNumber
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                    : "text-gray-500 hover:bg-white border border-gray-100"
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-lg ${
                                        currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
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
                        <div className="p-8 space-y-6">
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
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.type || "Full Time"}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Experience</label>
                                    <p className="text-lg font-bold text-gray-900">{selectedJob.experience || "Not Specified"}</p>
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
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Update Job Details</h3>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">Editing Mode • {selectedJob.id}</p>
                            </div>
                            <button type="button" onClick={() => setEditJobModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label>
                                <input
                                    type="text"
                                    value={selectedJob.title}
                                    onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Salary Range</label>
                                    <input
                                        type="text"
                                        value={selectedJob.salary}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, salary: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                                    <select
                                        value={selectedJob.status}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Open</option>
                                        <option>Closed</option>
                                        <option>Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={selectedJob.description}
                                    onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Requirements</label>
                                <textarea
                                    rows={3}
                                    value={selectedJob.requirements}
                                    onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex justify-end gap-3">
                            <button type="button" onClick={() => setEditJobModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">Discard Changes</button>
                            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Save Updates</button>
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
                                This action cannot be undone and will remove all associated applications.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <button onClick={() => setDeleteConfirmModal(false)} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">Wait, Go Back</button>
                            <button onClick={handleDelete} className="px-6 py-3 bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all">Yes, Delete Job</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Job Modal */}
            {createJobModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <form onSubmit={handleCreateJob} className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Create New Job</h3>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">Post a new recruitment opportunity</p>
                            </div>
                            <button type="button" onClick={() => setCreateJobModal(false)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Senior Frontend Developer"
                                        value={newJobData.title}
                                        onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Department</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Engineering"
                                        value={newJobData.department}
                                        onChange={(e) => setNewJobData({ ...newJobData, department: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Type</label>
                                    <select
                                        value={newJobData.type}
                                        onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                    >
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Experience Required</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. 5+ Years"
                                        value={newJobData.experience}
                                        onChange={(e) => setNewJobData({ ...newJobData, experience: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Salary Range</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. LKR 100,000 – LKR 120,000"
                                        value={newJobData.salary}
                                        onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Deadline</label>
                                    <input
                                        required
                                        type="date"
                                        value={newJobData.deadline}
                                        onChange={(e) => setNewJobData({ ...newJobData, deadline: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Required Skills</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. React, Node.js, AWS"
                                        value={newJobData.skills}
                                        onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Status</label>
                                    <select
                                        value={newJobData.status}
                                        onChange={(e) => setNewJobData({ ...newJobData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                                    >
                                        <option>Open</option>
                                        <option>Closed</option>
                                        <option>Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Describe the role and responsibilities..."
                                    value={newJobData.description}
                                    onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex justify-end gap-3">
                            <button type="button" onClick={() => setCreateJobModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">Cancel</button>
                            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Create Job</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
