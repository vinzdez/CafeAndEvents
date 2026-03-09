# NTF-01 · Email Notifications v1

**Status**: 🔵 Planning
**Module**: System
**Epic Code**: NTF-01
**Last Updated**: 2026-03-09

---

## Summary

Automated email notification system triggered by Cloud Functions. Sends emails to participants at key stages: registration confirmation, payment verification, and payment rejection. Uses Resend API for reliable delivery.

**Target Users**: Event participants (email recipients)

## Goals

- Send immediate email confirmation upon registration
- Notify participants when payment is verified or rejected
- Provide clear payment instructions in registration email
- Ensure reliable email delivery with error handling

## Scope

**In Scope:**
- Registration submitted email (with payment instructions)
- Payment verified email (confirmation)
- Payment rejected email (with reason, retry instructions)
- Email templates with cafe branding
- Resend API integration

**Out of Scope:**
- SMS notifications (future enhancement)
- Marketing/promotional emails
- Email preference management
- Email open/click tracking

## Users & Roles

| Role | Capabilities |
|------|-------------|
| System | Automatically sends emails based on triggers |
| Admin | Indirectly triggers emails via verification actions |

## Dependencies

**Upstream (requires):**
- EVE-01 — Event Registration (triggers registration email)
- ADM-03 — Participant Management (triggers verify/reject emails)

**Downstream (enables):**
- None — this is a supporting system feature

---

## NTF-01-01 · Registration Submitted Email

Email sent immediately after registration is created.

**Acceptance Criteria**
- [ ] **NTF-01-01-AC-01** — Email triggered by Cloud Function on registration creation
- [ ] **NTF-01-01-AC-02** — Recipient: registration email address
- [ ] **NTF-01-01-AC-03** — Subject: "Registration Received: {eventName}"
- [ ] **NTF-01-01-AC-04** — Email includes: event name, event date, registration details
- [ ] **NTF-01-01-AC-05** — Email includes payment instructions (amount, payment method)
- [ ] **NTF-01-01-AC-06** — Email includes link to upload receipt
- [ ] **NTF-01-01-AC-07** — Cafe branding (logo, colors) in email template
- [ ] **NTF-01-01-AC-08** — Email sent via Resend API with error logging

**Email Content**
```
Subject: Registration Received: City Run 2025

Hi {fullName},

Thank you for registering for City Run 2025!

Event Details:
- Event: City Run 2025
- Date: March 15, 2025
- Registration Fee: ₱500

Your Registration:
- Name: {fullName}
- Email: {email}
- Status: Pending Payment Verification

Payment Instructions:
Please pay ₱500 via:
- Bank Transfer: BDO 1234-5678-9012
- GCash: 09123456789

Upload your receipt here:
{receiptUploadLink}

Questions? Reply to this email or call us at (02) 8123-4567.

---
Cafe Name
Running & Biking Events
```

---

## NTF-01-02 · Payment Verified Email

Email sent when admin verifies payment.

**Acceptance Criteria**
- [ ] **NTF-01-02-AC-01** — Email triggered by Cloud Function on status change to payment_verified
- [ ] **NTF-01-02-AC-02** — Recipient: registration email address
- [ ] **NTF-01-02-AC-03** — Subject: "Payment Verified: You're Officially Registered for {eventName}"
- [ ] **NTF-01-02-AC-04** — Email includes: event name, event date, confirmed status
- [ ] **NTF-01-02-AC-05** — Email includes race day instructions (check-in time, location)
- [ ] **NTF-01-02-AC-06** — Email includes link to event page for reference
- [ ] **NTF-01-02-AC-07** — Cafe branding in email template
- [ ] **NTF-01-02-AC-08** — Email sent via Resend API with error logging

**Email Content**
```
Subject: Payment Verified: You're Officially Registered for City Run 2025

Hi {fullName},

Great news! Your payment has been verified and you are officially registered for City Run 2025.

Event Details:
- Event: City Run 2025
- Date: March 15, 2025
- Check-in: 5:00 AM at Cafe Entrance
- Race Start: 6:00 AM

What to Bring:
- Valid ID
- Confirmation email (printed or on phone)

See you at the starting line!

---
Cafe Name
Running & Biking Events
```

---

## NTF-01-03 · Payment Rejected Email

Email sent when admin rejects payment.

**Acceptance Criteria**
- [ ] **NTF-01-03-AC-01** — Email triggered by Cloud Function on status change to rejected
- [ ] **NTF-01-03-AC-02** — Recipient: registration email address
- [ ] **NTF-01-03-AC-03** — Subject: "Action Required: Payment Issue for {eventName}"
- [ ] **NTF-01-03-AC-04** — Email includes rejection reason from admin
- [ ] **NTF-01-03-AC-05** — Email includes instructions to re-upload corrected receipt
- [ ] **NTF-01-03-AC-06** — Email includes link to upload new receipt
- [ ] **NTF-01-03-AC-07** — Email includes deadline for re-submission (if applicable)
- [ ] **NTF-01-03-AC-08** — Cafe branding in email template
- [ ] **NTF-01-03-AC-09** — Email sent via Resend API with error logging

**Email Content**
```
Subject: Action Required: Payment Issue for City Run 2025

Hi {fullName},

We encountered an issue with your payment receipt for City Run 2025.

Reason: {rejectionReason}

Please upload a new receipt here:
{receiptUploadLink}

Deadline: March 10, 2025

If you have questions, reply to this email or call us at (02) 8123-4567.

---
Cafe Name
Running & Biking Events
```

---

## NTF-01-04 · Email Delivery & Error Handling

Reliable email delivery with monitoring.

**Acceptance Criteria**
- [ ] **NTF-01-04-AC-01** — All emails logged to Firestore (collection: emailLogs)
- [ ] **NTF-01-04-AC-02** — Log includes: recipient, subject, status, timestamp, error (if any)
- [ ] **NTF-01-04-AC-03** — Failed emails queued for retry (max 3 attempts)
- [ ] **NTF-01-04-AC-04** — Permanent failures logged for manual review
- [ ] **NTF-01-04-AC-05** — Resend API key stored in Firebase Config (not in code)

**States to Verify**
- Successful email delivery (log shows status: delivered)
- Failed email delivery (log shows status: failed, error message)
- Retry attempt (log shows status: retrying)

---

## User Flows

### Flow 1: Registration → Confirmation Email

1. Participant submits registration form
2. Cloud Function `onRegistrationCreated` triggers
3. Function calls `sendRegistrationEmail(registrationId)`
4. Email template rendered with event and registration data
5. Resend API sends email
6. Email logged to emailLogs collection
7. Participant receives email with payment instructions

### Flow 2: Admin Verifies → Confirmation Email

1. Admin clicks "Verify Payment" in admin dashboard
2. Cloud Function `updateRegistrationStatus` executes
3. Function detects status change to payment_verified
4. Function calls `sendPaymentVerifiedEmail(registrationId)`
5. Email sent with race day details
6. Participant receives confirmation

### Flow 3: Admin Rejects → Retry Email

1. Admin clicks "Reject Payment" with reason
2. Cloud Function `updateRegistrationStatus` executes
3. Function detects status change to rejected
4. Function calls `sendPaymentRejectedEmail(registrationId, reason)`
5. Email sent with rejection reason and re-upload link
6. Participant receives email and uploads new receipt

---

## Technical Notes

### Data Model

```
Collection: emailLogs
├── id: string (auto-generated)
├── registrationId: string
├── eventId: string
├── recipientEmail: string
├── emailType: "registration" | "payment_verified" | "payment_rejected"
├── subject: string
├── status: "pending" | "sent" | "delivered" | "failed" | "bounced"
├── errorMessage: string (optional)
├── retryCount: number
└── createdAt: Timestamp
```

### Cloud Functions

```typescript
// Trigger on registration creation
export const onRegistrationCreated = onDocumentCreated(
  'registrations/{registrationId}',
  async (event) => {
    const registration = event.data.data();
    await sendRegistrationEmail(event.params.registrationId, registration);
  }
);

// Trigger on registration update
export const onRegistrationUpdated = onDocumentUpdated(
  'registrations/{registrationId}',
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    
    if (before.status !== after.status) {
      if (after.status === 'payment_verified') {
        await sendPaymentVerifiedEmail(event.params.registrationId, after);
      } else if (after.status === 'rejected') {
        await sendPaymentRejectedEmail(event.params.registrationId, after);
      }
    }
  }
);
```

### Resend API Integration

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cafe Events <events@cafe.com>',
      to,
      subject,
      html,
    });
    
    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }
    
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('Email exception:', err);
    return { success: false, error: err };
  }
}
```

### Environment Variables

| Variable | Source | Description |
|----------|--------|-------------|
| RESEND_API_KEY | Firebase Config | Resend API key |
| FROM_EMAIL | Firebase Config | Sender email address |

---

## User Stories

- As a **participant**, I receive an email after registering so that I know my registration was received
- As a **participant**, I receive payment instructions via email so that I know how to pay
- As a **participant**, I receive confirmation when my payment is verified so that I know I'm officially registered
- As a **participant**, I receive clear instructions if my payment is rejected so that I can fix the issue
