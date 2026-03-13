"use client";

/**
 * @satisfies CAF-01-02-AC-01 Gallery page displays cafe photos in a grid layout
 * @satisfies CAF-01-02-AC-02 Images are optimized for web (WebP with JPEG fallback via next/image)
 * @satisfies CAF-01-02-AC-03 Images lazy load as user scrolls
 * @satisfies CAF-01-02-AC-04 Mobile-friendly layout with appropriate touch targets
 * @satisfies CAF-01-02-AC-05 Clicking image opens lightbox/preview modal
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Placeholder gallery items — replace src values with real Firebase Storage URLs
const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/gallery/cafe-1.jpg", alt: "Cafe interior with warm lighting", width: 800, height: 600 },
  { src: "/gallery/cafe-2.jpg", alt: "Barista preparing espresso", width: 800, height: 600 },
  { src: "/gallery/cafe-3.jpg", alt: "Latte art close-up", width: 800, height: 600 },
  { src: "/gallery/cafe-4.jpg", alt: "Outdoor seating area", width: 800, height: 600 },
  { src: "/gallery/cafe-5.jpg", alt: "Post-run breakfast spread", width: 800, height: 600 },
  { src: "/gallery/cafe-6.jpg", alt: "Community event at the cafe", width: 800, height: 600 },
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
  }, []);

  const next = useCallback(() => {
    setActiveIdx((i) => (i !== null ? (i + 1) % GALLERY_ITEMS.length : null));
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, close, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIdx]);

  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Inside Our Cafe
          </h2>
          <p className="mt-3 text-lg text-stone-500">
            A peek into our space, coffee, and community
          </p>
        </div>

        {/* Grid: 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`View photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal
          aria-label="Photo lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          {/* Stop propagation on inner container */}
          <div
            className="relative max-h-full max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={GALLERY_ITEMS[activeIdx].src}
                alt={GALLERY_ITEMS[activeIdx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-center text-sm text-stone-400">
              {GALLERY_ITEMS[activeIdx].alt}
            </p>

            {/* Counter */}
            <p className="mt-1 text-center text-xs text-stone-600">
              {activeIdx + 1} / {GALLERY_ITEMS.length}
            </p>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-stone-700"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-800/80 text-white transition-colors hover:bg-stone-700"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-800/80 text-white transition-colors hover:bg-stone-700"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
