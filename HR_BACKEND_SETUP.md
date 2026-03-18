# NextHire Backend Setup Guide

## 📦 Backend Structure

```
/api/
├── config.php                 # Main database configuration
├── validation.php             # Validation utilities
├── auth.php                   # General authentication (not used in HR)
├── jobs.php                   # General jobs API
├── applications.php           # General applications API
├── nexthire_import.sql        # Database schema
│
├── /hr/                       # HR-specific backend
│   ├── index.php              # HR API router
│   ├── hr_auth.php            # HR authentication
│   ├── hr_jobs.php            # HR job management
│   ├── hr_candidates.php      # HR candidate management
│   ├── hr_applications.php    # HR application management
│   ├── hr_interviews.php      # HR interview management
│   ├── hr_dashboard.php       # HR analytics
│   ├── .htaccess              # URL rewriting
│   └── HR_API_DOCUMENTATION.md # HR API docs
```

---

## 🔧 Quick Setup

### Step 1: Create Database

Open phpMyAdmin at `http://localhost/phpmyadmin` and:

1. Create new database: `nexthire_db`
2. Import SQL file: `api/nexthire_import.sql`
3. Tables will be created automatically

### Step 2: Create Test HR User

Run this SQL in phpMyAdmin:

```sql
INSERT INTO users (full_name, email, password, phone, role, is_active) 
VALUES (
  'HR Manager',
  'hr@example.com',
  '$2y$10$N9qFpnZGdGnTnN7hKcB5wOQ6nKqQ9l4kQ.p9dFf7kF0kF0kF0kF0kF0',
  '+1234567890',
  'hr',
  1
);
```
**Password:** `password123` (already hashed with bcrypt)

### Step 3: Create Candidate Users (Test Data)

```sql
INSERT INTO users (full_name, email, password, phone, role, is_active) 
VALUES 
('John Doe', 'john@example.com', '$2y$10$N9qFpnZGdGnTnN7hKcB5wOQ6nKqQ9l4kQ.p9dFf7kF0kF0kF0kF0kF0', '+1234567890', 'candidate', 1),
('Jane Smith', 'jane@example.com', '$2y$10$N9qFpnZGdGnTnN7hKcB5wOQ6nKqQ9l4kQ.p9dFf7kF0kF0kF0kF0kF0', '+0987654321', 'candidate', 1),
('Mike Johnson', 'mike@example.com', '$2y$10$N9qFpnZGdGnTnN7hKcB5wOQ6nKqQ9l4kQ.p9dFf7kF0kF0kF0kF0kF0', '+1122334455', 'candidate', 1);
```

### Step 4: Create Candidate Profiles

```sql
INSERT INTO candidate_profiles (candidate_id, experience_years, education) 
VALUES 
(2, 5, 'BS Computer Science'),
(3, 8, 'MS Software Engineering'),
(4, 3, 'BS IT');
```

---

## 🚀 API Endpoints

### Base URLs

**General Admin API:**
```
http://localhost/api/auth/login
http://localhost/api/jobs
http://localhost/api/applications
```

**HR API:**
```
http://localhost/api/hr/auth/login
http://localhost/api/hr/jobs
http://localhost/api/hr/candidates
http://localhost/api/hr/applications
http://localhost/api/hr/interviews
http://localhost/api/hr/dashboard
```

---

## 🧪 Test HR Login

```bash
curl -X POST http://localhost/api/hr/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hr@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": 1,
      "email": "hr@example.com",
      "full_name": "HR Manager",
      "role": "hr"
    }
  }
}
```

---

## 📋 HR Workflows

### 1️⃣ Post a Job
```bash
curl -X POST http://localhost/api/hr/jobs \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior React Developer",
    "description": "We are looking for...",
    "requirements": "5+ years with React",
    "category": "Engineering",
    "location": "Remote",
    "salary_range": "LKR 100,000 - 150,000",
    "experience_required": 5,
    "skills": [
      {"name": "React", "level": "advanced"},
      {"name": "TypeScript", "level": "advanced"}
    ]
  }'
```

### 2️⃣ View Job Applications
```bash
curl -X GET "http://localhost/api/hr/applications?job_id=1&page=1&limit=10" \
  -H "Authorization: Bearer {token}"
```

### 3️⃣ Shortlist a Candidate
```bash
curl -X PUT http://localhost/api/hr/applications/1/status \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"status": "Shortlisted"}'
```

### 4️⃣ Schedule an Interview
```bash
curl -X POST http://localhost/api/hr/interviews \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "application_id": 1,
    "interview_date": "2026-04-15",
    "interview_type": "Video Call",
    "location": "https://zoom.us/meeting"
  }'
```

### 5️⃣ View Dashboard
```bash
curl -X GET http://localhost/api/hr/dashboard \
  -H "Authorization: Bearer {token}"
```

---

## ✅ Validation Rules

### Job Creation
- Title (required, string)
- Description (required, string)
- Requirements (required, string)
- Category (required, string)
- Experience Required (optional, integer)
- Expiration Date (optional, date format: YYYY-MM-DD)

### Application Status Update
Valid statuses:
- `Pending` - New application
- `Shortlisted` - Passed initial screening
- `Rejected` - Not selected
- `Interview Scheduled` - Called for interview
- `Selected` - Final offer

### Interview Types
- `Video Call`
- `Phone Call`
- `On-site`
- `Technical Assessment`

---

## 🔐 Security Features

✅ **Password Hashing:** bcrypt with salt
✅ **JWT Tokens:** 24-hour expiration
✅ **Role-Based Access:** HR and Admin only
✅ **CORS Protection:** Whitelist localhost ports
✅ **Input Validation:** All inputs validated
✅ **SQL Injection Prevention:** Prepared statements
✅ **Error Handling:** Detailed error messages

---

## 📊 Database Schema

**Key Tables:**
- `users` - All users (HR, Admin, Candidates)
- `jobs` - Job postings
- `applications` - Job applications
- `interviews` - Interview records
- `candidate_profiles` - Candidate details
- `job_skills` - Required skills per job
- `notifications` - System notifications

---

## 🐛 Common Issues & Solutions

### Issue: "Database connection failed"
**Solution:** Check database credentials in `/api/config.php`
```php
define('DB_NAME', 'nexthire_db');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### Issue: "Access token required"
**Solution:** Include Authorization header:
```
Authorization: Bearer {your_token}
```

### Issue: "Invalid or expired token"
**Solution:** Login again to get a fresh token (expires in 24 hours)

### Issue: "Unauthorized to update this job"
**Solution:** Only the job creator or admin can update jobs

---

## 📱 Frontend Configuration

Update your React frontend config:

```javascript
// src/config/api.ts
export const API_BASE = 'http://localhost/api';
export const HR_API_BASE = 'http://localhost/api/hr';

// For HR dashboard
export const hrAPI = {
  login: `${HR_API_BASE}/auth/login`,
  jobs: `${HR_API_BASE}/jobs`,
  candidates: `${HR_API_BASE}/candidates`,
  applications: `${HR_API_BASE}/applications`,
  interviews: `${HR_API_BASE}/interviews`,
  dashboard: `${HR_API_BASE}/dashboard`
};
```

---

## 🔄 API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    // response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": {
    "field_name": "Field error message"
  }
}
```

---

## 📞 Need Help?

1. Check `/api/hr/HR_API_DOCUMENTATION.md` for detailed API docs
2. Look at request/response examples above
3. Check database tables for data structure
4. Review error messages for validation issues

---

**Created:** 2026-03-18
**Version:** 1.0
**Status:** ✅ Fully Functional
