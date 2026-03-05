import {
  BarChart3Icon,
  BriefcaseIcon,
  FileTextIcon,
  LineChartIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Footer } from "../../components/Footer";

const sidebarItems = [
  { label: "Dashboard", Icon: BarChart3Icon, active: true },
  { label: "Jobs", Icon: BriefcaseIcon, active: false },
  { label: "Candidates", Icon: UsersIcon, active: false },
  { label: "Interviews", Icon: FileTextIcon, active: false },
  { label: "Reports", Icon: LineChartIcon, active: false },
  { label: "Settings", Icon: SettingsIcon, active: false },
];

export const HrDashboard = (): JSX.Element => {
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
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm [font-family:'Inter',Helvetica] font-medium px-4 py-2">
              + Add Job
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-6 flex gap-6">
        <aside className="hidden md:flex flex-col w-56 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-gray-100 py-4">
          <nav className="flex flex-col gap-1">
            {sidebarItems.map(({ label, Icon, active }) => (
              <button
                key={label}
                type="button"
                className={`flex items-center gap-3 px-4 py-2.5 text-sm [font-family:'Inter',Helvetica] text-left ${
                  active
                    ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    active ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span>{label}</span>
              </button>
            ))}
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
              <div className="h-52 rounded-xl bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-50 border border-dashed border-blue-200 flex items-center justify-center text-xs text-blue-400 [font-family:'Inter',Helvetica]">
                Chart placeholder
              </div>
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
                <button className="[font-family:'Inter',Helvetica] text-xs text-blue-600 hover:underline">
                  View All
                </button>
              </div>
              <div className="h-40 flex items-end gap-3">
                {["Senior Developer", "UX/UI Designer", "Data Analyst", "Project Manager", "Design Engr."].map(
                  (label, index) => {
                    const heights = [90, 75, 70, 65, 55];
                    const colors = [
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-amber-500",
                      "bg-sky-500",
                      "bg-violet-500",
                    ];
                    return (
                      <div
                        key={label}
                        className="flex flex-col items-center justify-end flex-1"
                      >
                        <div
                          className={`${colors[index]} w-7 rounded-t-md`}
                          style={{ height: `${heights[index]}%` }}
                        />
                        <span className="mt-2 text-[10px] text-gray-500 text-center [font-family:'Inter',Helvetica]">
                          {label}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
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

      <Footer />
    </div>
  );
};

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

