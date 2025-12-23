import { db, eq } from "@/db";
import { events } from "@/db/db";
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
    const body: Omit<Events, "createdAt" | "updatedAt"> = await req.json();

    const event = await db.query.events.findFirst({
      where: eq(events.id, id),
    });

    if (!event) {
      return responsePlate({ message: "Event not found", status: 404 });
    }

    const updatedEvent = await db
      .update(events)
      .set({ ...body, event_date: new Date(body.event_date) })
      .where(eq(events.id, event.id))
      .returning({
        id: events.id,
      });

    return responsePlate({
      message: "Event updated",
      status: 200,
      data: {
        eventId: updatedEvent[0]?.id,
      },
    });
  } catch (e) {
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
