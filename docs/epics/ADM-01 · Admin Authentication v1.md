# ADM-01 · Admin Authentication v1

**Status**: 🔵 Planning
**Module**: Admin
**Epic Code**: ADM-01
**Last Updated**: 2026-03-09

---

## Summary

Secure admin authentication system using Firebase Auth. Only authorized admin emails can access the admin dashboard. Non-admin users are blocked from admin routes with automatic redirection.

**Target Users**: Cafe administrators

## Goals

- Provide secure login for authorized admins
- Prevent unauthorized access to admin functionality
- Support role-based access (admin roles stored in Firestore)
- Ensure Firebase Auth enforces all security rules

## Scope

**In Scope:**
- Admin login page
- Firebase Authentication integration
- Admin role verification (via Firestore)
- Route protection for admin pages
- Unauthorized user redirection

**Out of Scope:**
- Self-registration (admins created by system owner)
- Password reset via email
- Multi-factor authentication (future enhancement)
- Audit logging of admin actions (see ADM-02)

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Admin | Full access to all admin features (events, participants, results) |
| Super Admin | Can create other admins, system configuration |

## Dependencies

**Upstream (requires):**
- None — this is a foundational admin epic

**Downstream (enables):**
- ADM-02 — Event Management (requires admin login)
- ADM-03 — Participant Management (requires admin login)
- ADM-04 — Results Upload (requires admin login)

---

## ADM-01-01 · Admin Login

Secure login page for administrators.

**Acceptance Criteria**
- [ ] **ADM-01-01-AC-01** — Login page has email and password fields
- [ ] **ADM-01-01-AC-02** — Login handled by Firebase Auth
- [ ] **ADM-01-01-AC-03** — Error message shown for invalid credentials
- [ ] **ADM-01-01-AC-04** — After successful login, admin role verified from Firestore
- [ ] **ADM-01-01-AC-05** — Non-admin users redirected to public site with error message

**States to Verify**
- Login page with empty fields
- Login with valid admin credentials (success)
- Login with invalid password (error)
- Login with non-admin email (redirect + error)

---

## ADM-01-02 · Route Protection

All admin routes protected from unauthorized access.

**Acceptance Criteria**
- [ ] **ADM-01-02-AC-01** — All `/admin/*` routes require authentication
- [ ] **ADM-01-02-AC-02** — Unauthenticated users redirected to login page
- [ ] **ADM-01-02-AC-03** — After login, user redirected to originally requested page
- [ ] **ADM-01-02-AC-04** — Admin layout shows navigation sidebar/header
- [ ] **ADM-01-02-AC-05** — Logout button available in admin header

**States to Verify**
- Direct access to `/admin/events` while logged out (redirect to login)
- Direct access to `/admin/events` while logged in (page loads)
- Login redirect: accessing `/admin/participants` → login → back to `/admin/participants`
- Admin layout with active navigation state

---

## User Flows

### Flow 1: Admin Login

1. Admin navigates to `/admin`
2. System checks auth status (not logged in)
3. Admin redirected to `/admin/login`
4. Admin enters email and password
5. Firebase Auth validates credentials
6. System checks Firestore for admin role
7. Admin redirected to `/admin/dashboard`

### Flow 2: Non-Admin Attempts Login

1. Non-admin user enters credentials on login page
2. Firebase Auth validates credentials
3. System checks Firestore (no admin role found)
4. User shown error: "Unauthorized access"
5. User redirected to public website

### Flow 3: Session Expires

1. Admin is logged in but session expires
2. Admin clicks link to protected route
3. System detects expired session
4. Admin redirected to login page
5. After re-login, admin returns to requested page

---

## Technical Notes

### Data Model

```
Collection: users (admins)
├── uid: string (Firebase Auth uid)
├── email: string
├── role: "admin" | "superAdmin"
├── displayName: string
├── createdAt: Timestamp
└── lastLoginAt: Timestamp
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin check function
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ["admin", "superAdmin"];
    }
    
    // Users collection — only admins can read/write
    match /users/{userId} {
      allow read: if isAdmin() || request.auth.uid == userId;
      allow write: if isAdmin();
    }
    
    // Events — public read, admin write
    match /events/{eventId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Registrations — owner read, admin read/write
    match /registrations/{registrationId} {
      allow read: if request.auth != null && 
                   (resource.data.email == request.auth.token.email || isAdmin());
      allow create: if request.auth != null;
      allow update, delete: if isAdmin();
    }
  }
}
```

### Admin Route Structure

```
/admin
├── /login          # Login page (public)
├── /dashboard      # Admin dashboard (protected)
├── /events         # Event management (protected)
├── /participants   # Participant management (protected)
└── /settings       # Admin settings (protected)
```

---

## User Stories

- As an **admin**, I can log in securely so that I can access the admin dashboard
- As an **admin**, I am redirected to login if my session expires so that security is maintained
- As a **non-admin**, I cannot access admin routes so that unauthorized access is prevented
- As an **admin**, I can log out so that I can end my session securely
