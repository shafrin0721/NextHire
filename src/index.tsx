import "./styles/tailwind.css";
import { Layout } from "./components/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Import all pages and components
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Jobs } from "./pages/Jobs";
import { JobDetails } from "./pages/JobDetails";
import { Apply } from "./pages/Apply";
import { Contact } from "./pages/Contact";
import { CreateAndAccount } from "./pages/CreateAndAccount";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { NotFound } from "./pages/NotFound";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { CandidateApplications } from "./pages/CandidateApplications";
import { CandidateProfile } from "./pages/CandidateProfile";
import { Assessment } from "./dashboard/Assessment";
import { HrDashboard, HrJobs, HrCandidates, HrInterviews, HrReportsAnalytics, HrSettings } from "./dashboard/Hr";
import { AdminDashboard, ReportsAnalytics, JobApplications, SkillTests, Candidates, Interviews, AdminJobs, AdminSettings } from "./dashboard/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";

const root = document.getElementById("app")!;
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/assessment/frontend-developer" element={<Assessment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAndAccount />} />
        
        {/* HR Routes */}
        <Route path="/hr/dashboard" element={<ProtectedRoute roles={['hr']}><HrDashboard /></ProtectedRoute>} />
        <Route path="/hr/jobs" element={<ProtectedRoute roles={['hr']}><HrJobs /></ProtectedRoute>} />
        <Route path="/hr/candidates" element={<ProtectedRoute roles={['hr']}><HrCandidates /></ProtectedRoute>} />
        <Route path="/hr/interviews" element={<ProtectedRoute roles={['hr']}><HrInterviews /></ProtectedRoute>} />
        <Route path="/hr/reports" element={<ProtectedRoute roles={['hr']}><HrReportsAnalytics /></ProtectedRoute>} />
        <Route path="/hr/settings" element={<ProtectedRoute roles={['hr']}><HrSettings /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute roles={['admin']}><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute roles={['admin']}><JobApplications /></ProtectedRoute>} />
        <Route path="/admin/candidates" element={<ProtectedRoute roles={['admin']}><Candidates /></ProtectedRoute>} />
        <Route path="/admin/interviews" element={<ProtectedRoute roles={['admin']}><Interviews /></ProtectedRoute>} />
        <Route path="/admin/skill-tests" element={<ProtectedRoute roles={['admin']}><SkillTests /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><ReportsAnalytics /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute roles={['admin']}><AdminSettings /></ProtectedRoute>} />
        
        {/* Candidate Routes */}
        <Route path="/candidate/dashboard" element={<ProtectedRoute roles={['candidate']}><CandidateDashboard /></ProtectedRoute>} />
        <Route path="/candidate/applications" element={<ProtectedRoute roles={['candidate']}><CandidateApplications /></ProtectedRoute>} />
        <Route path="/candidate/profile" element={<ProtectedRoute roles={['candidate']}><CandidateProfile /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      </BrowserRouter>
  </StrictMode>
);

