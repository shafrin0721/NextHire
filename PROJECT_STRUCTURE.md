# NextHire Project Structure - Reorganized

## Overview
The project has been successfully reorganized into a clean, professional, and scalable folder structure following modern React best practices.

## New Directory Structure

```
src/
├── pages/                          # Public pages/screens
│   ├── Home/                       # Home page with sections
│   │   ├── Home.tsx
│   │   ├── index.ts
│   │   └── sections/
│   ├── About/                      # About page
│   ├── Jobs/                       # Job listings
│   ├── JobDetails/                 # Job detail view
│   ├── Login/                      # Login page
│   ├── CreateAndAccount/           # Signup page
│   ├── Apply/                      # Job application page
│   ├── Contact/                    # Contact page
│   ├── Logout/                     # Logout handler
│   └── NotFound/                   # 404 page
│
├── dashboard/                      # Admin and HR dashboards
│   ├── Admin/                      # Admin dashboard pages
│   │   ├── AdminDashboard.tsx
│   │   ├── Candidates.tsx
│   │   ├── JobApplications.tsx
│   │   ├── Interviews.tsx
│   │   ├── Jobs.tsx (Admin)
│   │   ├── ReportsAnalytics.tsx
│   │   ├── Settings.tsx
│   │   ├── SkillTests.tsx
│   │   └── index.ts
│   ├── Hr/                         # HR dashboard
│   │   ├── HrDashboard.tsx
│   │   └── index.ts
│   └── Assessment/                 # Skill test assessments
│       ├── Assessment.tsx
│       └── index.ts
│
├── components/                     # Reusable UI components
│   ├── ui/                         # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   └── avatar.tsx
│   └── ProtectedRoute.tsx          # Route protection HOC
│
├── utils/                          # Utility functions & helpers
│   ├── auth.ts                     # Authentication utilities
│   ├── validation.ts               # Form validation functions
│   └── helpers.ts                  # General helper functions (formerly utils.ts)
│
├── services/                       # API and data services
│   ├── data/
│   │   ├── jobs.ts                 # Mock job data & API functions
│   │   └── job.interface.ts        # Job type definitions
│   └── [future API services]
│
├── assets/                         # Static assets
│   ├── images/                     # Image files
│   ├── icons/                      # Icon assets
│   └── logo/                       # Logo files
│
├── styles/                         # Global styling
│   └── [CSS files to migrate]
│
├── index.tsx                       # React app entry point
├── App.tsx                         # Main app component (if exists)
└── index.css                       # Global CSS
```

## Key Improvements

### 1. **Separation of Concerns**
   - **pages/**: Contains user-facing page components
   - **dashboard/**: Contains admin and staff dashboard pages
   - **components/**: Reusable UI components
   - **utils/**: Helper functions and validation
   - **services/**: API calls and data management

### 2. **Scalability**
   - Easy to add new pages by creating folders in `pages/`
   - Easy to add new dashboard features in `dashboard/`
   - Centralized utilities and services for DRY principles

### 3. **Maintainability**
   - Clear folder organization makes it easy to locate code
   - Related files are grouped together
   - Barrel exports (index.ts) enable clean imports

### 4. **Professional Standards**
   - Follows industry-standard React project structure
   - Scales well from startup to enterprise-level applications
   - Easy integration with state management (Redux, Zustand)
   - Ready for API integration in services folder

## Import Pattern Changes

### Before
```tsx
import { validateEmail } from "../../lib/validation";
import { Home } from "./screens/Home";
import { jobs } from "../../data/jobs";
```

### After
```tsx
import { validateEmail } from "../../utils/validation";
import { Home } from "../../pages/Home";
import { jobs } from "../../services/data/jobs";
```

## File Locations

| Previous Path | New Path |
|---|---|
| `src/screens/*` | `src/pages/*` |
| `src/screens/Admin/*` | `src/dashboard/Admin/*` |
| `src/screens/Hr/*` | `src/dashboard/Hr/*` |
| `src/screens/Assessment/*` | `src/dashboard/Assessment/*` |
| `src/lib/validation.ts` | `src/utils/validation.ts` |
| `src/lib/auth.ts` | `src/utils/auth.ts` |
| `src/lib/utils.ts` | `src/utils/helpers.ts` |
| `src/data/jobs.ts` | `src/services/data/jobs.ts` |

## Issues Fixed

### ✅ React Hook Error (Invalid Hook Call)
- **Root Cause**: Duplicate `node_modules/react` from nested `/project` directory
- **Solution**: Removed duplicate node_modules to ensure single React instance
- **Status**: FIXED ✓

## Next Steps

1. **Add API Services**: Create API calls in `src/services/api/`
   - Auth service
   - Jobs service
   - Users service
   - etc.

2. **Add Middleware**: Create any Express/API middleware in `src/services/middleware/`

3. **Add Hooks**: Create custom React hooks in `src/utils/hooks/`

4. **Organize Styles**: Move CSS files to `src/styles/` and organize by component or page

5. **Add Constants**: Create `src/constants/` for app-wide constants

6. **State Management**: Set up Redux/Zustand store structure when needed

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## Notes

- All imports have been updated to reflect the new structure
- All barrel exports (index.ts files) maintain existing export patterns
- No functionality has been changed, only reorganized
- The React hook error has been resolved by cleaning up duplicate dependencies
- The project is now ready for scaling and team development

---

**Last Updated**: March 5, 2026
**Project**: NextHire Recruitment Platform
