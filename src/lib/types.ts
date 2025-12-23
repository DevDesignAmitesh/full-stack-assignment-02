export type EventsStatus = "draft" | "upcoming" | "completed" | "cancelled"

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
};
