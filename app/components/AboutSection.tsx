/**
 * @satisfies CAF-01-01-AC-03 Page includes cafe description and what the cafe offers
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */
import { CAFE } from "@/app/lib/config/cafe";

export default function AboutSection() {
  return (
    <section id="about" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              More than just a coffee shop.
            </h2>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">
              {CAFE.description}
            </p>
          </div>

          {/* Offerings grid */}
          <div className="grid grid-cols-2 gap-4">
            {CAFE.offerings.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm border border-stone-100"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-semibold text-stone-800">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
