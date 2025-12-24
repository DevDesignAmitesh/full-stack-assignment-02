import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const eventStatus = pgEnum("status", [
  "draft",
  "upcoming",
  "completed",
  "cancelled",
]);

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  imgUrl: text("imgUrl").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  event_date: timestamp("event_date").notNull(),
  tags: text("tags").array().notNull(),
  tickets_sold: integer("tickets_sold").default(0),
  status: eventStatus(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
