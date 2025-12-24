"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Edit2,
  Trash2,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusBadge } from "../StatusBadge";
import { formatDate } from "@/lib/utils";
import { useDeleteEvent, useEvent } from "@/query/lib";
import { LoadingSpinner } from "../LoadingSpinner";

export function EventDetail({ id }: { id: string }) {
  const { data: event, isLoading } = useEvent(id);
  const { mutate, isPending } = useDeleteEvent();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (!id) return;

    try {
      mutate(id);
      router.push("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
    }
  };

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gray-100 overflow-hidden">
          {event.imgUrl ? (
            <img
              src={event.imgUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full bg-linear-to-r from-gray-100 to-gray-200" />
          )}
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {event.title}
                </h1>
                <StatusBadge status={event.status} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/events/${event.id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Event
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(event.event_date)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tickets Sold</p>
                <p className="text-sm font-medium text-gray-900">
                  {event.tickets_sold.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          }

          {event.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Event
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Deleting..." : "Delete Event"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isPending}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
