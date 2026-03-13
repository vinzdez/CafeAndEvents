/**
 * @satisfies CAF-01-01-AC-04 Contact info (address, phone, email, hours) visible in footer
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */
import { CAFE } from "@/app/lib/config/cafe";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white">{CAFE.name}</h3>
            <p className="mt-2 text-sm text-stone-400 leading-relaxed">
              {CAFE.tagline}
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href={CAFE.social.instagram}
                aria-label="Instagram"
                className="text-stone-400 hover:text-amber-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={CAFE.social.facebook}
                aria-label="Facebook"
                className="text-stone-400 hover:text-amber-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Gallery", href: "#gallery" },
                { label: "Events", href: "#events" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-300 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-4">
              Find Us
            </h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-amber-400">📍</span>
                <span>{CAFE.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">📞</span>
                <a
                  href={`tel:${CAFE.contact.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {CAFE.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✉️</span>
                <a
                  href={`mailto:${CAFE.contact.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {CAFE.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-amber-400">🕐</span>
                <div>
                  <p>{CAFE.contact.hours.weekdays}</p>
                  <p>{CAFE.contact.hours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {CAFE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
