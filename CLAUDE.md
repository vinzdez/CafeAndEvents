# Cafe + Event Platform

A serverless cafe website and running/biking event registration system. Built for **Vince** as a solo developer project.

---

## Project Overview

A combined platform featuring:
1. **Cafe Landing Website** — Hero, gallery, cafe info, upcoming events showcase
2. **Event Registration System** — Browse events, register participants, upload payment receipts
3. **Admin Dashboard** — Event management, payment verification, participant exports, results upload

**Architecture**: Serverless (Firebase) to minimize cost and maintenance.

| Attribute | Value |
|-----------|-------|
| **Status** | In Development |
| **Developer** | Vince (solo) |
| **Architecture** | Serverless |
| **Frontend** | Next.js 15, Tailwind CSS |
| **Backend** | Firebase (Auth, Firestore, Storage, Cloud Functions) |
| **Hosting** | Firebase Hosting |
| **Email** | Resend via Cloud Functions |

---

## Project Structure

```
cafe-event-platform/
├── app/                     # Next.js application
│   ├── (public)/           # Public routes (landing, events, gallery)
│   ├── (admin)/            # Admin dashboard routes
│   ├── api/                # API routes
│   └── lib/                # Utilities, hooks, services
├── functions/              # Firebase Cloud Functions
│   ├── src/
│   │   ├── manageEvents/   # Event CRUD, capacity management
│   │   ├── manageRegistrations/  # Registration with transactions
│   │   ├── managePayments/ # Payment verification
│   │   └── sendEmail/      # Email notifications
│   └── package.json
├── firestore/              # Firestore indexes and rules
├── storage/                # Storage rules
├── docs/                   # Project documentation
│   ├── epics/              # Feature requirements
│   ├── adrs/               # Architecture decisions
│   └── README.md
└── firebase.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| State Management | React hooks, SWR for data fetching |
| Backend | Firebase Cloud Functions (v2) |
| Database | Firestore (serverless NoSQL) |
| Auth | Firebase Authentication |
| Storage | Firebase Storage (receipts, results PDFs) |
| Hosting | Firebase Hosting |
| Email | Resend API via Cloud Functions |
| Images | Next.js Image optimization, lazy loading |

---

## Cost Estimation

### Firebase Spark Plan (Free)
- Firestore: 50K reads/day, 20K writes/day
- Storage: 5GB
- Hosting: 10GB
- **Cost**: $0/month for small events

### Firebase Blaze Plan (Pay-as-you-go)
| Service | Estimated Cost |
|---------|----------------|
| Firestore | ~$5 |
| Storage | ~$1-3 |
| Hosting | ~$1-5 |
| **Total** | **$5-15/month** |

---

## Development Commands

```bash
# Install dependencies
npm install

# Start Next.js dev server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

---

## Documentation

All documentation lives in [`docs/`](./docs/).

### Product & Architecture

- [Product Brief](./docs/PRODUCT_BRIEF.md) — Target audience, features, differentiators
- [Architecture](./docs/ARCHITECTURE.md) — System design, data model, security rules
- [Database Design](./docs/DATABASE.md) — Collections, indexes, transactions

### Epic Documentation (Requirements)

- [Epic System Overview](./docs/epics/README.md) — How epics are organized
- [Epic Template](./docs/epics/EPIC-TEMPLATE.md) — Template for new epics
- [Epics Tracker](./docs/epics/EPICS.md) — Master progress tracker

**Epics:**

| Epic | Module | Description |
|------|--------|-------------|
| [CAF-01](./docs/epics/CAF-01%20·%20Cafe%20Landing%20Website%20v1.md) | Public | Landing page, gallery, upcoming events section |
| [EVE-01](./docs/epics/EVE-01%20·%20Event%20Registration%20v1.md) | Public | Event details, registration form, payment upload |
| [ADM-01](./docs/epics/ADM-01%20·%20Admin%20Authentication%20v1.md) | Admin | Admin login, Firebase Auth, role management |
| [ADM-02](./docs/epics/ADM-02%20·%20Event%20Management%20v1.md) | Admin | Create, edit, delete events |
| [ADM-03](./docs/epics/ADM-03%20·%20Participant%20Management%20v1.md) | Admin | View registrations, verify payments, export |
| [ADM-04](./docs/epics/ADM-04%20·%20Results%20Upload%20v1.md) | Admin | Upload race results PDFs |
| [NTF-01](./docs/epics/NTF-01%20·%20Email%20Notifications%20v1.md) | System | Registration confirmation, payment verified, rejected |

### Architecture Decision Records (ADRs)

- [ADR Template](./docs/adrs/ADR-TEMPLATE.md) — Template for recording decisions
- [001 - Firebase as Backend Platform](./docs/adrs/001-firebase-backend.md) — Why serverless/Firebase
- [002 - Next.js for Frontend](./docs/adrs/002-nextjs-frontend.md) — Why Next.js for SEO
- [003 - Firestore Transactions for Capacity](./docs/adrs/003-firestore-transactions.md) — Concurrency handling

---

## When to Create Documentation

| Type | When | Location |
|------|------|----------|
| **Epic** | New feature requirements | `docs/epics/` |
| **ADR** | System architecture decisions | `docs/adrs/` |
| **Process** | Team workflows | `docs/` |

---

## Key Patterns

### Concurrency Handling (Race Capacity)

**Problem**: Two users registering when only 1 slot remains.

**Solution**: Firestore transactions

```typescript
// Transaction flow
await db.runTransaction(async (transaction) => {
  const eventDoc = await transaction.get(eventRef);
  const currentCount = eventDoc.data().registeredCount;
  
  if (currentCount >= capacity) {
    throw new Error('Event capacity reached');
  }
  
  transaction.update(eventRef, { 
    registeredCount: currentCount + 1 
  });
  transaction.set(registrationRef, registrationData);
});
```

### Security Rules

- **Users**: Can create registrations, upload own receipts
- **Admins**: Can read all registrations, manage events, verify payments
- **Firestore rules enforce**: No overbooking, admin-only operations

### Email Notifications

| Trigger | Email | Function |
|---------|-------|----------|
| Registration created | Payment instructions | `sendRegistrationEmail` |
| Payment verified | Confirmation | `sendPaymentVerifiedEmail` |
| Payment rejected | Retry instructions | `sendPaymentRejectedEmail` |

### `@satisfies` Tags

Link code to epic acceptance criteria:

```typescript
/** @satisfies EVE-01-AC-03 Registration form validates required fields */
function validateRegistration(data: RegistrationData) {
  // validation logic
}
```

---

## Implementation Plans

Every implementation plan must include per-phase **exit criteria**:

1. Unit tests written and passing (80% coverage minimum)
2. `npm run lint` passes with zero errors
3. `npm run build` passes with zero errors
4. All acceptance criteria for the phase satisfied and tagged with `@satisfies`

No phase is complete until all gates pass.

---

## Epic Implementation Workflow (AI-Assisted — 2-Prompt)

### Prompt 1 — "Plan for [EPIC-CODE]"

When asked to **plan for an epic**, do all of the following automatically:

1. Read the epic document from `docs/epics/`
2. Split the epic into **2-4 phases** using this pattern:

| Phase | Focus | Typical Contents |
|-------|-------|-----------------|
| **Phase 1 — Data & Infrastructure** | Schemas, types, rules | Firestore schemas, TypeScript types, security rules |
| **Phase 2 — Core Logic** | Business logic | CRUD operations, transactions, Cloud Functions |
| **Phase 3 — UI & Integration** | Pages, components | Forms, routing, API integration |
| **Phase 4 — Polish & Edge Cases** | UX, edge cases | Error handling, loading states, responsive |

3. Output a phase plan listing which ACs belong to each phase
4. **Do NOT implement anything** — wait for approval

### Prompt 2 — "Implement Phase [N] for [EPIC-CODE]"

When asked to **implement a phase**:

1. **Create the branch** from `main`:
   ```bash
   git checkout main && git pull origin main
   git checkout -b epic/<EPIC-CODE>-phase-<N>
   ```

2. **Implement** only the ACs assigned to this phase

3. **Tag satisfied ACs** in code with `@satisfies`:
   ```typescript
   /** @satisfies CAF-01-AC-02 Gallery images optimized for web */
   ```

4. **Verify exit criteria** before committing

5. **Commit and push** the phase branch

6. **Do NOT start the next phase** until current is pushed

### Conventions

- **Branch naming**: `epic/<EPIC-CODE>-phase-<N>` (e.g., `epic/CAF-01-phase-1`)
- **PR title**: `[EPIC-CODE] Phase N: Short description`
- **Commit message**: Include AC codes satisfied

---

## Firebase Setup

### Projects
- **Production**: `cafe-event-platform`
- **Development**: `cafe-event-platform-dev`

### Services Enabled
- Authentication (Email/Password)
- Firestore Database
- Storage
- Hosting
- Cloud Functions

### Firestore Indexes

Required composite indexes:

| Collection | Fields | Purpose |
|------------|--------|---------|
| registrations | `eventId` + `status` | Filter participants by status |
| registrations | `eventId` + `createdAt` | Sort registrations by date |
| events | `eventDate` + `category` | Filter and sort events |

See `firestore/indexes/` for index definitions.

---

## Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events: Public read, admin write
    match /events/{eventId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Registrations: Users create own, read own, admin read all
    match /registrations/{registrationId} {
      allow create: if isValidRegistration();
      allow read: if isOwner() || isAdmin();
      allow update: if isAdmin();
    }
  }
}
```

See `firestore.rules` for complete rules.

---

## Future Enhancements

- QR race check-in
- Bib number generation
- SMS notifications
- Online payment integration (Stripe/PayMongo)
- Multi-cafe support
- Recurring events

---

## License

Proprietary — Vince 2026
