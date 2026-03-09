# ADM-04 · Results Upload v1

**Status**: 🔵 Planning
**Module**: Admin
**Epic Code**: ADM-04
**Last Updated**: 2026-03-09

---

## Summary

Admin interface for uploading race results as PDF files. Participants can download results from the event page after the race. Supports PDF files up to 20MB.

**Target Users**: Cafe administrators

## Goals

- Enable admins to upload race results PDFs
- Allow participants to download results from event pages
- Support large PDF files (up to 20MB)
- Track which events have results available

## Scope

**In Scope:**
- PDF upload interface for admins
- PDF file validation (format, size)
- Storage in Firebase Storage
- Results download for participants
- Replace/delete existing results

**Out of Scope:**
- Individual result lookup by bib number
- Results search/filter
- Automated results processing
- Results analytics/charts

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Admin | Upload, replace, delete results PDFs |
| Participant | Download results for events they registered for |

## Dependencies

**Upstream (requires):**
- ADM-01 — Admin Authentication (login required)
- ADM-02 — Event Management (results tied to events)

**Downstream (enables):**
- None — this is a leaf feature

---

## ADM-04-01 · Results Upload

Upload race results PDF for an event.

**Acceptance Criteria**
- [ ] **ADM-04-01-AC-01** — Upload available from event detail page
- [ ] **ADM-04-01-AC-02** — Accepted file format: PDF only
- [ ] **ADM-04-01-AC-03** — Maximum file size: 20MB
- [ ] **ADM-04-01-AC-04** — File validation shows error for invalid format or size
- [ ] **ADM-04-01-AC-05** — Upload progress indicator shown during transfer
- [ ] **ADM-04-01-AC-06** — File stored in Firebase Storage at: `results/{eventId}/results.pdf`
- [ ] **ADM-04-01-AC-07** — Event document updated with resultsPdfUrl
- [ ] **ADM-04-01-AC-08** — Success confirmation shown after upload

**States to Verify**
- Upload dialog with file picker
- Valid PDF selected (ready to upload)
- Invalid file type error (e.g., .jpg)
- File too large error (> 20MB)
- Upload progress (0-100%)
- Upload success with confirmation

---

## ADM-04-02 · Results Management

Replace or remove existing results.

**Acceptance Criteria**
- [ ] **ADM-04-02-AC-01** — Replace button visible when results already uploaded
- [ ] **ADM-04-02-AC-02** — Replace requires confirmation (warns it will overwrite)
- [ ] **ADM-04-02-AC-03** — New file replaces existing in Storage
- [ ] **ADM-04-02-AC-04** — Delete button removes results from event
- [ ] **ADM-04-02-AC-05** — Delete requires confirmation
- [ ] **ADM-04-02-AC-06** — Deletion removes file from Storage and clears resultsPdfUrl

**States to Verify**
- Event with existing results (replace/delete visible)
- Replace confirmation dialog
- Delete confirmation dialog
- Success states for both actions

---

## ADM-04-03 · Results Download (Public)

Participants download results from event page.

**Acceptance Criteria**
- [ ] **ADM-04-03-AC-01** — "Download Results" button shown on event page if resultsPdfUrl exists
- [ ] **ADM-04-03-AC-02** — Button hidden if no results uploaded
- [ ] **ADM-04-03-AC-03** — Clicking button downloads PDF file
- [ ] **ADM-04-03-AC-04** — Download uses public Storage URL or signed URL
- [ ] **ADM-04-03-AC-05** — Filename on download: `{event-name}-results.pdf`

**States to Verify**
- Event page with results available (button visible)
- Event page without results (no button)
- Download initiated (browser download)

---

## User Flows

### Flow 1: Upload Results

1. Admin navigates to Events → Event Detail
2. Admin clicks "Upload Results"
3. File picker opens
4. Admin selects PDF file (e.g., city-run-results.pdf)
5. System validates file type and size
6. Upload progress shown
7. File stored in Storage
8. Event document updated with resultsPdfUrl
9. Admin sees success message

### Flow 2: Participant Downloads Results

1. Participant visits event page
2. Participant sees "Download Results" button
3. Participant clicks button
4. PDF downloads with filename `{event-name}-results.pdf`
5. Participant opens PDF to view rankings

### Flow 3: Replace Results (Correction)

1. Admin discovers error in uploaded results
2. Admin opens event detail
3. Admin clicks "Replace Results"
4. Confirmation dialog warns of overwrite
5. Admin confirms and selects corrected PDF
6. New file replaces old in Storage
7. Event document updated with new URL

---

## Technical Notes

### Data Model

```
Collection: events
├── id: string
├── name: string
├── ...
├── resultsPdfUrl: string (optional, URL to Storage)
└── resultsUploadedAt: Timestamp (optional)
```

### Storage Structure

```
results/
├── {eventId}/
│   └── results.pdf
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Results — admin write, public read
    match /results/{eventId}/results.pdf {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    function isAdmin() {
      return request.auth != null && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ["admin", "superAdmin"];
    }
  }
}
```

### File Validation

| Check | Rule |
|-------|------|
| Format | File extension === '.pdf' AND MIME type === 'application/pdf' |
| Size | File size <= 20MB (20,971,520 bytes) |

---

## User Stories

- As an **admin**, I can upload race results so that participants can download them
- As an **admin**, I can replace results if I need to correct errors
- As an **admin**, I can remove results if they were uploaded by mistake
- As a **participant**, I can download event results so that I can see my ranking and times
