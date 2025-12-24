"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Calendar } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "../EmptyState";
import { EventRow } from "../EventRow";
import { StatCard } from "../StatCard";
import { useEvents } from "@/query/lib";
import { LoadingSpinner } from "../LoadingSpinner";

const ITEMS_PER_PAGE = 5;

export function EventsList() {
  const { data: events, isLoading } = useEvents();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !events) {
    return <LoadingSpinner />;
  }

  const stats = useMemo(() => {
    const total = events.length;
    const upcoming = events.filter((e) => e.status === "upcoming").length;
    const completed = events.filter((e) => e.status === "completed").length;
    const cancelled = events.filter((e) => e.status === "cancelled").length;

    return { total, upcoming, completed, cancelled };
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const query = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.status.toLowerCase().includes(query)
      );
    });
  }, [events, searchQuery]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Event Overview
          </h1>
        </div>
        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Total events"
          value={stats.total}
          trend={{ value: 10, isPositive: true, label: "From last week" }}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Upcoming events"
          value={stats.upcoming}
          trend={{ value: 12, isPositive: true, label: "From last week" }}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Completed events"
          value={stats.completed}
          trend={{ value: 12, isPositive: false, label: "From last week" }}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Cancelled events"
          value={stats.cancelled}
          trend={{ value: 5, isPositive: true, label: "From last week" }}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Events ({filteredEvents.length})
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by event, location..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 w-80 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {paginatedEvents.length === 0 ? (
          <EmptyState
            title="No events found"
            description="Try adjusting your search or create a new event to get started."
            action={
              <Link
                href="/events/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Event
              </Link>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tickets Sold
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEvents.map((event) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      formatDate={formatDate}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                          currentPage === page
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
