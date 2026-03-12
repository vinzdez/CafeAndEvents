import type { Event, EventCategory, EventStatus } from "../types/event";
import { Timestamp } from "firebase/firestore";

describe("Event type", () => {
  it("accepts a valid published event", () => {
    const event: Event = {
      id: "evt-001",
      name: "Morning 5K Run",
      description: "A scenic morning run around the park.",
      eventDate: Timestamp.fromDate(new Date("2026-05-01")),
      registrationFee: 250,
      category: "running",
      capacity: 100,
      registeredCount: 42,
      posterUrl: "https://storage.example.com/poster.webp",
      status: "published",
      createdAt: Timestamp.fromDate(new Date("2026-01-01")),
    };

    expect(event.id).toBe("evt-001");
    expect(event.status).toBe("published");
    expect(event.registrationFee).toBe(250);
  });

  it("accepts an event without resultsPdfUrl (optional field)", () => {
    const event: Event = {
      id: "evt-002",
      name: "City Bike Tour",
      description: "Explore the city on two wheels.",
      eventDate: Timestamp.fromDate(new Date("2026-06-15")),
      registrationFee: 500,
      category: "biking",
      capacity: 50,
      registeredCount: 0,
      posterUrl: "https://storage.example.com/bike-poster.webp",
      status: "draft",
      createdAt: Timestamp.fromDate(new Date("2026-01-10")),
    };

    expect(event.resultsPdfUrl).toBeUndefined();
    expect(event.category).toBe("biking");
  });

  it("validates all EventCategory values", () => {
    const categories: EventCategory[] = ["running", "biking", "trail"];
    expect(categories).toHaveLength(3);
  });

  it("validates all EventStatus values", () => {
    const statuses: EventStatus[] = ["draft", "published", "closed"];
    expect(statuses).toHaveLength(3);
  });
});
