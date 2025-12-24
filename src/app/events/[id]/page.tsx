import { EventDetail } from "@/components/pages/EventDetails";
import { fetchEvent } from "@/lib/hooks";
import { Link } from "lucide-react";

export default async function viewEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEvent(id);

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Event not found</p>
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 mt-4 inline-block"
        >
          Return to Events List
        </Link>
      </div>
    );
  }

  return <EventDetail id={id} event={event} />;
}
