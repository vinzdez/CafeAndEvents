# CAF-01 · Cafe Landing Website v1

**Status**: 🔵 Planning
**Module**: Cafe (Public)
**Epic Code**: CAF-01
**Last Updated**: 2026-03-09

---

## Summary

The public-facing cafe website serving as the primary entry point for visitors. Features a landing page with hero branding, photo gallery, and upcoming events showcase. Optimized for mobile-first experience with fast load times and SEO-friendly structure.

**Target Users**: Cafe visitors, prospective event participants

## Goals

- Give visitors immediate understanding of cafe offerings
- Showcase cafe atmosphere through optimized photo gallery
- Display upcoming running/biking events to drive registrations
- Achieve Lighthouse performance score > 90
- Load in under 2 seconds on mobile 3G

## Scope

**In Scope:**
- Landing page with hero section and cafe branding
- Cafe description and contact information
- Photo gallery with lazy loading
- Upcoming events section (sorted by date, future events only)
- Mobile responsive design
- SEO optimization (meta tags, OpenGraph)
- Footer with contact info

**Out of Scope:**
- Event registration (see EVE-01)
- Online payment processing
- Blog or content management system
- Multi-language support
- User accounts for visitors

## Users & Roles

| Role | Capabilities |
|------|-------------|
| Visitor | Browse landing page, view gallery, see upcoming events |
| Admin | Configure cafe info, upload gallery images, manage events |

## Dependencies

**Upstream (requires):**
- None — this is the foundation epic

**Downstream (enables):**
- EVE-01 — Event Registration (events listed on landing page link to registration)

---

## CAF-01-01 · Landing Page

Hero section and cafe introduction with branding.

**Acceptance Criteria**
- [ ] **CAF-01-01-AC-01** — Landing page loads in under 2 seconds on mobile 3G
- [ ] **CAF-01-01-AC-02** — Hero section displays cafe name, tagline, and branding
- [ ] **CAF-01-01-AC-03** — Page includes cafe description and what the cafe offers
- [ ] **CAF-01-01-AC-04** — Contact info (address, phone, email, hours) visible in footer
- [ ] **CAF-01-01-AC-05** — Page is fully responsive (mobile, tablet, desktop)
- [ ] **CAF-01-01-AC-06** — SEO meta tags present (title, description, OpenGraph)

**States to Verify**
- Landing page on mobile (375px) with stacked hero layout
- Landing page on desktop (1440px) with hero section and CTAs
- Page load time under 2 seconds (Lighthouse)
- Footer with complete contact information

---

## CAF-01-02 · Cafe Gallery

Photo gallery showcasing cafe atmosphere and facilities.

**Acceptance Criteria**
- [ ] **CAF-01-02-AC-01** — Gallery page displays cafe photos in a grid layout
- [ ] **CAF-01-02-AC-02** — Images are optimized for web (WebP with JPEG fallback)
- [ ] **CAF-01-02-AC-03** — Images lazy load as user scrolls
- [ ] **CAF-01-02-AC-04** — Mobile-friendly layout with appropriate touch targets
- [ ] **CAF-01-02-AC-05** — Clicking image opens lightbox/preview modal

**States to Verify**
- Gallery grid on desktop (3-4 columns)
- Gallery grid on mobile (1-2 columns)
- Lazy loading in action (images load as scrolled into view)
- Lightbox modal with navigation arrows

---

## CAF-01-03 · Upcoming Events Section

Display of upcoming running/biking events on the landing page.

**Acceptance Criteria**
- [ ] **CAF-01-03-AC-01** — Events sorted by event date (ascending)
- [ ] **CAF-01-03-AC-02** — Only future events displayed (eventDate >= today)
- [ ] **CAF-01-03-AC-03** — Event card shows: name, date, category, registration fee
- [ ] **CAF-01-03-AC-04** — "View Details" button links to event details page (EVE-01)
- [ ] **CAF-01-03-AC-05** — Empty state shown when no upcoming events
- [ ] **CAF-01-03-AC-06** — Events loaded from Firestore in real-time

**States to Verify**
- List of 3+ upcoming events with cards
- Single upcoming event (edge case)
- No upcoming events (empty state with friendly message)
- Event card hover/focus state

---

## User Flows

### Flow 1: Visitor Browses Cafe Website

1. Visitor navigates to cafe website
2. Hero section loads with cafe branding
3. Visitor scrolls to see cafe description
4. Visitor views gallery section
5. Visitor sees upcoming events
6. Visitor clicks event to view details (links to EVE-01)

### Flow 2: Visitor on Mobile

1. Visitor opens site on mobile device
2. Page loads quickly (< 2 seconds)
3. Hero section stacks vertically
4. Gallery shows 1-2 column grid
5. Events section shows compact cards
6. Footer contact info is tap-friendly

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
├── registeredCount: number
├── posterUrl: string (URL to Storage)
├── resultsPdfUrl: string (URL to Storage, optional)
├── status: "draft" | "published" | "closed"
└── createdAt: Timestamp
```

### Image Optimization

- **Format**: WebP with JPEG fallback
- **Sizing**: Multiple sizes for responsive images
- **Lazy Loading**: Native browser lazy loading + intersection observer
- **Storage**: Firebase Storage with CDN

### SEO Requirements

```html
<title>Cafe Name | Running & Biking Events</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
```

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Lighthouse Performance | > 90 |

---

## User Stories

- As a **visitor**, I can see the cafe's hero section so that I understand the cafe's brand and offerings
- As a **visitor**, I can view cafe photos so that I know what the cafe looks like before visiting
- As a **visitor**, I can see upcoming events so that I know what races I can register for
- As a **visitor**, I can find contact information so that I can visit or call the cafe
- As an **admin**, I can upload gallery images so that visitors see current cafe photos
