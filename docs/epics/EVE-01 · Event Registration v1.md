# EVE-01 · Event Registration v1

**Status**: 🔵 Planning
**Module**: Events (Public)
**Epic Code**: EVE-01
**Last Updated**: 2026-03-09

---

## Summary

The event registration system allowing participants to browse event details, register with personal information, and upload payment receipts. Features capacity management via Firestore transactions to prevent overbooking.

**Target Users**: Event participants (runners, bikers)

## Goals

- Enable seamless event registration with form validation
- Prevent duplicate registrations (same email per event)
- Handle race capacity with transaction-based concurrency control
- Accept payment receipts (JPG, PNG, PDF up to 5MB)
- Provide clear status updates to participants

## Scope

**In Scope:**
- Event details page with capacity and available slots
- Registration form with validation
- Duplicate registration prevention
- Payment receipt upload
- Firestore transactions for capacity management
- Registration status tracking

**Out of Scope:**
- Online payment processing (future enhancement)
- QR check-in (future enhancement)
- Bib number generation (future enhancement)
- Refund processing

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Participant | View events, register, upload receipts, view own registration status |
| Admin | View all registrations, verify payments, manage capacity |

## Dependencies

**Upstream (requires):**
- CAF-01 — Cafe Landing Website (events listed, links to registration)

**Downstream (enables):**
- ADM-03 — Participant Management (registrations created here, managed there)
- NTF-01 — Email Notifications (emails triggered on registration/payment)

---

## EVE-01-01 · Event Details Page

Page displaying comprehensive event information with registration CTA.

**Acceptance Criteria**
- [ ] **EVE-01-01-AC-01** — Page displays event name, description, and event date
- [ ] **EVE-01-01-AC-02** — Registration fee is clearly shown
- [ ] **EVE-01-01-AC-03** — Event capacity and available slots displayed (capacity - registeredCount)
- [ ] **EVE-01-01-AC-04** — Event poster/image displayed (if available)
- [ ] **EVE-01-01-AC-05** — Register button disabled when capacity reached
- [ ] **EVE-01-01-AC-06** — "Slots Full" message shown when capacity reached

**States to Verify**
- Event with available slots (> 0 remaining)
- Event at capacity (0 remaining, button disabled)
- Event with poster image
- Event without poster image

---

## EVE-01-02 · Registration Form

Form for participants to register for an event.

**Acceptance Criteria**
- [ ] **EVE-01-02-AC-01** — Form validates required fields: fullName, email, phone, gender, age, emergencyContact
- [ ] **EVE-01-02-AC-02** — Email format is validated (valid email regex)
- [ ] **EVE-01-02-AC-03** — Phone number format is validated
- [ ] **EVE-01-02-AC-04** — Age is validated as positive number with reasonable range (10-100)
- [ ] **EVE-01-02-AC-05** — Duplicate registration prevented (same email cannot register twice for same event)
- [ ] **EVE-01-02-AC-06** — Registration only allowed if capacity available (checked via transaction)
- [ ] **EVE-01-02-AC-07** — Registration stored in Firestore with status: `pending_payment_verification`
- [ ] **EVE-01-02-AC-08** — Confirmation message shown after successful registration

**States to Verify**
- Form with all valid inputs
- Form with invalid email (error message)
- Form with duplicate email (error: "Already registered")
- Form submission when capacity just reached (error: "Event capacity reached")
- Success confirmation with next steps (payment instructions)

---

## EVE-01-03 · Payment Receipt Upload

Allow participants to upload proof of payment.

**Acceptance Criteria**
- [ ] **EVE-01-03-AC-01** — Accepted file formats: JPG, PNG, PDF
- [ ] **EVE-01-03-AC-02** — Maximum file size: 5MB
- [ ] **EVE-01-03-AC-03** — File validation shows error for invalid format or size
- [ ] **EVE-01-03-AC-04** — Receipt stored in Firebase Storage at path: `receipts/{eventId}/{registrationId}`
- [ ] **EVE-01-03-AC-05** — Registration status updated to `payment_submitted` after upload
- [ ] **EVE-01-03-AC-06** — Upload progress indicator shown during transfer
- [ ] **EVE-01-03-AC-07** — Success confirmation shown after upload complete

**States to Verify**
- Upload form with valid JPG/PDF
- File too large error (> 5MB)
- Invalid file format error (e.g., .exe)
- Upload in progress (progress bar)
- Upload success with status update confirmation

---

## User Flows

### Flow 1: Successful Registration

1. Participant views event details page
2. Participant clicks "Register" button
3. System checks capacity (available)
4. Participant fills registration form
5. System validates form (no duplicate email)
6. System runs transaction: increment registeredCount, create registration
7. Participant sees success message with payment instructions
8. Participant uploads payment receipt
9. System stores receipt, updates status to `payment_submitted`
10. Participant sees confirmation email (NTF-01)

### Flow 2: Capacity Reached During Registration

1. Participant opens event details (shows 1 slot available)
2. Participant fills registration form
3. Another participant registers simultaneously
4. First participant submits form
5. Transaction fails (capacity now full)
6. System shows error: "Registration closed. Event capacity reached."
7. Participant cannot complete registration

### Flow 3: Duplicate Registration Attempt

1. Participant tries to register with email already used for this event
2. System checks for existing registration with same email + eventId
3. System shows error: "You are already registered for this event."
4. Participant cannot submit duplicate

---

## Technical Notes

### Data Model

```
Collection: registrations
├── id: string (auto-generated)
├── eventId: string (reference to events collection)
├── fullName: string
├── email: string
├── phone: string
├── gender: string ("male" | "female" | "other")
├── age: number
├── emergencyContact: string
├── receiptUrl: string (URL to Storage, optional)
├── status: "pending_payment_verification" | "payment_submitted" | "payment_verified" | "rejected"
├── verifiedBy: string (admin uid, optional)
├── verifiedAt: Timestamp (optional)
└── createdAt: Timestamp
```

### Firestore Transaction (Capacity Management)

```typescript
await db.runTransaction(async (transaction) => {
  const eventDoc = await transaction.get(eventRef);
  const { capacity, registeredCount } = eventDoc.data();
  
  // Check for duplicate
  const existingQuery = await transaction.get(
    db.collection('registrations')
      .where('eventId', '==', eventId)
      .where('email', '==', email)
  );
  
  if (!existingQuery.empty) {
    throw new Error('Duplicate registration');
  }
  
  // Check capacity
  if (registeredCount >= capacity) {
    throw new Error('Event capacity reached');
  }
  
  // Increment count and create registration
  transaction.update(eventRef, { 
    registeredCount: registeredCount + 1 
  });
  transaction.set(registrationRef, registrationData);
});
```

### Storage Structure

```
receipts/
├── {eventId}/
│   ├── {registrationId}-receipt.jpg
│   └── {registrationId}-receipt.pdf
```

### Indexes Required

| Collection | Fields | ID |
|------------|--------|-----|
| registrations | `eventId` + `status` | IDX-REG-101 |
| registrations | `eventId` + `createdAt` | IDX-REG-102 |
| events | `eventDate` + `category` | IDX-EVE-101 |

---

## User Stories

- As a **participant**, I can view event details so that I know the date, fee, and available slots
- As a **participant**, I can register for an event so that I secure my spot
- As a **participant**, I cannot register twice with the same email so that duplicate entries are prevented
- As a **participant**, I can upload my payment receipt so that my registration can be verified
- As a **participant**, I receive confirmation when my payment is verified so that I know I'm officially registered
