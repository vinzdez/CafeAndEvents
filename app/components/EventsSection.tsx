"use client";

/**
 * @satisfies CAF-01-03-AC-03 Event card shows: name, date, category, registration fee
 * @satisfies CAF-01-03-AC-04 "View Details" button links to event details page (EVE-01)
 * @satisfies CAF-01-03-AC-05 Empty state shown when no upcoming events
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */

import { useEvents } from "@/app/lib/hooks/useEvents";
import type { EventCategory } from "@/app/lib/types/event";

const CATEGORY_LABELS: Record<EventCategory, string> = {
  running: "Running",
  biking: "Biking",
  trail: "Trail Run",
};

const CATEGORY_COLORS: Record<EventCategory, string> = {
  running: "bg-sky-100 text-sky-700",
  biking: "bg-emerald-100 text-emerald-700",
  trail: "bg-amber-100 text-amber-700",
};

function formatDate(timestamp: { toDate: () => Date }): string {
  return timestamp.toDate().toLocaleDateString("en-PH", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatFee(fee: number): string {
  return fee === 0
    ? "Free"
    : `₱${fee.toLocaleString("en-PH", { minimumFractionDigits: 0 })}`;
}

function EventCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
      <div className="h-5 w-20 rounded-full bg-stone-200" />
      <div className="mt-4 h-6 w-3/4 rounded bg-stone-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
      <div className="mt-6 h-10 w-full rounded-full bg-stone-200" />
    </div>
  );
}

export default function EventsSection() {
  const { events, loading, error } = useEvents();

  return (
    <section id="events" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-3 text-lg text-stone-500">
            Join our running and biking community
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center text-sm text-red-600">
            Unable to load events. Please try again later.
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <EventCardSkeleton key={n} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white py-20 text-center">
            <span className="text-5xl">🏁</span>
            <p className="text-xl font-semibold text-stone-700">
              No upcoming events
            </p>
            <p className="text-stone-500 max-w-sm">
              Check back soon — new races and rides are added regularly.
            </p>
          </div>
        )}

        {/* Events grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Category badge */}
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[event.category]}`}
                >
                  {CATEGORY_LABELS[event.category]}
                </span>

                {/* Name */}
                <h3 className="mt-3 text-lg font-bold text-stone-900 leading-snug">
                  {event.name}
                </h3>

                {/* Date */}
                <p className="mt-1 text-sm text-stone-500">
                  📅 {formatDate(event.eventDate)}
                </p>

                {/* Fee */}
                <p className="mt-1 text-sm text-stone-500">
                  🎟️ Registration fee:{" "}
                  <span className="font-semibold text-stone-700">
                    {formatFee(event.registrationFee)}
                  </span>
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA */}
                <a
                  href={`/events/${event.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
