import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LayoutDashboard, FileText, User, Briefcase, Calendar, CheckCircle, AlertCircle, ArrowRight, User as UserIcon, Clock, CheckCheck } from "lucide-react";
import { getCurrentUser } from "../utils/auth";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  statusColor: string;
}

const mockApplications: Application[] = [
  { 
    id: "APP-001", 
    jobTitle: "Senior Frontend Developer", 
    company: "TechCorp", 
    status: "Interview Scheduled", 
    appliedDate: "2024-04-15", 
    statusColor: "bg-emerald-100 text-emerald-800"
  },
  { 
    id: "APP-002", 
    jobTitle: "Full Stack Developer", 
    company: "Innovate Ltd", 
    status: "Shortlisted", 
    appliedDate: "2024-04-12", 
    statusColor: "bg-blue-100 text-blue-800"
  },
  { 
    id: "APP-003", 
    jobTitle: "React Developer", 
    company: "NextHire", 
    status: "Pending", 
    appliedDate: "2024-04-10", 
    statusColor: "bg-gray-100 text-gray-800"
  },
];

const mockStats = {
  totalApplications: 4,
  interviews: 1,
  profileComplete: 85,
  activeOpportunities: 2,
};

export const CandidateDashboard = () => {
  const user = getCurrentUser();
  const [recentApps, setRecentApps] = useState<Application[]>([]);

  useEffect(() => {
    // Mock recent apps
    setRecentApps(mockApplications.slice(0, 3));
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl items-center justify-center mb-6 shadow-2xl">
            <LayoutDashboard className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Candidate'}!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here's what's happening with your job search. Stay on top of applications, interviews, and your profile.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">{mockStats.totalApplications}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-medium">Total Applications</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">{mockStats.interviews}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-medium">Scheduled Interviews</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">{mockStats.profileComplete}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-medium">Profile Complete</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">{mockStats.activeOpportunities}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-medium">Active Opportunities</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white hover:shadow-2xl transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">View Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-100 mb-6">Track your application status and next steps</p>
              <Button asChild size="lg" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-lg">
                <Link to="/candidate/applications">Go to Applications <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-2xl transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-100 mb-6">Complete your profile to get 25% more interview calls</p>
              <Button asChild size="lg" className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-semibold shadow-lg">
                <Link to="/candidate/profile">Update Profile <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:shadow-2xl transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Find New Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 mb-6">Discover matching opportunities from top companies</p>
              <Button asChild size="lg" className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-lg">
                <Link to="/jobs">Browse Jobs <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Clock className="w-8 h-8" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Applied</th>
                    <th className="w-32 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentApps.map((app, index) => (
                    <tr key={app.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-5">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{app.jobTitle}</div>
                          <div className="text-xs text-gray-500">{app.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500">{app.appliedDate}</td>
                      <td className="px-6 py-5 text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/candidate/applications">View All</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <div className="text-center mt-20 p-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl text-white">
          <CheckCheck className="w-20 h-20 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for your next opportunity?</h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Update your profile and start applying. Top companies are hiring now.
          </p>
          <Button asChild size="lg" className="text-xl px-12 py-8 bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-2xl">
            <Link to="/jobs">Find Your Dream Job <ArrowRight className="ml-3 h-6 w-6 inline" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

