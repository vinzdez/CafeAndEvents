# ADR-003: Firestore Transactions for Capacity Management

**Status**: Accepted

**Date**: 2026-03-09

---

## Context

The event registration system has a critical concurrency requirement:

- Events have capacity limits (e.g., 500 participants)
- Multiple users may attempt to register simultaneously
- The system must prevent overbooking (registered count must never exceed capacity)
- Race conditions must be handled correctly

Example scenario:
1. Current registered count: 499
2. Two users attempt registration simultaneously
3. Without proper handling, both could succeed, resulting in 501 registrations

## Decision

Use **Firestore Transactions** for all registration operations that affect event capacity.

Transaction flow:
1. Read event document within transaction
2. Check current registeredCount vs capacity
3. Check for duplicate registration (same email)
4. If valid, increment registeredCount and create registration atomically
5. Commit transaction

If transaction fails due to conflict, retry automatically (Firestore handles this).

## Consequences

### Positive

- **Atomicity**: registeredCount increment and registration creation happen together
- **Consistency**: No overbooking possible even with concurrent requests
- **Automatic retries**: Firestore handles transaction conflicts automatically
- **Simple**: Single code path handles all registration logic

### Negative

- **Rate limits**: Firestore has transaction rate limits (1 write per second per document for optimistic concurrency)
- **Latency**: Transactions add ~100-200ms latency compared to simple writes
- **Hotspots**: High-volume events may hit rate limits on the event document
- **Complexity**: Must handle transaction failures gracefully in UI

## Implementation Details

```typescript
await db.runTransaction(async (transaction) => {
  // 1. Read event
  const eventDoc = await transaction.get(eventRef);
  const { capacity, registeredCount } = eventDoc.data();
  
  // 2. Check duplicate
  const existing = await transaction.get(
    registrationsRef.where('eventId', '==', eventId).where('email', '==', email)
  );
  if (!existing.empty) throw new Error('Duplicate registration');
  
  // 3. Check capacity
  if (registeredCount >= capacity) {
    throw new Error('Event capacity reached');
  }
  
  // 4. Atomically update
  transaction.update(eventRef, { registeredCount: registeredCount + 1 });
  transaction.set(registrationRef, registrationData);
});
```

## Alternatives Considered

### Alternative 1: Cloud Functions with Serialized Queue

Use a queue to process registrations sequentially.

**Why rejected**:
- Adds complexity (need queue infrastructure)
- Slower (sequential processing)
- Overkill for the expected concurrent load (small cafe events)

### Alternative 2: Distributed Counter Pattern

Use multiple counter shards to avoid rate limits.

**Why rejected**:
- Too complex for this use case
- Not needed unless handling thousands of concurrent registrations
- Adds query complexity (must sum shards to get count)

### Alternative 3: Pessimistic Locking (Firestore Lock Document)

Create a lock document before registering.

**Why rejected**:
- Firestore doesn't support true pessimistic locking
- Leaves orphan locks if process fails
- More complex than transactions

## References

- [Firestore Transactions Documentation](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Original spec section: Concurrency Handling (Race Capacity)](./cafe_event_platform_full_spec.md)
