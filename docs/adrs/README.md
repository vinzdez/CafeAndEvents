# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Cafe + Event Platform.

## What is an ADR?

An **ADR** documents a significant architectural decision that affects the project's structure, technology choices, or design patterns. ADRs are used for:

- Choosing between competing technical solutions
- Explaining why a particular approach was selected
- Recording the context and consequences of decisions

## When to Write an ADR

Write an ADR when:
- Choosing between multiple technical approaches (e.g., Firebase vs Supabase)
- Making structural decisions that affect the entire project
- Selecting frameworks, databases, or deployment platforms
- Defining patterns that other developers must follow

Do NOT write an ADR for:
- Implementation details that don't affect architecture
- Bug fixes or minor optimizations
- Standard library usage

## ADR Format

Each ADR follows this structure:

1. **Status** — Proposed, Accepted, Deprecated, Superseded
2. **Context** — The problem or situation requiring a decision
3. **Decision** — The chosen approach
4. **Consequences** — Positive and negative outcomes
5. **Alternatives Considered** — Other options and why they were rejected

## ADR Files

| ADR | Title | Status |
|-----|-------|--------|
| [001](./001-firebase-backend.md) | Firebase as Backend Platform | Proposed |
| [002](./002-nextjs-frontend.md) | Next.js for Frontend | Proposed |
| [003](./003-firestore-transactions.md) | Firestore Transactions for Capacity | Proposed |

## ADR Numbering

ADRs are numbered sequentially (001, 002, 003...). The number is permanent even if the ADR is deprecated.

## Template

See [ADR-TEMPLATE.md](./ADR-TEMPLATE.md) for creating new ADRs.
