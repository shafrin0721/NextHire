import {
  BarChart3Icon,
  BriefcaseIcon,
  LineChartIcon,
  SettingsIcon,
  UsersIcon,
  CalendarIcon,
  LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";


const sidebarItems = [
  { label: "Dashboard", Icon: BarChart3Icon, path: "/hr/dashboard" },
  { label: "Jobs", Icon: BriefcaseIcon, path: "/hr/jobs" },
  { label: "Candidates", Icon: UsersIcon, path: "/hr/candidates" },
  { label: "Interviews", Icon: CalendarIcon, path: "/hr/interviews" },
  { label: "Reports", Icon: LineChartIcon, path: "/hr/reports" },
  { label: "Settings", Icon: SettingsIcon, path: "/hr/settings" },
  { label: "Logout", Icon: LogOutIcon, path: "/logout" },
];

export const HrDashboard = (): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              N
            </div>
            <span className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-lg tracking-[-0.5px]">
              NextHire
            </span>
          </div>

          <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  navigate("/hr/jobs")
                }
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm [font-family:'Inter',Helvetica] font-medium px-4 py-2"
              >
                + Add Job
              </Button>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-6 flex gap-6">
        <aside className="hidden md:flex flex-col w-56 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-gray-100 py-4">
          <nav className="flex flex-col gap-1">
            {sidebarItems.map(({ label, Icon, path }) => {
              const isActive = path === "/hr/dashboard";
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleNavigation(path)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm [font-family:'Inter',Helvetica] text-left ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-xl md:text-2xl">
                Dashboard
              </h1>
              <p className="[font-family:'Inter',Helvetica] text-sm text-gray-500">
                Welcome back, Sarah! Here&apos;s what&apos;s happening with your
                hiring.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs md:text-sm [font-family:'Inter',Helvetica] text-gray-700 hover:bg-gray-50">
              View Applications
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              label="Total Jobs"
              value="24"
              change="+12% vs last month"
              changeType="positive"
              iconColor="bg-blue-50 text-blue-600"
            />
            <SummaryCard
              label="Applications"
              value="1,247"
              change="+8% vs last month"
              changeType="positive"
              iconColor="bg-emerald-50 text-emerald-600"
            />
            <SummaryCard
              label="Shortlisted"
              value="89"
              change="+15% vs last month"
              changeType="positive"
              iconColor="bg-amber-50 text-amber-600"
            />
            <SummaryCard
              label="Rejected"
              value="342"
              change="-5% vs last month"
              changeType="negative"
              iconColor="bg-rose-50 text-rose-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base">
                  Application Trends
                </h2>
                <span className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                  Last 6 months
                </span>
              </div>

              <svg viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="400" height="200" fill="#F8FAFC" rx="12" />
                <path d="M 20 180 Q 80 140 140 110 Q 200 80 260 90 Q 320 85 360 110 L 380 190 L 20 190 Z" fill="url(#trendGradient)" opacity="0.8" />
                <circle cx="80" cy="140" r="4" fill="#3B82F6" />
                <circle cx="140" cy="110" r="4" fill="#3B82F6" />
                <circle cx="200" cy="80" r="4" fill="#3B82F6" />
                <circle cx="260" cy="90" r="4" fill="#3B82F6" />
                <circle cx="320" cy="85" r="4" fill="#3B82F6" />
                <circle cx="360" cy="110" r="4" fill="#3B82F6" />
                <text x="20" y="30" fontFamily="'Inter', sans-serif" fontSize="14" fontWeight="bold" fill="#1E293B">Applications</text>
                <text x="20" y="50" fontFamily="'Inter', sans-serif" fontSize="12" fill="#64748B">Last 6 months</text>
                <line x1="20" y1="70" x2="380" y2="70" stroke="#E2E8F0" strokeWidth="1" />
                <text x="300" y="65" fontFamily="'Inter', sans-serif" fontSize="11" fill="#64748B">↑ 28% growth</text>
              </svg>

            </div>

            <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 flex flex-col gap-4">
              <h2 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base">
                Skill Match %
              </h2>
              <div className="flex items-center justify-center">
                <div className="h-40 w-40 rounded-full bg-[conic-gradient(#22c55e_0_36deg,#0ea5e9_36deg_144deg,#eab308_144deg_252deg,#ef4444_252deg_360deg)] flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                    <span className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-900">
                      75% Match
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 [font-family:'Inter',Helvetica]">
                <LegendDot label="Excellent Match" color="bg-emerald-500" />
                <LegendDot label="Good Match" color="bg-sky-500" />
                <LegendDot label="Fair Match" color="bg-amber-400" />
                <LegendDot label="Poor Match" color="bg-rose-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-6">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base">
                  Top Performing Jobs
                </h2>
            <Button variant="link" className="p-0 h-auto [font-family:'Inter',Helvetica] text-xs text-blue-600 hover:underline" asChild>
                  <span>View All</span>
                </Button>
              </div>

              <svg viewBox="0 0 400 160" className="w-full h-full">
                <rect x="0" y="0" width="400" height="160" fill="#F8FAFC" rx="8" />
                <g fill="none">
                  <rect x="20" y="100" width="36" height="60" rx="4" fill="#3B82F6" />
                  <rect x="80" y="84" width="36" height="76" rx="4" fill="#10B981" />
                  <rect x="140" y="88" width="36" height="72" rx="4" fill="#F59E0B" />
                  <rect x="200" y="92" width="36" height="68" rx="4" fill="#0EA5E9" />
                  <rect x="260" y="96" width="36" height="64" rx="4" fill="#8B5CF6" />
                </g>
                <g fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="600" fill="#475569">
                  <text x="34" y="135">124</text>
                  <text x="94" y="135">89</text>
                  <text x="154" y="135">67</text>
                  <text x="214" y="135">52</text>
                  <text x="274" y="135">38</text>
                </g>
                <g fontFamily="'Inter', sans-serif" fontSize="10" fill="#94A3B8">
                  <text x="38" y="155" textAnchor="middle">Senior Dev</text>
                  <text x="98" y="155" textAnchor="middle">UX/UI</text>
                  <text x="158" y="155" textAnchor="middle">Data</text>
                  <text x="218" y="155" textAnchor="middle">PM</text>
                  <text x="278" y="155" textAnchor="middle">Design</text>
                </g>
              </svg>

            </div>

            <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base">
                  Recent Activity
                </h2>
                <button className="[font-family:'Inter',Helvetica] text-xs text-blue-600 hover:underline">
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-3 text-xs md:text-sm [font-family:'Inter',Helvetica]">
                <ActivityItem
                  color="bg-emerald-500"
                  title="New application for Senior Developer"
                  meta="John Smith · 2 minutes ago"
                />
                <ActivityItem
                  color="bg-sky-500"
                  title="Job posted: UI/UX Designer"
                  meta="Sarah Johnson · 1 hour ago"
                />
                <ActivityItem
                  color="bg-amber-500"
                  title="Candidate shortlisted for Data Analyst"
                  meta="Mike Chen · 3 hours ago"
                />
                <ActivityItem
                  color="bg-rose-500"
                  title="Application rejected for Project Manager"
                  meta="Emily Davis · 5 hours ago"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <HrFooter />
    </div>
  );
};

import { HrFooter } from "../../components/HrFooter";

type SummaryCardProps = {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  iconColor: string;
};

const SummaryCard = ({
  label,
  value,
  change,
  changeType,
  iconColor,
}: SummaryCardProps): JSX.Element => {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 flex items-center gap-3">
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center ${iconColor}`}
      >
        <BriefcaseIcon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
          {label}
        </span>
        <span className="[font-family:'Inter',Helvetica] font-semibold text-gray-900 text-lg">
          {value}
        </span>
        <span
          className={`[font-family:'Inter',Helvetica] text-[11px] ${
            changeType === "positive" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

type LegendDotProps = {
  label: string;
  color: string;
};

const LegendDot = ({ label, color }: LegendDotProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="[font-family:'Inter',Helvetica] text-[11px] text-gray-600">
        {label}
      </span>
    </div>
  );
};

type ActivityItemProps = {
  color: string;
  title: string;
  meta: string;
};

const ActivityItem = ({
  color,
  title,
  meta,
}: ActivityItemProps): JSX.Element => {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-1 h-2 w-2 rounded-full ${color}`} />
      <div className="flex flex-col">
        <span className="text-gray-900">{title}</span>
        <span className="text-gray-500 text-[11px]">{meta}</span>
      </div>
    </div>
  );
};

