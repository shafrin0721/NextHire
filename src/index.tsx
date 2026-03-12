import "./styles/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import pages - testing imports one by one
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

// Import components
import { ProtectedRoute } from "./components/ProtectedRoute";

// Import dashboards
import { Assessment } from "./dashboard/Assessment";
import { HrDashboard, HrJobs, HrCandidates, HrInterviews, HrReportsAnalytics, HrSettings } from "./dashboard/Hr";
import { AdminDashboard, ReportsAnalytics, JobApplications, SkillTests, Candidates, Interviews, AdminJobs, AdminSettings } from "./dashboard/Admin";

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/assessment/frontend-developer" element={<Assessment />} />
        <Route path="/hr/dashboard" element={<ProtectedRoute><HrDashboard /></ProtectedRoute>} />
        <Route path="/hr/jobs" element={<ProtectedRoute><HrJobs /></ProtectedRoute>} />
        <Route path="/hr/candidates" element={<ProtectedRoute><HrCandidates /></ProtectedRoute>} />
        <Route path="/hr/interviews" element={<ProtectedRoute><HrInterviews /></ProtectedRoute>} />
        <Route path="/hr/reports" element={<ProtectedRoute><HrReportsAnalytics /></ProtectedRoute>} />
        <Route path="/hr/settings" element={<ProtectedRoute><HrSettings /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute><JobApplications /></ProtectedRoute>} />
        <Route path="/admin/candidates" element={<ProtectedRoute><Candidates /></ProtectedRoute>} />
        <Route path="/admin/skill-tests" element={<ProtectedRoute><SkillTests /></ProtectedRoute>} />
        <Route path="/admin/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAndAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
