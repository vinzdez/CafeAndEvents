/** Cafe configuration — update with real info before go-live */
export const CAFE = {
  name: "Brew & Stride",
  tagline: "Where every cup fuels the next adventure.",
  description:
    "A cozy specialty coffee shop and community hub for runners and cyclists. We serve single-origin espresso, cold brew, and post-race recovery plates. Whether you're fueling up before a race or winding down after a ride, you'll find a welcoming spot here.",
  offerings: [
    { label: "Specialty Coffee", icon: "☕" },
    { label: "Post-Race Meals", icon: "🍳" },
    { label: "Running & Biking Events", icon: "🏃" },
    { label: "Community Hub", icon: "🤝" },
  ],
  contact: {
    address: "123 Trailhead Ave, Makati City, Metro Manila",
    phone: "+63 917 123 4567",
    email: "hello@brewandstride.ph",
    hours: {
      weekdays: "Mon–Fri: 6:00 AM – 8:00 PM",
      weekends: "Sat–Sun: 5:30 AM – 9:00 PM",
    },
  },
  social: {
    instagram: "#",
    facebook: "#",
  },
} as const;
