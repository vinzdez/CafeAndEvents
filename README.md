# Cafe + Event Platform

A serverless cafe website and running/biking event registration system.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Firebase](https://img.shields.io/badge/Firebase-orange)

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Local Development

```bash
# Install dependencies
npm install

# Start Next.js dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
cafe-event-platform/
├── app/                     # Next.js application
│   ├── (public)/           # Public routes (landing, events, gallery)
│   ├── (admin)/            # Admin dashboard routes
│   └── lib/                # Utilities, hooks, services
├── functions/              # Firebase Cloud Functions
├── firestore/              # Firestore indexes and rules
└── docs/                   # Project documentation
```

---

## Features

### Public Website
- Landing page with cafe branding
- Photo gallery (lazy loaded)
- Upcoming events showcase
- Event details with available slots
- Registration form with validation
- Payment receipt upload (JPG, PNG, PDF)

### Admin Dashboard
- Secure login (Firebase Auth)
- Event CRUD (create, edit, delete)
- Participant management
- Payment verification (approve/reject)
- Export participants (CSV, Excel)
- Upload race results PDFs

### System
- Email notifications (Resend)
- Firestore transactions for capacity management
- SEO optimized (Next.js SSR)
- Mobile responsive

---

## Hosting

Deploys to Firebase Hosting.

```bash
firebase login
firebase deploy
```

---

## Documentation

- [CLAUDE.md](CLAUDE.md) — Comprehensive developer guide
- [docs/epics/](docs/epics/) — Feature requirements
- [docs/adrs/](docs/adrs/) — Architecture decisions

---

## License

Proprietary — Vince 2026
