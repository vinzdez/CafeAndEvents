/**
 * @satisfies CAF-01-01-AC-02 Hero section displays cafe name, tagline, and branding
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */
import Image from "next/image";

const FEATURES = [
  { label: "Weekly Trail Runs", icon: "🏔️" },
  { label: "Specialty Coffee", icon: "☕" },
  { label: "Mountain Community", icon: "🤝" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
      {/* Background image */}
      <Image
        src="/hero.png"
        alt="Trail runner on a mountain"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay — stronger on left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-stone-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-28 pb-20">
        <div className="max-w-xl">
          {/* Category badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-8">
            Coffee &amp; Trail Runs
          </span>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Fuel Your Run.
            <br />
            Finish With Coffee.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg text-stone-300 leading-relaxed max-w-md">
            Trail running community events and specialty coffee
            in the heart of the mountains.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#events"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-stone-900 shadow-lg transition-colors hover:bg-amber-400"
            >
              View Upcoming Events
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Visit the Cafe
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-10 flex flex-wrap gap-4">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-white/80"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
