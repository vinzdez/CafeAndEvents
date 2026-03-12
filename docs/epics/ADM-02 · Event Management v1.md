# ADM-02 · Event Management v1

**Status**: 🔵 Planning
**Module**: Admin
**Epic Code**: ADM-02
**Last Updated**: 2026-03-09

---

## Summary

Admin interface for creating, editing, and deleting events. Admins can manage all event details including name, date, capacity, registration fee, category, and event poster.

**Target Users**: Cafe administrators

## Goals

- Enable admins to create new running/biking events
- Allow editing of existing event details
- Support event deletion with appropriate safeguards
- Manage event status (draft, published, closed)

## Scope

**In Scope:**
- Event CRUD operations (Create, Read, Update, Delete)
- Event fields: name, date, capacity, fee, category, description, poster
- Event status management (draft → published → closed)
- Validation of required fields

**Out of Scope:**
- Recurring event templates
- Event cloning/duplication
- Advanced scheduling features
- Event analytics (future enhancement)

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Admin | Create, edit, delete, publish events |
| Super Admin | Same as admin |

## Dependencies

**Upstream (requires):**
- ADM-01 — Admin Authentication (login required)

**Downstream (enables):**
- CAF-01 — Events displayed on public website
- EVE-01 — Event registration uses events created here

---

## ADM-02-01 · Create Event

Form to create new events.

**Acceptance Criteria**
- [ ] **ADM-02-01-AC-01** — Form includes required fields: name, eventDate, capacity, registrationFee
- [ ] **ADM-02-01-AC-02** — Optional fields: description, category, poster image
- [ ] **ADM-02-01-AC-03** — Event date must be in the future
- [ ] **ADM-02-01-AC-04** — Capacity must be positive number
- [ ] **ADM-02-01-AC-05** — Registration fee must be non-negative number
- [ ] **ADM-02-01-AC-06** — Category options: running, biking, trail
- [ ] **ADM-02-01-AC-07** — Event created with status: "draft" by default
- [ ] **ADM-02-01-AC-08** — Validation errors shown inline for invalid fields
- [ ] **ADM-02-01-AC-09** — Success confirmation after event created

**States to Verify**
- Form with valid data (all required fields)
- Form with invalid date (past date error)
- Form with invalid capacity (zero/negative error)
- Form submission success → redirect to events list

---

## ADM-02-02 · Edit Event

Modify existing event details.

**Acceptance Criteria**
- [ ] **ADM-02-02-AC-01** — All event fields editable except registeredCount
- [ ] **ADM-02-02-AC-02** — Event date can be changed (but warns if registrations exist)
- [ ] **ADM-02-02-AC-03** — Capacity cannot be reduced below current registeredCount
- [ ] **ADM-02-02-AC-04** — Changes saved to Firestore immediately
- [ ] **ADM-02-02-AC-05** — Confirmation toast/notification after save
- [ ] **ADM-02-02-AC-06** — Cancel button returns to events list without saving

**States to Verify**
- Edit form with pre-filled data
- Attempt to reduce capacity below registeredCount (error)
- Edit event with existing registrations (date change warning)
- Save success with confirmation

---

## ADM-02-03 · Delete Event

Remove events with safeguards.

**Acceptance Criteria**
- [ ] **ADM-02-03-AC-01** — Delete button shows confirmation dialog
- [ ] **ADM-02-03-AC-02** — Confirmation requires typing event name
- [ ] **ADM-02-03-AC-03** — Events with registrations cannot be deleted (only marked closed)
- [ ] **ADM-02-03-AC-04** — Deletion removes event from Firestore
- [ ] **ADM-02-03-AC-05** — Success message shown after deletion

**States to Verify**
- Delete confirmation dialog
- Type event name to confirm
- Attempt to delete event with registrations (blocked)
- Successful deletion → removed from list

---

## ADM-02-04 · Event List & Status Management

View all events and manage publication status.

**Acceptance Criteria**
- [ ] **ADM-02-04-AC-01** — Event list shows: name, date, capacity, registeredCount, status
- [ ] **ADM-02-04-AC-02** — Events sortable by date (default) or name
- [ ] **ADM-02-04-AC-03** — Filter by status: draft, published, closed
- [ ] **ADM-02-04-AC-04** — Publish button changes status from draft → published
- [ ] **ADM-02-04-AC-05** — Close button changes status from published → closed
- [ ] **ADM-02-04-AC-06** — Published events appear on public website (CAF-01)
- [ ] **ADM-02-04-AC-07** — Closed events hidden from public website

**States to Verify**
- Event list with mixed statuses
- Filter showing only draft events
- Publishing an event (status change)
- Closing an event with existing registrations

---

## User Flows

### Flow 1: Create New Event

1. Admin navigates to Events → Create Event
2. Admin fills form: name, date, capacity, fee, category, description
3. Admin uploads event poster (optional)
4. System validates all required fields
5. Admin clicks "Create Event"
6. Event created with status "draft"
7. Admin shown success message

### Flow 2: Publish Event

1. Admin views draft event in list
2. Admin clicks "Publish"
3. Confirmation dialog shown
4. Admin confirms
5. Event status changes to "published"
6. Event appears on public website

### Flow 3: Edit Event Capacity

1. Admin opens event with 50/100 registrations
2. Admin attempts to change capacity to 40
3. System shows error: "Capacity cannot be less than registered count (50)"
4. Admin must increase capacity or cancel registrations first

---

## Technical Notes

### Data Model

```
Collection: events
├── id: string (auto-generated)
├── name: string
├── description: string
├── eventDate: Timestamp
├── registrationFee: number
├── category: string ("running" | "biking" | "trail")
├── capacity: number
├── registeredCount: number (auto-managed, not editable)
├── posterUrl: string (URL to Storage, optional)
├── resultsPdfUrl: string (URL to Storage, optional)
├── status: "draft" | "published" | "closed"
├── createdBy: string (admin uid)
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

### Validation Rules

| Field | Validation |
|-------|------------|
| name | Required, min 3 chars |
| eventDate | Required, must be future |
| capacity | Required, integer > 0 |
| registrationFee | Required, number >= 0 |
| category | Required, enum value |
| description | Optional, max 2000 chars |

### Event Status Flow

```
┌─────────┐    publish     ┌───────────┐    close     ┌─────────┐
│  DRAFT  │ ─────────────→ │ PUBLISHED │ ───────────→ │ CLOSED  │
└─────────┘                └───────────┘              └─────────┘
     ↑                                                    │
     └────────────────────────────────────────────────────┘
                    (cannot reopen to published)
```

---

## User Stories

- As an **admin**, I can create events so that participants can register for races
- As an **admin**, I can edit event details so that I can fix errors or update information
- As an **admin**, I cannot reduce capacity below registered count so that existing registrations are protected
- As an **admin**, I can publish events so they appear on the public website
- As an **admin**, I can close events so no new registrations can be made
