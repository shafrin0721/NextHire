# 🎯 NextHire HR Backend - Quick Reference

## ✅ Files Created

```
/api/hr/
├── index.php                  - HR API Router
├── hr_auth.php               - Login/Register
├── hr_jobs.php               - Job Management
├── hr_candidates.php         - Candidate Screening
├── hr_applications.php       - Application Management  
├── hr_interviews.php         - Interview Scheduling
├── hr_dashboard.php          - Analytics & Reports
├── .htaccess                 - URL Rewriting
├── HR_API_DOCUMENTATION.md   - Full API Docs
```

---

## 🚀 Quick Start (5 Steps)

### Step 1: Setup Database
```sql
-- Import nexthire_import.sql into phpMyAdmin
-- Database: nexthire_db
```

### Step 2: Create HR User
```sql
INSERT INTO users (full_name, email, password, phone, role, is_active) 
VALUES ('HR Manager', 'hr@example.com', '$2y$10$N9qFpnZGdGnTnN7hKcB5wOQ6nKqQ9l4kQ.p9dFf7kF0kF0kF0kF0kF0', '+1234567890', 'hr', 1);
-- Password: password123
```

### Step 3: Login
```bash
curl -X POST http://localhost/api/hr/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"hr@example.com","password":"password123"}'
```

### Step 4: Copy Token from Response

### Step 5: Use API with Token
```bash
curl -X GET http://localhost/api/hr/jobs \
  -H "Authorization: Bearer {YOUR_TOKEN}"
```

---

## 📊 Main API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | HR login |
| `/jobs` | GET/POST/PUT/DELETE | Job management |
| `/candidates` | GET/PUT | Candidate screening |
| `/applications` | GET/PUT | Application tracking |
| `/interviews` | GET/POST/PUT/DELETE | Interview scheduling |
| `/dashboard` | GET | Analytics & stats |

---

## 💡 Common Use Cases

### Post a Job
```bash
POST /api/hr/jobs
{
  "title": "Senior Developer",
  "description": "Description here",
  "requirements": "Requirements here",
  "category": "Engineering",
  "location": "Remote"
}
```

### View All Applications for a Job
```bash
GET /api/hr/applications?job_id=1&page=1&limit=10
```

### Shortlist a Candidate
```bash
PUT /api/hr/applications/1/status
{"status": "Shortlisted"}
```

### Schedule Interview
```bash
POST /api/hr/interviews
{
  "application_id": 1,
  "interview_date": "2026-04-15",
  "interview_type": "Video Call",
  "location": "https://zoom.us/meeting"
}
```

### View Dashboard Stats
```bash
GET /api/hr/dashboard
```

---

## 🔑 Authentication

All protected endpoints require:
```
Authorization: Bearer {token}
```

Token obtained from login, valid for 24 hours.

---

## ⚙️ Database Schema

### Users Table
```sql
- user_id (PK)
- full_name
- email (UNIQUE)
- password (hashed)
- role (candidate|hr|admin)
- is_active
```

### Jobs Table
```sql
- job_id (PK)
- title
- description
- requirements
- category
- salary_range
- status (active|inactive)
- created_by (FK to users)
```

### Applications Table
```sql
- application_id (PK)
- job_id (FK)
- candidate_id (FK)
- status (Pending|Shortlisted|Rejected|Selected|Interview Scheduled)
- match_percentage
```

### Interviews Table
```sql
- interview_id (PK)
- application_id (FK)
- interview_date
- interview_type (Video Call|Phone|On-site)
- interview_status (Scheduled|Completed|Cancelled)
```

---

## 📋 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (no token) |
| 403 | Forbidden (invalid token) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 500 | Server Error |

---

## 🎯 API Response Format

### Success
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error
```json
{
  "status": "error",
  "message": "Error description",
  "errors": { "field": "error message" }
}
```

---

## 🧪 Postman Collection

Import these requests into Postman:

**1. HR Login**
- POST: `http://localhost/api/hr/auth/login`
- Body: `{"email":"hr@example.com","password":"password123"}`

**2. List Jobs**
- GET: `http://localhost/api/hr/jobs?page=1&limit=10`
- Header: `Authorization: Bearer {token}`

**3. Create Job**
- POST: `http://localhost/api/hr/jobs`
- Header: `Authorization: Bearer {token}`
- Body: Job details (see docs)

**4. List Candidates**
- GET: `http://localhost/api/hr/candidates?page=1&limit=10`
- Header: `Authorization: Bearer {token}`

**5. List Applications**
- GET: `http://localhost/api/hr/applications?page=1&limit=10`
- Header: `Authorization: Bearer {token}`

**6. Schedule Interview**
- POST: `http://localhost/api/hr/interviews`
- Header: `Authorization: Bearer {token}`
- Body: Interview details (see docs)

**7. Dashboard**
- GET: `http://localhost/api/hr/dashboard`
- Header: `Authorization: Bearer {token}`

---

## 🔧 Configuration

File: `/api/config.php`

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'nexthire_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('JWT_SECRET', 'nexthire_secret_key_2024');
```

---

## 🐛 Troubleshooting

**Q: "Database connection failed"**
- A: Check MySQL is running and credentials in config.php

**Q: "Access token required"**
- A: Add `Authorization: Bearer {token}` header

**Q: "Invalid token"**
- A: Login again, token expires in 24 hours

**Q: "Unauthorized to update job"**
- A: Only job creator or admin can update

**Q: CORS error**
- A: Allowed ports: 3000, 4173, 5173, 5174, 5175, 5176

---

## 📞 Support

1. **Full docs:** `/api/hr/HR_API_DOCUMENTATION.md`
2. **Setup guide:** `/HR_BACKEND_SETUP.md`
3. **Source code:** `/api/hr/*.php`
4. **Database schema:** `/api/nexthire_import.sql`

---

## ✨ Features

✅ JWT Authentication
✅ Role-based Access Control
✅ Job Management
✅ Candidate Screening
✅ Application Tracking
✅ Interview Scheduling
✅ Dashboard Analytics
✅ Input Validation
✅ Error Handling
✅ Pagination & Filtering
✅ Search Functionality
✅ CORS Support

---

**Status:** ✅ Ready to Use
**Version:** 1.0
**Last Updated:** 2026-03-18
