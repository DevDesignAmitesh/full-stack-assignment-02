import { db, eq } from "@/db";
import { events } from "@/db/db";
import { uploadToImageKit } from "@/lib/image-kit";
import { Events } from "@/lib/types";
import { responsePlate } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await db.query.events.findFirst({
      where: eq(events.id, id),
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
    const formData = await req.formData();

    const existingEvent = await db.query.events.findFirst({
      where: eq(events.id, id),
    });

    console.log("existingEvent")
    console.log(existingEvent)

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
    const event = await db.query.events.findFirst({
      where: eq(events.id, id),
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
