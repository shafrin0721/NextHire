import {
    LayoutDashboard,
    Calendar,
    Briefcase,
    FileCheck,
    FileText,
    Download,
    Users,
    ArrowUpRight,
    TrendingUp,
    PieChart,
    Settings,
    Bell,
    LogOut,
    Search,
    ChevronDown,
    BarChart3,
    Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const baseRecentApps = [
    {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        position: "Senior Developer",
        date: "Dec 18, 2024",
        match: 92,
        status: "Shortlisted",
        color: "bg-emerald-500",
        avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
        name: "Michael Chen",
        email: "m.chen@email.com",
        position: "Product Manager",
        date: "Dec 17, 2024",
        match: 85,
        status: "Interview",
        color: "bg-blue-500",
        avatar: "https://i.pravatar.cc/150?u=michael",
    },
    {
        name: "Emma Wilson",
        email: "emma.w@email.com",
        position: "UX Designer",
        date: "Dec 16, 2024",
        match: 78,
        status: "Under Review",
        color: "bg-purple-500",
        avatar: "https://i.pravatar.cc/150?u=emma",
    },
    {
        name: "James Rodriguez",
        email: "j.rodriguez@email.com",
        position: "Data Analyst",
        date: "Dec 15, 2024",
        match: 88,
        status: "Shortlisted",
        color: "bg-orange-500",
        avatar: "https://i.pravatar.cc/150?u=james",
    },
];

const recentApps = Array.from({ length: 30 }, (_, i) => ({
    ...baseRecentApps[i % baseRecentApps.length]
}));

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

const getDynamicMetrics = (job: string, range: string) => {
    // Simulated dynamic metrics based on job position and date range
    let base = job === 'All Positions' ? 1 : 0.2;

    // Date range impact
    if (range.includes("7 Days")) base *= 0.25;
    else if (range.includes("30 Days")) base *= 1;
    else if (range.includes("3 Months")) base *= 3;
    else if (range.includes("6 Months")) base *= 6;

    return [
        { label: "Total Applications", value: Math.floor(2847 * base).toLocaleString(), trend: "+12%", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Shortlisted", value: Math.floor(486 * base).toLocaleString(), trend: "+8%", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Interviews", value: Math.floor(152 * base).toLocaleString(), trend: "+15%", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Hired", value: Math.floor(89 * base).toLocaleString(), trend: "+5%", icon: Target, color: "text-orange-600", bg: "bg-orange-50" },
    ];
};



export const ReportsAnalytics = (): JSX.Element => {
    const navigate = useNavigate();
    // State for filters and search
    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [jobPosition, setJobPosition] = useState('All Positions');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [searchTerm, setSearchTerm] = useState('');
    // Pagination state for recent applications
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Export functions
    const getExportData = () => {
        let content = "RECRUITMENT ANALYTICS REPORT\n";
        content += `Filter Settings: Date Range: ${dateRange}, Job: ${jobPosition}, Status: ${statusFilter}\n\n`;

        content += "CORE METRICS\n";
        content += "Metric,Value,Trend\n";
        dynamicMetrics.forEach(m => {
            content += `${m.label},${m.value},${m.trend}\n`;
        });

        content += "\nTOP APPLIED JOBS\n";
        content += "Job Position,Applications,Match Rate\n";
        jobStats.forEach(j => {
            content += `${j.label},${j.count},${Math.round(j.value)}%\n`;
        });

        content += "\nSKILL MATCH DISTRIBUTION\n";
        content += "Category,Percentage\n";
        skillMatchData.forEach(s => {
            content += `${s.label},${s.value}%\n`;
        });

        content += "\nAPPLICATION TRENDS (SIMULATED)\n";
        content += "Day,Count\n";
        trendData.forEach((t, i) => {
            content += `Day ${i * 2 + 1},${Math.round(t)}\n`;
        });

        return content;
    };

    const exportCSV = () => {
        const content = getExportData();
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `analytics_${dateRange.replace(/\s/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportExcel = () => {
        const content = getExportData();
        const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `analytics_${dateRange.replace(/\s/g, '_')}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reportRef = useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        if (!reportRef.current) return;

        try {
            const canvas = await html2canvas(reportRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pdfWidth = pdf.internal.pageSize.getWidth();

            // Include a title and metadata
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text("Recruitment Analytics Report", 14, 20);

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Date Range: ${dateRange} | Job Position: ${jobPosition} | Status: ${statusFilter}`, 14, 28);

            const margin = 14;
            const topOffset = 35;
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth - (margin * 2);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', margin, topOffset, imgWidth, imgHeight);
            pdf.save("Recruitment_Analytics_Report.pdf");
        } catch (error) {
            console.error("PDF generation failed", error);
        }
    };


    // Filter recent applications based on search, job position, and status
    const filteredApps = useMemo(() => {
        let res = recentApps;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            res = res.filter(app => app.name.toLowerCase().includes(term) || app.email.toLowerCase().includes(term));
        }
        if (jobPosition !== 'All Positions') {
            res = res.filter(app => app.position === jobPosition);
        }
        if (statusFilter !== 'All Status') {
            res = res.filter(app => app.status === statusFilter);
        }
        // Date range filter placeholder – could be expanded later
        return res;
    }, [searchTerm, jobPosition, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredApps.length / ITEMS_PER_PAGE));
    const paginatedApps = filteredApps.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Dynamic Data calculations
    const dynamicMetrics = useMemo(() => getDynamicMetrics(jobPosition, dateRange), [jobPosition, dateRange]);

    const jobStats = useMemo(() => {
        let factor = jobPosition === 'All Positions' ? 1 : 0.3;
        if (dateRange.includes("7 Days")) factor *= 0.5;
        if (dateRange.includes("Months")) factor *= 2.5;

        return [
            { label: "Senior Frontend Developer", value: 85 * factor, count: Math.floor(247 * factor) },
            { label: "UI/UX Designer", value: 72 * factor, count: Math.floor(184 * factor) },
            { label: "Product Manager", value: 65 * factor, count: Math.floor(156 * factor) },
            { label: "Data Scientist", value: 58 * factor, count: Math.floor(132 * factor) },
            { label: "QA Engineer", value: 45 * factor, count: Math.floor(98 * factor) },
        ];
    }, [jobPosition, dateRange]);

    const trendData = useMemo(() => {
        let factor = jobPosition === 'All Positions' ? 1 : 0.4;
        if (dateRange.includes("7 Days")) factor *= 0.4;
        return [40, 65, 35, 80, 55, 90, 45, 70, 50, 85, 60, 75].map(v => v * factor);
    }, [jobPosition, dateRange]);


    const skillMatchData = useMemo(() => {
        return [
            { label: "Excellent Match (90%+)", value: 42, color: "bg-emerald-500" },
            { label: "Good Match (75%-90%)", value: 85, color: "bg-blue-500" },
            { label: "Average Match (50%-75%)", value: 64, color: "bg-orange-500" },
            { label: "Below Average (<50%)", value: 28, color: "bg-rose-500" },
        ];
    }, []);

    const shortlistRatio = useMemo(() => {
        const base = jobPosition === 'All Positions' ? 75 : 45;
        const offset = 502 - (502 * base) / 100;
        return { value: base, offset };
    }, [jobPosition]);

    // Reset page when filters change

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, jobPosition, statusFilter, dateRange]);



    return (
        <div className="flex min-h-screen bg-[#FDFDFF]">
            {/* Recycled Sidebar from AdminDashboard for consistency */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
                <div
                    className="p-6 flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-gray-900 font-bold text-lg leading-tight tracking-tight">Admin Portal</h1>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Analytics Mode</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${item.label === "Analytics"
                                ? "bg-blue-50 text-blue-600 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.label === "Analytics" ? "text-blue-600" : "text-gray-400"}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div ref={reportRef} className="w-full">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reports & Analytics</h2>
                            <p className="text-gray-500 text-sm font-medium mt-1">Track and analyze recruitment metrics across your organization.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => alert("No new notifications")}
                                className="p-2.5 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                            >
                                <Bell className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full border border-gray-100 shadow-sm">
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-inner">
                                    <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Admin Panel</span>
                            </div>
                        </div>
                    </header>

                    {/* Filters & Export */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="flex-1 max-w-[240px]">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Date Range</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        value={dateRange}
                                        onChange={e => setDateRange(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                        <option>Last 3 Months</option>
                                        <option>Last 6 Months</option>
                                        <option>Custom Range</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex-1 max-w-[240px]">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Job Position</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        value={jobPosition}
                                        onChange={e => setJobPosition(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>All Positions</option>
                                        <option>Frontend Developer</option>
                                        <option>Backend Developer</option>
                                        <option>UI/UX Designer</option>
                                        <option>Product Manager</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex-1 max-w-[240px]">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Status</label>
                                <div className="relative">
                                    <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={e => setStatusFilter(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>All Status</option>
                                        <option>Shortlisted</option>
                                        <option>Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={exportCSV}
                                className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 uppercase tracking-wider"
                            >
                                <Download className="w-4 h-4" /> CSV
                            </button>
                            <button
                                onClick={exportExcel}
                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-wider"
                            >
                                <Download className="w-4 h-4" /> Excel
                            </button>
                            <button
                                onClick={exportPDF}
                                className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 uppercase tracking-wider"
                            >
                                <Download className="w-4 h-4" /> PDF
                            </button>
                        </div>
                    </div>

                    {/* Metric Grid */}
                    <div ref={reportRef} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {dynamicMetrics.map((m) => (
                                <div key={m.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                                    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500 bg-current pointer-events-none" />
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`${m.bg} ${m.color} p-3 rounded-xl`}>
                                            <m.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-full">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                            {m.trend}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-semibold">{m.label}</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{m.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Top 5 Applied Jobs */}
                            <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Top 5 Applied Jobs</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Most popular positions</p>
                                    </div>
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                        <BarChart3 className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {jobStats.map((job) => (
                                        <div key={job.label} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-gray-700">{job.label}</span>
                                                <span className="text-xs font-bold text-gray-400">{job.count} Applications</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${job.value}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Application Trends */}
                            <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Application Trends</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Last 30 days overview</p>
                                    </div>
                                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="h-[280px] flex items-end justify-between gap-1 px-2">
                                    {trendData.map((h, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                            <div className="w-full relative">
                                                <div
                                                    className="w-full bg-emerald-500 rounded-t-lg transition-all duration-500 hover:bg-emerald-400 cursor-pointer relative"
                                                    style={{ height: `${h * 2}px` }}
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                                                        {Math.round(h)}+
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Day {i * 2 + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shortlist Ratio */}
                            <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Shortlist Ratio</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Application to shortlist conversion</p>
                                    </div>
                                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                        <PieChart className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-around">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="#F1F5F9" strokeWidth="24" />
                                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="#9333EA" strokeWidth="24" strokeDasharray="502" strokeDashoffset={shortlistRatio.offset} className="transition-all duration-1000" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-extrabold text-purple-600">{shortlistRatio.value}%</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ratio</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Shortlisted</p>
                                                <p className="text-sm font-extrabold text-gray-700">2,135 Candidates</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-gray-100" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Queue</p>
                                                <p className="text-sm font-extrabold text-gray-700">712 Candidates</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skill Match Rate */}
                            <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Skill Match Rate</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Candidate qualification levels</p>
                                    </div>
                                    <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                                        <Target className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-6 pt-4">
                                    {skillMatchData.map((skill) => (
                                        <div key={skill.label} className="flex items-center gap-6">
                                            <span className="text-sm font-bold text-gray-600 w-44">{skill.label}</span>
                                            <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                                                <div className={`h-full ${skill.color} rounded-full transition-all duration-1000`} style={{ width: `${(skill.value / 100) * 100}%` }} />
                                            </div>
                                            <span className="text-sm font-extrabold text-gray-900 w-8">{skill.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Applications Table */}
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
                    <div className="p-7 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Recent Applications</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Latest candidate submissions</p>
                        </div>
                        <div className="flex items-center gap-3 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <button
                                onClick={() => alert("Searching...")}
                                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-5">Candidate</th>
                                    <th className="px-8 py-5">Position</th>
                                    <th className="px-8 py-5">Applied Date</th>
                                    <th className="px-8 py-5">Match Score</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedApps.map((app) => (
                                    <tr key={app.name} className="hover:bg-blue-50/10 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img src={app.avatar} alt={app.name} className="w-11 h-11 rounded-full border-2 border-white shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-[15px]">{app.name}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{app.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-bold text-gray-700">{app.position}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-semibold text-gray-400">{app.date}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden max-w-[100px]">
                                                    <div className={`h-full ${app.color} rounded-full transition-all duration-1000`} style={{ width: `${app.match}%` }} />
                                                </div>
                                                <span className="text-sm font-extrabold text-gray-800">{app.match}%</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-600' :
                                                app.status === 'Interview' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-purple-50 text-purple-600'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => alert(`Viewing details for ${app.name}...`)}
                                                    className="text-[13px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-7 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredApps.length)} of {filteredApps.length} applications</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'} transition-all`}
                            >Previous</button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-100 ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-700'} transition-all`}
                            >Next</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
