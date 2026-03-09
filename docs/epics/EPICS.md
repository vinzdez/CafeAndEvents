# Master Epics Tracker

**Project**: Cafe + Event Platform  
**Last Updated**: 2026-03-09

---

## Summary

| Module | Epics | Total ACs | Complete | Progress |
|--------|-------|-----------|----------|----------|
| CAF (Cafe) | 1 | 6 | 0 | 0% |
| EVE (Events) | 1 | 8 | 0 | 0% |
| ADM (Admin) | 4 | 22 | 0 | 0% |
| NTF (Notifications) | 1 | 5 | 0 | 0% |
| **Total** | **7** | **41** | **0** | **0%** |

---

## Epics

### CAF — Cafe Website

| Epic | Name | Status | ACs | Done | Progress |
|------|------|--------|-----|------|----------|
| [CAF-01](./CAF-01%20·%20Cafe%20Landing%20Website%20v1.md) | Cafe Landing Website | 🔵 Planning | 6 | 0 | 0% |

### EVE — Event Registration

| Epic | Name | Status | ACs | Done | Progress |
|------|------|--------|-----|------|----------|
| [EVE-01](./EVE-01%20·%20Event%20Registration%20v1.md) | Event Registration | 🔵 Planning | 8 | 0 | 0% |

### ADM — Admin Dashboard

| Epic | Name | Status | ACs | Done | Progress |
|------|------|--------|-----|------|----------|
| [ADM-01](./ADM-01%20·%20Admin%20Authentication%20v1.md) | Admin Authentication | 🔵 Planning | 4 | 0 | 0% |
| [ADM-02](./ADM-02%20·%20Event%20Management%20v1.md) | Event Management | 🔵 Planning | 5 | 0 | 0% |
| [ADM-03](./ADM-03%20·%20Participant%20Management%20v1.md) | Participant Management | 🔵 Planning | 8 | 0 | 0% |
| [ADM-04](./ADM-04%20·%20Results%20Upload%20v1.md) | Results Upload | 🔵 Planning | 5 | 0 | 0% |

### NTF — Notifications

| Epic | Name | Status | ACs | Done | Progress |
|------|------|--------|-----|------|----------|
| [NTF-01](./NTF-01%20·%20Email%20Notifications%20v1.md) | Email Notifications | 🔵 Planning | 5 | 0 | 0% |

---

## Implementation Status

### Current Sprint

| Epic | Phase | Status | Branch |
|------|-------|--------|--------|
| — | — | — | — |

### Recently Completed

| Epic | Phase | Merged |
|------|-------|--------|
| — | — | — |

---

## Dependency Graph

```
ADM-01 (Admin Auth)
    ↓
ADM-02 (Event Management) → ADM-03 (Participant Management)
                                ↓
ADM-04 (Results Upload)

CAF-01 (Cafe Website)
    ↓
EVE-01 (Event Registration)
    ↓
NTF-01 (Email Notifications)
```

---

## Legend

| Icon | Status |
|------|--------|
| 🔵 | Planning |
| 🟡 | In Progress |
| 🟢 | Complete |
| ⚪ | On Hold |
