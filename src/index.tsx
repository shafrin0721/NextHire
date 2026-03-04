import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { About } from "./screens/About";
import { Jobs } from "./screens/Jobs";
import { JobDetails } from "./screens/JobDetails";
import { Assessment } from "./screens/Assessment";
import { HrDashboard } from "./screens/Hr";
import { Contact } from "./screens/Contact";
import { CreateAndAccount } from "./screens/CreateAndAccount";
import { Login } from "./screens/Login";
import { AdminDashboard, ReportsAnalytics, JobApplications, SkillTests, Candidates, Interviews, AdminJobs, AdminSettings } from "./screens/Admin";
import { Logout } from "./screens/Logout";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/senior-frontend-developer" element={<JobDetails />} />
        <Route
          path="/assessment/frontend-developer"
          element={<Assessment />}
        />
        <Route path="/hr/dashboard" element={<HrDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/applications" element={<JobApplications />} />
        <Route path="/admin/candidates" element={<Candidates />} />
        <Route path="/admin/skill-tests" element={<SkillTests />} />
        <Route path="/admin/interviews" element={<Interviews />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAndAccount />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
