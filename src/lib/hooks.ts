import axios from "axios";
import { BACKEND_URL } from "./utils";
import { Events } from "./types";

export async function fetchEvents(): Promise<Events[]> {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/events`);
    console.log("this is all the events")
    console.log(res)
    return res?.data?.data?.events ?? [];
  } catch (err) {
    console.log("error while fetchEvents ", err);
    throw new Error("error while fetchEvents");
  }
}

export async function fetchEvent(
  eventId: string | null
): Promise<Events | null> {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/event/${eventId}`);
    console.log("this is the res for one event");
    console.log(res)
    return res?.data?.data?.event ?? null;
  } catch (err) {
    console.log("error while fetchEvent ", err);
    throw new Error("error while fetchEvent");
  }
}

export async function createEvent(event: Events): Promise<string | null> {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/event`, event);

    return res?.data?.data?.eventId ?? null;
  } catch (err) {
    console.log("error while createEvent ", err);
    throw new Error("error while createEvent");
  }
}

export async function updateEvent(
  id: string,
  event: Events
): Promise<string | null> {
  try {
    const res = await axios.put(`${BACKEND_URL}/api/event/${id}`, event);

    return res?.data?.eventId ?? null;
  } catch (err) {
    console.log("error while updateEvent ", err);
    throw new Error("error while updateEvent");
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    await axios.delete(`${BACKEND_URL}/api/event/${id}`);
    return true;
  } catch (err) {
    console.log("error while deleteEvent ", err);
    throw new Error("error while deleteEvent");
  }
}
