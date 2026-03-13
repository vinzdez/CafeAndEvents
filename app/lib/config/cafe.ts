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
