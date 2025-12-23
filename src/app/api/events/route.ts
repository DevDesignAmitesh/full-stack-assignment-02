import { db } from "@/db";
import { responsePlate } from "@/lib/utils";

export async function GET() {
  try {
    const eventData = await db.query.events.findMany();

    return responsePlate({
      message: "Events found",
      status: 200,
      data: {
        events: eventData,
      },
    });
  } catch (e) {
    console.log("error while fetching events", e);
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}
