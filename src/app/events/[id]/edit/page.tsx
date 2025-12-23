import { EventForm } from "@/components/pages/EventForm";
import { fetchEvent } from "@/lib/hooks";

export default async function editEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // event-id
  const { id } = await params;
  const event = await fetchEvent(id);
  return <EventForm id={id} event={event} />;
}
