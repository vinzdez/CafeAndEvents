# CODE · Feature Name v1

**Status**: 🔵 Planning
**Module**: Module Name
**Epic Code**: CODE
**Last Updated**: YYYY-MM-DD

---

## Summary

_2-3 sentences describing what this epic delivers and why it matters._

**Target Users**: _Who will use this feature (e.g., visitors, admins)_

## Goals

- _Goal 1: What outcome this feature achieves_
- _Goal 2: Another measurable outcome_

## Scope

**In Scope:**
- _Feature aspect 1_
- _Feature aspect 2_

**Out of Scope:**
- _Explicitly excluded item 1_
- _Explicitly excluded item 2_

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Visitor | _Browse, register for events_ |
| Admin | _Full CRUD, configuration_ |

## Dependencies

**Upstream (requires):**
- _EPIC-A_ - What it provides to this epic

**Downstream (enables):**
- _EPIC-B_ - What this epic provides to others

---

## CODE-01 · First Milestone

_Brief description of what this milestone delivers._

**Acceptance Criteria**
- [ ] **CODE-01-AC-01** - _Specific, testable requirement_
- [ ] **CODE-01-AC-02** - _Another specific requirement_
- [ ] **CODE-01-AC-03** - _Edge case or error handling requirement_

**States to Verify**
- _State 1: What the system should look like when this works_
- _State 2: Error state or edge case to test_

---

## CODE-02 · Second Milestone

_Brief description of what this milestone delivers._

**Acceptance Criteria**
- [ ] **CODE-02-AC-01** - _Specific, testable requirement_
- [ ] **CODE-02-AC-02** - _Another specific requirement_

---

## User Flows

### Flow 1: _Primary Happy Path_

1. User navigates to _page_
2. User clicks _action_
3. System validates _input_
4. System creates _record_
5. User sees _confirmation_

### Flow 2: _Error Path_

1. User attempts _invalid action_
2. System shows _specific error message_
3. User can _recover by doing X_

---

## Technical Notes

### Data Model

```
Collection: collectionName
├── id: string (auto-generated)
├── name: string
├── createdBy: string (uid)
├── createdAt: Timestamp
└── status: "active" | "archived"
```

### Integration Points

- **Upstream**: _Service A provides X_
- **Downstream**: _This feature emits events consumed by Y_
- **External**: _Third-party API Z (if applicable)_

---

## User Stories

- As a **visitor**, I can _action_ so that _benefit_
- As an **admin**, I can _action_ so that _benefit_
