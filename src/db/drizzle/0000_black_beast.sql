CREATE TYPE "public"."status" AS ENUM('draft', 'upcoming', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"imgUrl" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"tags" text[] NOT NULL,
	"tickets_sold" integer DEFAULT 0,
	"status" "status",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
