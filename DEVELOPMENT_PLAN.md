# NextHire HR & Admin Portal - Development Plan

## Project Overview

- **Project Name**: NextHire - Hiring Company Website
- **Frontend**: HTML5, CSS3, React.js (via CDN)
- **Backend**: Node.js/Express.js
- **Authentication**: JWT-based session management
- **Theme**: Blue (#007BFF), Dark (#0f0f23), White

---

## Phase 1: Complete Interviews Management Page

### 1.1 Create interviews.html

- **Purpose**: Dedicated page for scheduling and managing interviews
- **Features**:
  - Table showing all scheduled interviews
  - Filter by status (Scheduled, Completed, Cancelled)
  - Search by candidate name/ID
  - Modal for scheduling new interviews
  - Edit/Delete interview actions

### 1.2 Backend Enhancement

- Ensure `/api/interviews` endpoints are fully functional
- Add status update endpoint

---

## Phase 2: Enhance Application Details View

### 2.1 Application Detail Modal

- Click on application to view full details
- Show candidate info, CV download, skill match breakdown
- Quick actions: Shortlist, Reject, Schedule Interview

### 2.2 CV Download Functionality

- Add mock CV file handling
- Download button triggers file download

---

## Phase 3: AI Resume Analyzer (Mock Implementation)

### 3.1 Resume Analysis Display

- Add "AI Analysis" tab or section in applications
- Display extracted skills from CV
- Show match percentage calculation
- List missing skills vs required skills

### 3.2 Backend Data

- Add mock resume analysis data to applications
- Skills extraction simulation

---

## Phase 4: UI/UX Enhancements

### 4.1 Consistent Navigation

- Ensure all pages have consistent sidebar
- Add active state highlighting
- Fix any navigation links

### 4.2 Responsive Design

- Test mobile responsiveness
- Fix sidebar toggle on mobile

### 4.3 Loading States

- Add skeleton loading where needed
- Smooth transitions between pages

---

## Phase 5: Testing & Polish

### 5.1 Cross-Page Testing

- Test all navigation flows
- Verify authentication flow
- Check data consistency

### 5.2 Browser Compatibility

- Test on Chrome, Firefox, Edge
- Fix any console errors

---

## File Structure After Completion

```
NextHire/
├── index.html              # Home Page
├── about.html             # About Us
├── jobs.html             # Public Job Listings
├── job-details.html       # Job Details
├── apply.html            # Application Form
├── contact.html          # Contact Page
├── candidate-login.html   # Candidate Login
├── candidate-dashboard.html
├── skill-test.html       # Candidate Skill Test
├── dashboard.html       # HR Dashboard (Main)
├── login.html           # HR Login
├── job-postings.html    # Job Management
├── applications.html    # Applications List
├── anonymous-screening.html
├── skill-tests.html     # Test Management
├── interviews.html      # Interview Scheduling ⭐ NEW
├── reports.html         # Analytics & Reports
├── server.js           # Backend API
├── package.json
├── Next Hire Logo.jpeg
└── css/
    ├── variables.css
    ├── base.css
    ├── components.css
    └── pages.css
```

---

## Implementation Priority

| Priority | Feature                    | Status |
| -------- | -------------------------- | ------ |
| 1        | Interviews Page            | To Do  |
| 2        | Application Details Modal  | To Do  |
| 3        | CV Download                | To Do  |
| 4        | AI Resume Analyzer Display | To Do  |
| 5        | UI Polish                  | To Do  |

---

## Test Credentials

- **HR Admin**: hradmin / hr123
- **HR User**: hruser / user123

---

## How to Run

1. Install dependencies: `npm install`
2. Start server: `node server.js`
3. Open http://localhost:3000 in browser
4. Login with demo credentials
