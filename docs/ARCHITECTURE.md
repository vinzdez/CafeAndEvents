# Architecture

System architecture for the Cafe + Event Platform.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              Client Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │   Public Site   │  │   Admin Portal  │  │   Participant Actions   │  │
│  │   (Next.js)     │  │   (Next.js)     │  │   (Public Site)         │  │
│  │                 │  │                 │  │                         │  │
│  │  • Landing page │  │  • Login        │  │  • View events          │  │
│  │  • Gallery      │  │  • Event CRUD   │  │  • Register             │  │
│  │  • Event list   │  │  • Participants │  │  • Upload receipt       │  │
│  │  • Event details│  │  • Results      │  │  • Download results     │  │
│  └────────┬────────┘  └────────┬────────┘  └─────────────────────────┘  │
└───────────┼────────────────────┼────────────────────────────────────────┘
            │                    │
            ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           Firebase Platform                             │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │   Firestore     │  │   Cloud         │  │      Firebase           │  │
│  │   Database      │  │   Functions     │  │      Storage            │  │
│  │                 │  │                 │  │                         │  │
│  │  • events       │  │  • manageEvents │  │  • receipts/            │  │
│  │  • registrations│  │  • manageRegistrations│  • results/           │  │
│  │  • users        │  │  • sendEmail    │  │  • posters/             │  │
│  │  • emailLogs    │  │                 │  │                         │  │
│  └─────────────────┘  └────────┬────────┘  └─────────────────────────┘  │
│                               │                                         │
│                               ▼                                         │
│                      ┌─────────────────┐                               │
│                      │   Resend API    │                               │
│                      │   (Email)       │                               │
│                      └─────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────┘
```

## Components

### Frontend (Next.js 15)

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Landing page | No |
| `/gallery` | Cafe photo gallery | No |
| `/events` | Upcoming events list | No |
| `/events/[id]` | Event details & registration | No |
| `/admin/login` | Admin login | No |
| `/admin` | Admin dashboard | Yes (admin) |
| `/admin/events` | Event management | Yes (admin) |
| `/admin/participants` | Participant management | Yes (admin) |

### Cloud Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `manageEvents` | HTTPS | Event CRUD operations |
| `manageRegistrations` | HTTPS | Registration with transactions |
| `onRegistrationCreated` | Firestore onCreate | Send registration email |
| `onRegistrationUpdated` | Firestore onUpdate | Send verify/reject emails |
| `sendEmail` | HTTPS (internal) | Email delivery via Resend |

## Data Model

### Events Collection

```typescript
interface Event {
  id: string;                          // Auto-generated
  name: string;                        // Event name (e.g., "City Run 2025")
  description: string;               // Event description
  eventDate: Timestamp;               // Event date
  registrationFee: number;            // Fee in PHP
  category: 'running' | 'biking' | 'trail';
  capacity: number;                   // Max participants
  registeredCount: number;             // Current registrations (auto-managed)
  posterUrl: string | null;           // URL to poster image
  resultsPdfUrl: string | null;       // URL to results PDF
  status: 'draft' | 'published' | 'closed';
  createdBy: string;                  // Admin UID
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Registrations Collection

```typescript
interface Registration {
  id: string;                          // Auto-generated
  eventId: string;                     // Reference to event
  eventName: string;                   // Denormalized for queries
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  emergencyContact: string;
  receiptUrl: string | null;         // URL to payment receipt
  status: 'pending_payment_verification' | 'payment_submitted' | 'payment_verified' | 'rejected';
  verifiedBy: string | null;           // Admin UID
  verifiedByName: string | null;      // Denormalized
  verifiedAt: Timestamp | null;
  rejectionReason: string | null;
  createdAt: Timestamp;
}
```

### Users Collection (Admins)

```typescript
interface User {
  uid: string;                         // Firebase Auth UID
  email: string;
  role: 'admin' | 'superAdmin';
  displayName: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}
```

### Email Logs Collection

```typescript
interface EmailLog {
  id: string;
  registrationId: string;
  eventId: string;
  recipientEmail: string;
  emailType: 'registration' | 'payment_verified' | 'payment_rejected';
  subject: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
  errorMessage: string | null;
  retryCount: number;
  createdAt: Timestamp;
}
```

## Security Model

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ["admin", "superAdmin"];
    }
    
    function isOwner(email) {
      return isAuthenticated() && request.auth.token.email == email;
    }
    
    // Events — public read, admin write
    match /events/{eventId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Registrations — owner or admin
    match /registrations/{registrationId} {
      allow read: if isOwner(resource.data.email) || isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    // Users — admin or self
    match /users/{userId} {
      allow read: if isAdmin() || request.auth.uid == userId;
      allow write: if isAdmin();
    }
    
    // Email logs — admin only
    match /emailLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false;  // Only Cloud Functions write here
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ["admin", "superAdmin"];
    }
    
    // Receipts — owner can upload, admin can read/delete
    match /receipts/{eventId}/{registrationId}/{fileName} {
      allow create: if request.auth != null;
      allow read: if isAdmin() || request.auth.uid == resource.metadata.uid;
      allow delete: if isAdmin();
    }
    
    // Results — public read, admin write
    match /results/{eventId}/results.pdf {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Posters — public read, admin write
    match /posters/{eventId}/{fileName} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## Key Patterns

### 1. Transaction-Based Registration

All registrations use Firestore transactions to prevent overbooking:

```typescript
await db.runTransaction(async (transaction) => {
  // Read event
  const eventDoc = await transaction.get(eventRef);
  const { capacity, registeredCount } = eventDoc.data();
  
  // Check constraints
  if (registeredCount >= capacity) throw new Error('Full');
  
  // Atomic updates
  transaction.update(eventRef, { registeredCount: registeredCount + 1 });
  transaction.set(registrationRef, data);
});
```

### 2. Denormalization for Queries

Key fields denormalized to avoid complex joins:
- `eventName` stored in registration (for listing without event lookup)
- `verifiedByName` stored in registration (for display)

### 3. Status Workflow

```
pending_payment_verification 
  → payment_submitted (participant uploads receipt)
    → payment_verified (admin approves)
    → rejected (admin rejects with reason)
      → payment_submitted (participant re-uploads)
```

### 4. Email Triggering

Emails triggered by Firestore triggers, not direct API calls:

```typescript
// Cloud Function
export const onRegistrationCreated = onDocumentCreated(
  'registrations/{id}',
  async (event) => {
    await sendRegistrationEmail(event.params.id, event.data.data());
  }
);
```

## Performance Considerations

### Indexes Required

| Collection | Fields | Purpose |
|------------|--------|---------|
| events | `eventDate` + `status` | List published events by date |
| events | `category` + `eventDate` | Filter by category |
| registrations | `eventId` + `status` | Filter participants by status |
| registrations | `eventId` + `createdAt` | Sort registrations by date |
| registrations | `email` + `eventId` | Duplicate check |

### Optimization Strategies

1. **Pagination**: Lists use cursor-based pagination (50 items/page)
2. **Image optimization**: Next.js Image component with WebP format
3. **Lazy loading**: Gallery images load on scroll
4. **Caching**: ISR for event detail pages (revalidate 60s)

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│           Firebase Project              │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │        Firebase Hosting             │ │
│  │  ┌─────────┐  ┌─────────────────┐  │ │
│  │  │  Web    │  │  Admin Portal   │  │ │
│  │  │ (Next.js)│  │  (Next.js)     │  │ │
│  │  └─────────┘  └─────────────────┘  │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │       Firebase Services             │ │
│  │  • Firestore   • Storage           │ │
│  │  • Functions   • Auth              │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  External: Resend API (Email)           │
└─────────────────────────────────────────┘
```

## Monitoring & Debugging

| Resource | Tool | Purpose |
|----------|------|---------|
| Functions logs | Firebase Console | Debug function errors |
| Firestore usage | Firebase Console | Monitor read/write costs |
| Email logs | Firestore `emailLogs` | Track email delivery |
| Performance | Lighthouse | Page speed monitoring |
