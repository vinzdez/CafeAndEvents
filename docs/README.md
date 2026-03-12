# Documentation

Documentation for the Cafe + Event Platform.

## Structure

```
docs/
├── README.md              # This file
├── ARCHITECTURE.md        # System architecture and data model
├── DATABASE.md            # Firestore design and indexes
├── epics/                 # Feature requirements
│   ├── README.md          # Epics overview
│   ├── EPICS.md           # Master tracker
│   ├── EPIC-TEMPLATE.md   # Template for new epics
│   ├── CAF-01 · Cafe Landing Website v1.md
│   ├── EVE-01 · Event Registration v1.md
│   ├── ADM-01 · Admin Authentication v1.md
│   ├── ADM-02 · Event Management v1.md
│   ├── ADM-03 · Participant Management v1.md
│   ├── ADM-04 · Results Upload v1.md
│   └── NTF-01 · Email Notifications v1.md
└── adrs/                  # Architecture Decision Records
    ├── README.md
    ├── ADR-TEMPLATE.md
    ├── 001-firebase-backend.md
    ├── 002-nextjs-frontend.md
    └── 003-firestore-transactions.md
```

## Quick Links

### Getting Started
- [Architecture Overview](./ARCHITECTURE.md)
- [Database Design](./DATABASE.md)
- [Master Epics Tracker](./epics/EPICS.md)

### Epics (Features)
| Epic | Description | Module |
|------|-------------|--------|
| [CAF-01](./epics/CAF-01%20·%20Cafe%20Landing%20Website%20v1.md) | Landing page, gallery, events showcase | Public |
| [EVE-01](./epics/EVE-01%20·%20Event%20Registration%20v1.md) | Event details, registration, payment upload | Public |
| [ADM-01](./epics/ADM-01%20·%20Admin%20Authentication%20v1.md) | Admin login, route protection | Admin |
| [ADM-02](./epics/ADM-02%20·%20Event%20Management%20v1.md) | Create, edit, delete events | Admin |
| [ADM-03](./epics/ADM-03%20·%20Participant%20Management%20v1.md) | View, verify, export registrations | Admin |
| [ADM-04](./epics/ADM-04%20·%20Results%20Upload%20v1.md) | Upload race results PDFs | Admin |
| [NTF-01](./epics/NTF-01%20·%20Email%20Notifications%20v1.md) | Registration, verification emails | System |

### Architecture Decisions
- [001 - Firebase as Backend Platform](./adrs/001-firebase-backend.md)
- [002 - Next.js for Frontend](./adrs/002-nextjs-frontend.md)
- [003 - Firestore Transactions for Capacity](./adrs/003-firestore-transactions.md)

## Development Workflow

See [CLAUDE.md](../CLAUDE.md) for the AI-assisted development workflow:

1. **Plan for [EPIC-CODE]** — AI reads epic, splits into 2-4 phases
2. **Implement Phase [N]** — AI implements assigned ACs with `@satisfies` tags
3. **Verify exit criteria** — Tests, lint, build must pass
4. **Commit and push** — Mark ACs complete in tracker
