import { db } from ".";
import { events } from "./db";

async function seed() {
  console.log("🌱 Seeding events...");

  await db.insert(events).values([
    {
      title: "Tech Conference 2025",
      description: "A conference for developers and tech enthusiasts",
      location: "Bangalore",
      event_date: new Date("2025-03-15T10:00:00Z"),
      tags: ["tech", "conference", "developers"],
      tickes_sold: 120,
      status: "upcoming",
    },
    {
      title: "Startup Meetup",
      description: "Networking meetup for startup founders",
      location: "Delhi",
      event_date: new Date("2025-02-10T18:00:00Z"),
      tags: ["startup", "networking"],
      tickes_sold: 80,
      status: "upcoming",
    },
    {
      title: "Music Festival",
      description: "Live music festival with multiple artists",
      location: "Mumbai",
      event_date: new Date("2024-12-01T16:00:00Z"),
      tags: ["music", "festival", "live"],
      tickes_sold: 500,
      status: "completed",
    },
    {
      title: "Product Launch Event",
      description: "Launch event for a new consumer product",
      location: "Hyderabad",
      event_date: new Date("2025-01-20T11:00:00Z"),
      tags: ["product", "launch"],
      tickes_sold: 40,
      status: "draft",
    },
  ]);

  console.log("✅ Events seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
