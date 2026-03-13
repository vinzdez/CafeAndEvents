/** Cafe configuration — update with real info before go-live */
export const CAFE = {
  name: "AID Station Cafe",
  tagline: "Where mountain running meets coffee culture.",
  description:
    "A cozy specialty coffee shop and community hub for trail runners and cyclists in La Trinidad, Benguet. We serve great coffee and post-race recovery plates. Whether you're fueling up before a race or winding down after a mountain run, you'll find a welcoming spot here.",
  offerings: [
    { label: "Specialty Coffee", icon: "☕" },
    { label: "Post-Race Meals", icon: "🍳" },
    { label: "Running & Biking Events", icon: "🏃" },
    { label: "Community Hub", icon: "🤝" },
  ],
  contact: {
    address: "Pico, La Trinidad, Benguet, La Trinidad, Philippines, 2601",
    phone: "+63 917 123 4567",
    email: "hello@brewandstride.ph",
    hours: {
      weekdays: "Mon–Sat: 9:00 AM – 10:00 PM",
      weekends: "Sun: 1:00 PM – 10:00 PM",
    },
  },
  social: {
    instagram: "#",
    facebook: "https://www.facebook.com/profile.php?id=100057368991920",
  },
} as const;
