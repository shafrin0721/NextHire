# Footer Role-Based Navigation (Approved)

Status: 3/4 ✅

**Step 1:** ✓ AccessDeniedMessage.tsx created
**Step 2:** ✓ Footer.tsx updated (role conditional)
**Step 3:** Test roles
**Step 4:** Complete

\*\*Step 1: Create AccessDeniedMessage.tsx [ ]
New component for role denial

\*\*Step 2: Update Footer.tsx [ ]

- Import auth + role check
- Conditional 'For Companies' section
- HR/Admin: Post a Job → /dashboard/hr/jobs/new , HR Dashboard → /dashboard/hr
- Candidate: message 'Only for HR/Admins'

\*\*Step 3: Test roles [ ]

- HR login → links active
- Candidate login → message
- Common 'Jobs Dashboard' → /jobs or /dashboard

\*\*Step 4: Complete [ ]
HMR tests, cleanup
