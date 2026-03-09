# ADM-03 · Participant Management v1

**Status**: 🔵 Planning
**Module**: Admin
**Epic Code**: ADM-03
**Last Updated**: 2026-03-09

---

## Summary

Comprehensive participant management interface for admins. View all registrations, filter by status, preview payment receipts, verify or reject payments, and export participant data to CSV or Excel.

**Target Users**: Cafe administrators

## Goals

- Provide complete visibility into all event registrations
- Enable efficient payment verification workflow
- Support filtering and searching participants
- Allow data export for external use

## Scope

**In Scope:**
- Registration list with participant details
- Status filtering (pending, verified, rejected)
- Payment receipt preview
- Manual payment verification (approve/reject)
- Participant export (CSV, Excel)
- Recording of verification metadata (who, when)

**Out of Scope:**
- Automated payment verification (no payment gateway)
- Bulk status updates
- Participant communication tools
- Refund processing

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Admin | View, filter, verify, reject, export all registrations |
| Super Admin | Same as admin |

## Dependencies

**Upstream (requires):**
- ADM-01 — Admin Authentication (login required)
- ADM-02 — Event Management (registrations tied to events)
- EVE-01 — Event Registration (registrations created by participants)

**Downstream (enables):**
- NTF-01 — Email Notifications (emails sent on verification)

---

## ADM-03-01 · Registration List

View all registrations with filtering.

**Acceptance Criteria**
- [ ] **ADM-03-01-AC-01** — List displays: participant name, email, phone, event name, status
- [ ] **ADM-03-01-AC-02** — Clicking row opens registration detail drawer/modal
- [ ] **ADM-03-01-AC-03** — Filter by status: all, pending_payment_verification, payment_submitted, payment_verified, rejected
- [ ] **ADM-03-01-AC-04** — Filter by event (dropdown of all events)
- [ ] **ADM-03-01-AC-05** — Search by participant name or email
- [ ] **ADM-03-01-AC-06** — Sort by registration date (newest first by default)
- [ ] **ADM-03-01-AC-07** — Pagination for large lists (50 per page)

**States to Verify**
- Full registration list with mixed statuses
- Filtered to show only "payment_submitted"
- Filtered by specific event
- Search results for email query
- Empty state when no registrations match filters

---

## ADM-03-02 · Registration Detail View

Detailed view of single registration.

**Acceptance Criteria**
- [ ] **ADM-03-02-AC-01** — Detail view shows all registration fields:
  - Full name, email, phone, gender, age
  - Emergency contact
  - Event name and date
  - Registration date
  - Current status
- [ ] **ADM-03-02-AC-02** — Receipt preview shown if payment_submitted or verified
- [ ] **ADM-03-02-AC-03** — Receipt clickable to open full-size in new tab
- [ ] **ADM-03-02-AC-04** — Verification history shown (verifiedBy, verifiedAt if applicable)
- [ ] **ADM-03-02-AC-05** — Close button returns to list

**States to Verify**
- Detail view with all fields populated
- Detail view with receipt preview (thumbnail)
- Detail view for verified registration (shows verifier info)
- Detail view for rejected registration (shows rejection reason)

---

## ADM-03-03 · Payment Verification

Manual verification of payment receipts.

**Acceptance Criteria**
- [ ] **ADM-03-03-AC-01** — "Verify Payment" button visible for payment_submitted status
- [ ] **ADM-03-03-AC-02** — Clicking verify shows confirmation dialog
- [ ] **ADM-03-03-AC-03** — On confirm: status updated to payment_verified
- [ ] **ADM-03-03-AC-04** — System records verifiedBy (admin uid) and verifiedAt (timestamp)
- [ ] **ADM-03-03-AC-05** — "Reject Payment" button visible for payment_submitted status
- [ ] **ADM-03-03-AC-06** — Reject requires reason text (min 10 chars)
- [ ] **ADM-03-03-AC-07** — On reject: status updated to rejected
- [ ] **ADM-03-03-AC-08** — Rejection reason stored in registration document
- [ ] **ADM-03-03-AC-09** — Email notification triggered on verify/reject (NTF-01)

**States to Verify**
- Registration with payment_submitted status (verify/reject buttons visible)
- Verify confirmation dialog
- After verify: status changed, verifier recorded
- Reject dialog with reason input
- After reject: status changed, reason recorded

---

## ADM-03-04 · Participant Export

Export participant data to CSV or Excel.

**Acceptance Criteria**
- [ ] **ADM-03-04-AC-01** — Export button available on registration list
- [ ] **ADM-03-04-AC-02** — Export respects current filters (event, status)
- [ ] **ADM-03-04-AC-03** — Export format options: CSV, Excel (.xlsx)
- [ ] **ADM-03-04-AC-04** — Export fields: name, email, phone, age, gender, event, status
- [ ] **ADM-03-04-AC-05** — "Export All" option exports all registrations
- [ ] **ADM-03-04-AC-06** — "Export Verified Only" option filters to payment_verified
- [ ] **ADM-03-04-AC-07** — Filename includes event name and date: `{event}-participants-YYYY-MM-DD.{ext}`

**States to Verify**
- Export dialog with format selection
- Export with filters applied (e.g., specific event + verified only)
- Export all participants
- Downloaded file opens correctly with all fields

---

## User Flows

### Flow 1: Verify Payment

1. Admin navigates to Participants page
2. Admin filters by "payment_submitted" status
3. Admin clicks on registration to open detail
4. Admin reviews receipt image
5. Admin clicks "Verify Payment"
6. Confirmation dialog shown
7. Admin confirms
8. System updates status to payment_verified
9. System records verifiedBy and verifiedAt
10. Email notification sent to participant (NTF-01)

### Flow 2: Reject Payment

1. Admin opens registration with payment_submitted
2. Admin reviews receipt (unclear/insufficient)
3. Admin clicks "Reject Payment"
4. Dialog prompts for rejection reason
5. Admin enters: "Receipt unclear, please re-upload clearer image"
6. Admin confirms rejection
7. System updates status to rejected
8. System stores rejectionReason
9. Email notification sent to participant with reason (NTF-01)

### Flow 3: Export Event Participants

1. Admin filters participants by specific event
2. Admin clicks "Export"
3. Admin selects format: Excel
4. Admin selects scope: Verified Only
5. System generates file: `city-run-2025-participants-2025-03-09.xlsx`
6. File downloads with all verified participants for that event

---

## Technical Notes

### Data Model (Registration)

```
Collection: registrations
├── id: string
├── eventId: string (reference)
├── eventName: string (denormalized for display)
├── fullName: string
├── email: string
├── phone: string
├── gender: string
├── age: number
├── emergencyContact: string
├── receiptUrl: string (optional)
├── status: "pending_payment_verification" | "payment_submitted" | "payment_verified" | "rejected"
├── verifiedBy: string (admin uid, optional)
├── verifiedByName: string (denormalized, optional)
├── verifiedAt: Timestamp (optional)
├── rejectionReason: string (optional)
└── createdAt: Timestamp
```

### Status Workflow

```
┌─────────────────────────────┐
│  pending_payment_verification │ ← Initial state (registration created)
└─────────────┬───────────────┘
              │ participant uploads receipt
              ▼
┌─────────────────────────────┐
│      payment_submitted      │ ← Awaiting admin verification
└─────────────┬───────────────┘
              │
      ┌───────┴───────┐
      ▼               ▼
┌─────────────┐  ┌─────────────┐
│   verified  │  │   rejected  │
│  (approved) │  │  (rejected) │
└─────────────┘  └──────┬──────┘
                        │
                        └─→ Can re-upload → payment_submitted
```

### Export CSV Format

```csv
Name,Email,Phone,Age,Gender,Emergency Contact,Event,Status,Registration Date
John Doe,john@example.com,09123456789,25,Male,Jane Doe 09187654321,City Run 2025,payment_verified,2025-03-01
```

---

## User Stories

- As an **admin**, I can view all registrations so that I know who is participating in each event
- As an **admin**, I can filter by status so that I can focus on pending verifications
- As an **admin**, I can preview receipts so that I can verify payments without downloading
- As an **admin**, I can verify payments so that participants are confirmed for the event
- As an **admin**, I can reject payments with a reason so that participants know what to fix
- As an **admin**, I can export participants so that I have records for race day
