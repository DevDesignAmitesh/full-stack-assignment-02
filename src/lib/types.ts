import z from "zod";

export type EventsStatus = "draft" | "upcoming" | "completed" | "cancelled";

export type Events = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  status: EventsStatus;
  tags: string[];
  tickets_sold: number;
  createdAt?: string;
  updatedAt?: string;
  imgUrl: string | File;
};

export type FormDataProps = {
  title: string;
  description: string;
  event_date: string;
  location: string;
  status: EventsStatus;
  tags: string;
  tickets_sold: number;
  imgUrl: File | string;
};

export const createOrUpdateEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  description: z
    .string()
    .trim()
    .max(2000, "Description too long")
    .optional()
    .or(z.literal("")),
  event_date: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date"),
  location: z.string().trim().min(1, "Location is required").max(200),
  status: z.enum(["draft", "upcoming", "completed", "cancelled"]),
  tags: z.array(z.string()),
  tickets_sold: z.number().int().min(0, "Tickets sold cannot be negative"),
  imgUrl: z
    .union([z.instanceof(File), z.string().url(), z.literal("")])
    .optional(),
});

export const deleteOrFetchEvent = z.object({
  eventId: z.uuid()
})
