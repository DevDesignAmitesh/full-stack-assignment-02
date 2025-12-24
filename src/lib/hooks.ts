import axios from "axios";
import { BACKEND_URL, handleAxiosError, zodErrorMessage } from "./utils";
import { createOrUpdateEventSchema, deleteOrFetchEvent, Events } from "./types";
import { toast } from "sonner";

export async function fetchEvents(): Promise<Events[]> {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/events`);
    return res?.data?.data?.events ?? [];
  } catch (err) {
    handleAxiosError(err, "error while fetchEvents ");
    return [];
  }
}

export async function fetchEvent(
  eventId: string | null
): Promise<Events | null> {
  try {
    const { success, error, data } = deleteOrFetchEvent.safeParse({ eventId });

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }

    const res = await axios.get(`${BACKEND_URL}/api/event/${data.eventId}`);
    return res?.data?.data?.event ?? null;
  } catch (err) {
    handleAxiosError(err, "error while fetchEvent ");
    return null;
  }
}

export async function createEvent(event: FormData): Promise<string | null> {
  try {
    const raw = Object.fromEntries(event.entries());

    const parsedData = {
      title: raw.title,
      description: raw.description ?? "",
      event_date: raw.event_date,
      location: raw.location,
      status: raw.status,
      tags: raw.tags ? JSON.parse(raw.tags as string) : [],
      tickets_sold: Number(raw.tickets_sold ?? 0),
    };

    console.log("parsedData");
    console.log(parsedData);

    const { success, error } =
      createOrUpdateEventSchema.safeParse(parsedData);

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }

    const res = await axios.post(`${BACKEND_URL}/api/event`, event);

    toast.success("Event created successfully");
    return res?.data?.data?.eventId ?? null;
  } catch (err) {
    handleAxiosError(err, "error while createEvent ");
    return null;
  }
}

export async function updateEvent(
  id: string | null,
  event: FormData
): Promise<string | null> {
  try {
    const raw = Object.fromEntries(event.entries());

    const parsedData = {
      title: raw.title,
      description: raw.description ?? "",
      event_date: raw.event_date,
      location: raw.location,
      status: raw.status,
      tags: raw.tags ? JSON.parse(raw.tags as string) : [],
      tickets_sold: Number(raw.tickets_sold ?? 0),
      imgUrl: raw.imgUrl ?? "",
    };

    console.log("parsedData");
    console.log(parsedData);

    const { success, error } =
      createOrUpdateEventSchema.safeParse(parsedData);

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }

    const res = await axios.put(`${BACKEND_URL}/api/event/${id}`, event);

    toast.success("Event updated successfully");
    return res?.data?.eventId ?? null;
  } catch (err) {
    handleAxiosError(err, "error while updateEvent ");
    return null;
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const { success, error, data } = deleteOrFetchEvent.safeParse({
      eventId: id,
    });

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return false;
    }
    await axios.delete(`${BACKEND_URL}/api/event/${data.eventId}`);
    toast.success("Event deleted successfully");
    return true;
  } catch (err) {
    handleAxiosError(err, "error while deleteEvent ");
    return false;
  }
}
