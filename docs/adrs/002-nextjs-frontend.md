# ADR-002: Next.js for Frontend

**Status**: Accepted

**Date**: 2026-03-09

---

## Context

The Cafe + Event Platform needs a public-facing website that:
- Serves as a landing page for the cafe
- Lists upcoming events with good SEO
- Provides event registration functionality
- Must load quickly and be mobile-responsive

SEO is critical because the cafe wants to attract organic traffic for "running events [city]" searches.

## Decision

Use **Next.js 15** (App Router) for the frontend framework.

Key features utilized:
- **Server-Side Rendering (SSR)** for SEO optimization
- **Static Site Generation (SSG)** for fast landing pages
- **Image Optimization** for gallery performance
- **API Routes** for backend-less form handling
- **Vercel-style deployment** on Firebase Hosting

## Consequences

### Positive

- **SEO-friendly**: SSR enables proper meta tags, OpenGraph, and search engine indexing
- **Performance**: Image optimization, code splitting, prefetching built-in
- **Developer experience**: React-based, TypeScript support, excellent dev tools
- **Hybrid rendering**: Mix of SSR, SSG, and client-side as needed
- **Firebase compatible**: Deploys well to Firebase Hosting

### Negative

- **Learning curve**: App Router is newer, different from Pages Router
- **Complexity**: More complex than simple React apps for simple use cases
- **Build time**: SSG increases build time as content grows
- **Hydration**: Requires careful handling of client/server state differences

## Alternatives Considered

### Alternative 1: Plain React (Vite)

Simple React SPA without server-side rendering.

**Why rejected**:
- Poor SEO for a public-facing marketing website
- Would need separate prerendering solution
- Original spec explicitly mentions "Next.js SSR should be used" for SEO

### Alternative 2: Gatsby

Static site generator with React.

**Why rejected**:
- Build times become slow as content scales
- Less flexible for dynamic content (event registration forms)
- Next.js offers better hybrid approach for our use case

### Alternative 3: Astro

Static site builder focused on content sites.

**Why rejected**:
- Less mature ecosystem than Next.js
- Smaller community for troubleshooting
- React Islands pattern adds complexity for interactive registration forms

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js on Firebase Hosting](https://firebase.google.com/docs/hosting/frameworks/nextjs)
- Original spec: "Next.js SSR should be used"
