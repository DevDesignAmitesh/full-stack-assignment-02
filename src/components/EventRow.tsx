import { MoreVertical } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";
import { Events } from "@/lib/types";

export function EventRow({
  event,
  formatDate,
}: {
  event: Events;
  formatDate: (date: string) => string;
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <Link
          href={`/events/${event.id}`}
          className="text-sm font-medium text-gray-900 hover:text-gray-700"
        >
          {event.title}
        </Link>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(event.event_date)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{event.location}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {event?.tickets_sold?.toString()}
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={event.status} />
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}
