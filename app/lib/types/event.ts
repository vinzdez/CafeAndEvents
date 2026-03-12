import { Timestamp } from "firebase/firestore";

/** @satisfies CAF-01-03-AC-03 Event card shows: name, date, category, registration fee */
export type EventCategory = "running" | "biking" | "trail";
export type EventStatus = "draft" | "published" | "closed";

export interface Event {
  id: string;
  name: string;
  description: string;
  eventDate: Timestamp;
  registrationFee: number;
  category: EventCategory;
  capacity: number;
  registeredCount: number;
  posterUrl: string;
  resultsPdfUrl?: string;
  status: EventStatus;
  createdAt: Timestamp;
}
