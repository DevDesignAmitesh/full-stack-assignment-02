import { EventsStatus } from "@/lib/types";

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export function StatusBadge({ status }: { status: EventsStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
