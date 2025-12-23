import { Events } from "@/lib/types";
import { db } from "@/db";
import { events } from "@/db/db";
import { responsePlate } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body: Omit<Events, "createdAt" | "updatedAt"> = await req.json();

    const dbEvent = await db
      .insert(events)
      .values({ ...body, event_date: new Date(body.event_date) })
      .returning({
        id: events.id,
      });

    return responsePlate({
      data: { eventId: dbEvent[0]?.id },
      message: "Event created",
      status: 201,
    });
  } catch (e) {
    console.log("error while creating events ", e);
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}
