/**
 * @satisfies CAF-01-01-AC-02 Hero section displays cafe name, tagline, and branding
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */
import Image from "next/image";
import { CAFE } from "@/app/lib/config/cafe";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-800" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="AID Station Cafe logo"
            width={180}
            height={180}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <p className="mt-4 text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
          {CAFE.tagline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#events"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition-colors hover:bg-amber-400"
          >
            View Upcoming Events
          </a>
          <a
            href="#gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            See Our Cafe
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-stone-400 to-transparent" />
      </div>
    </section>
  );
}
