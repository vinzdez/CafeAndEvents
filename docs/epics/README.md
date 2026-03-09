# Epics Overview

This directory contains all feature requirements for the Cafe + Event Platform.

## What is an Epic?

An **epic** is a large body of work that can be broken down into smaller, deliverable milestones. Each epic:
- Has a clear goal and scope
- Contains numbered milestones with acceptance criteria
- Can be implemented in 2-4 phases
- Is tracked for completion

## Epic Naming Convention

| Code | Module | Description |
|------|--------|-------------|
| **CAF** | Cafe | Public cafe website features |
| **EVE** | Events | Event registration (public) |
| **ADM** | Admin | Admin dashboard features |
| **NTF** | Notifications | Email and system notifications |

## Epic Files

- `CAF-01` — Cafe Landing Website (landing, gallery, events showcase)
- `EVE-01` — Event Registration (details, form, payment upload)
- `ADM-01` — Admin Authentication (login, roles)
- `ADM-02` — Event Management (CRUD operations)
- `ADM-03` — Participant Management (view, verify, export)
- `ADM-04` — Results Upload (race results PDFs)
- `NTF-01` — Email Notifications (registration, payment emails)

## Epic Document Structure

Each epic follows this structure:

1. **Header** — Status, module, epic code, last updated
2. **Summary** — 2-3 sentence description
3. **Goals** — What outcomes this achieves
4. **Scope** — In scope and out of scope
5. **Users & Roles** — Who uses this feature
6. **Dependencies** — What this requires/enables
7. **Milestones** — Numbered sections with ACs
8. **User Flows** — Happy paths and error paths
9. **Technical Notes** — Data model, integrations

## Acceptance Criteria Format

Each AC follows the pattern: `EPIC-XX-AC-NN` — Description

Example:
```
- [ ] **CAF-01-AC-01** — Landing page loads in under 2 seconds
```

## Status Legend

| Icon | Status |
|------|--------|
| 🔵 | Planning |
| 🟡 | In Progress |
| 🟢 | Complete |
| ⚪ | On Hold |

## Implementation Workflow

See [CLAUDE.md](../CLAUDE.md) for the 2-prompt AI-assisted implementation workflow.

---

## Templates

- [EPIC-TEMPLATE.md](./EPIC-TEMPLATE.md) — Create new epics
- [EPICS-TRACKER-TEMPLATE.md](./EPICS-TRACKER-TEMPLATE.md) — Master progress tracking
