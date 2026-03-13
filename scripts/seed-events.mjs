/**
 * Seed script — adds 3 demo events to Firestore (dev project).
 * Uses the Firebase client SDK, which works in Node 18+ since dev rules
 * allow unauthenticated writes until April 2026.
 *
 * Usage:
 *   node scripts/seed-events.mjs
 *
 * To wipe and re-seed, pass --clear:
 *   node scripts/seed-events.mjs --clear
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { readFileSync } from "fs";

// ---------------------------------------------------------------------------
// 1. Load env from .env.local
// ---------------------------------------------------------------------------
const envRaw = readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    })
);

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log(`\n🔥 Connecting to project: ${firebaseConfig.projectId}\n`);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------------------------------------------------
// 2. Demo events — all dated from tomorrow onward
// ---------------------------------------------------------------------------
const now = new Date();
const daysFromNow = (d) => {
  const dt = new Date(now);
  dt.setDate(dt.getDate() + d);
  dt.setHours(5, 0, 0, 0); // 5:00 AM race start
  return Timestamp.fromDate(dt);
};

const events = [
  {
    name: "Brew & Stride 5K Fun Run",
    description:
      "Kick off your weekend with a scenic 5K run around the bay area, ending with free coffee at the cafe.",
    eventDate: daysFromNow(7),
    registrationFee: 350,
    category: "running",
    capacity: 100,
    registeredCount: 0,
    posterUrl: "",
    status: "published",
    createdAt: Timestamp.now(),
  },
  {
    name: "Ridges & Roasters Bike Challenge",
    description:
      "A 30km cycling route through the highlands. All skill levels welcome. Post-ride espresso on us.",
    eventDate: daysFromNow(14),
    registrationFee: 500,
    category: "biking",
    capacity: 60,
    registeredCount: 0,
    posterUrl: "",
    status: "published",
    createdAt: Timestamp.now(),
  },
  {
    name: "Mountain Grind Trail Run",
    description:
      "A challenging 10K trail run through forest paths. Fuel up at Brew & Stride before and after.",
    eventDate: daysFromNow(21),
    registrationFee: 0,
    category: "trail",
    capacity: 40,
    registeredCount: 0,
    posterUrl: "",
    status: "published",
    createdAt: Timestamp.now(),
  },
];

// ---------------------------------------------------------------------------
// 3. Optionally clear existing events
// ---------------------------------------------------------------------------
const shouldClear = process.argv.includes("--clear");
const eventsCol = collection(db, "events");

if (shouldClear) {
  console.log("🗑️  Clearing existing events...");
  const snapshot = await getDocs(eventsCol);
  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref);
  }
  console.log(`   Deleted ${snapshot.size} event(s).\n`);
}

// ---------------------------------------------------------------------------
// 4. Insert demo events
// ---------------------------------------------------------------------------
console.log("🌱 Seeding events...\n");
for (const event of events) {
  const ref = await addDoc(eventsCol, event);
  const dateStr = event.eventDate.toDate().toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  console.log(`   ✅ [${event.category}] ${event.name}`);
  console.log(`      ID: ${ref.id}  |  Date: ${dateStr}  |  Fee: ₱${event.registrationFee || "Free"}\n`);
}

console.log("✨ Done! Open your app and refresh the Events section.\n");
process.exit(0);
