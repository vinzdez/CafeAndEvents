# ADR-001: Firebase as Backend Platform

**Status**: Accepted

**Date**: 2026-03-09

---

## Context

The Cafe + Event Platform requires a backend infrastructure to handle:
- User authentication (admins and participants)
- Database for events and registrations
- File storage for payment receipts and results PDFs
- Serverless functions for business logic (capacity management, email notifications)

The decision needs to minimize cost and maintenance overhead since this is a solo developer project for a small cafe operation.

## Decision

Use **Firebase** as the backend platform, including:
- **Firebase Authentication** for user management
- **Firestore** as the NoSQL database
- **Firebase Storage** for file uploads
- **Cloud Functions** for serverless business logic
- **Firebase Hosting** for deployment

## Consequences

### Positive

- **Serverless**: No server management, scaling handled automatically
- **Cost-effective**: Spark plan (free tier) sufficient for small events; Blaze plan ~$5-15/month for typical usage
- **Integrated**: All services work together seamlessly
- **Rapid development**: Minimal backend code needed, focus on frontend
- **Reliable**: Google's infrastructure, 99.95% uptime SLA
- **Real-time**: Firestore provides real-time sync for registration counts

### Negative

- **Vendor lock-in**: Migration away from Firebase would require significant effort
- **Limited querying**: Firestore has query limitations (no OR queries, limited sorting)
- **Cold starts**: Cloud Functions may have cold start latency (~1-2 seconds)
- **Offline limitations**: Firestore offline persistence adds complexity

## Alternatives Considered

### Alternative 1: Supabase

PostgreSQL-based open-source Firebase alternative with similar features.

**Why rejected**: 
- Firebase has better documentation and community for solo developers
- Firestore's real-time sync is superior to Supabase's real-time for this use case
- Firebase's free tier is more generous for the expected usage patterns

### Alternative 2: AWS (Lambda + API Gateway + DynamoDB)

Full AWS serverless stack.

**Why rejected**:
- Higher complexity with multiple services to configure
- Steeper learning curve for a solo developer
- Cost could exceed Firebase for this workload
- More complex deployment process

### Alternative 3: Custom Node.js Backend

Traditional backend with Express.js and MongoDB.

**Why rejected**:
- Requires server management and maintenance
- No free tier for hosting
- More code to write and maintain
- Scaling requires manual intervention

## References

- [Firebase Pricing](https://firebase.google.com/pricing)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- Original spec requirement: "serverless architecture to minimize cost and maintenance"
