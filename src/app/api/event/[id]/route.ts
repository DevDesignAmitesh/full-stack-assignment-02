import { db, eq } from "@/db";
import { events } from "@/db/db";
import { uploadToImageKit } from "@/lib/image-kit";
import {
  createOrUpdateEventSchema,
  deleteOrFetchEvent,
  Events,
} from "@/lib/types";
import { responsePlate, zodErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";
import { toast } from "sonner";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { success, error, data } = deleteOrFetchEvent.safeParse({
      eventId: id,
    });

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }
    const event = await db.query.events.findFirst({
      where: eq(events.id, data.eventId),
    });

    if (!event) {
      return responsePlate({ message: "Event not found", status: 404 });
    }

    return responsePlate({
      data: { event },
      message: "Event found",
      status: 200,
    });
  } catch (e) {
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { success, error, data } = deleteOrFetchEvent.safeParse({
      eventId: id,
    });

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }
    const existingEvent = await db.query.events.findFirst({
      where: eq(events.id, data.eventId),
    });

    const formData = await req.formData();

    const raw = Object.fromEntries(formData.entries());

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

    const { success: s2, error: e2 } =
      createOrUpdateEventSchema.safeParse(parsedData);

    if (!s2) {
      toast.error(zodErrorMessage({ error: e2 }));
      return null;
    }

    console.log("existingEvent");
    console.log(existingEvent);

    if (!existingEvent) {
      return responsePlate({
        message: "Event not found",
        status: 404,
      });
    }

    const image = formData.get("image") as File | null;
    let imgUrl = existingEvent.imgUrl;

    if (image && image.size > 0) {
      imgUrl = await uploadToImageKit(image, "events");
    }

    const updatedBody: Partial<Omit<Events, "createdAt" | "updatedAt">> = {
      title: String(formData.get("title")),
      description: String(formData.get("description") ?? ""),
      location: String(formData.get("location")),
      event_date: String(formData.get("event_date")),
      status: formData.get("status") as Events["status"],
      tags: JSON.parse(String(formData.get("tags") ?? "[]")),
      tickets_sold: Number(formData.get("tickets_sold") ?? 0),
      imgUrl,
    };

    const updatedEvent = await db
      .update(events)
      .set({
        ...updatedBody,
        event_date: new Date(updatedBody.event_date!),
        imgUrl:
          typeof updatedBody.imgUrl === "string" ? updatedBody.imgUrl : "",
      })
      .where(eq(events.id, id))
      .returning({ id: events.id });

    return responsePlate({
      message: "Event updated",
      status: 200,
      data: {
        eventId: updatedEvent[0]?.id,
      },
    });
  } catch (e) {
    console.error("error while updating event", e);
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { success, error, data } = deleteOrFetchEvent.safeParse({
      eventId: id,
    });

    if (!success) {
      toast.error(zodErrorMessage({ error }));
      return null;
    }
    const event = await db.query.events.findFirst({
      where: eq(events.id, data.eventId),
    });

    if (!event) {
      return responsePlate({ message: "Event not found", status: 404 });
    }

    await db.delete(events).where(eq(events.id, event.id));

    return responsePlate({
      message: "Event deleted",
      status: 200,
    });
  } catch (e) {
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}
