import { createOrUpdateEventSchema, Events } from "@/lib/types";
import { db } from "@/db";
import { events } from "@/db/db";
import { responsePlate, zodErrorMessage } from "@/lib/utils";
import { uploadToImageKit } from "@/lib/image-kit";
import { toast } from "sonner";

export async function POST(req: Request) {
  try {
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

    const { success, error } = createOrUpdateEventSchema.safeParse(parsedData);

    if (!success) {
      return responsePlate({
        message: zodErrorMessage({ error }),
        status: 411,
      });
    }

    console.log("formData while post");
    console.log(formData);

    const image = formData.get("image") as File | null;

    let imgUrl: string = "";

    if (image && image.size > 0) {
      imgUrl = await uploadToImageKit(image);
    }

    const body: Omit<Events, "createdAt" | "updatedAt"> = {
      id: crypto.randomUUID(),
      title: String(formData.get("title")),
      description: String(formData.get("description") ?? ""),
      location: String(formData.get("location")),
      event_date: String(formData.get("event_date")),
      status: formData.get("status") as Events["status"],
      tags: JSON.parse(String(formData.get("tags") ?? "[]")),
      tickets_sold: Number(formData.get("tickets_sold") ?? 0),
      imgUrl,
    };

    const dbEvent = await db
      .insert(events)
      .values({
        ...body,
        event_date: new Date(body.event_date),
        imgUrl: typeof body.imgUrl === "string" ? body.imgUrl : "",
      })
      .returning({ id: events.id });

    return responsePlate({
      data: { eventId: dbEvent[0]?.id },
      message: "Event created",
      status: 201,
    });
  } catch (e) {
    console.error("error while creating event", e);
    return responsePlate({
      message: "Internal server error",
      status: 500,
    });
  }
}
