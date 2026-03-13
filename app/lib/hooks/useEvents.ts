"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase/client";
import type { Event } from "@/app/lib/types/event";

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
}

/**
 * @satisfies CAF-01-03-AC-01 Events sorted by event date (ascending)
 * @satisfies CAF-01-03-AC-02 Only future events displayed (eventDate >= today)
 * @satisfies CAF-01-03-AC-06 Events loaded from Firestore in real-time
 */
export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = Timestamp.now();

    const q = query(
      collection(db, "events"),
      where("status", "==", "published"),
      where("eventDate", ">=", now),
      orderBy("eventDate", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { events, loading, error };
}
