"use client";

import { useState, useEffect, FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/hooks";
import { Events, FormDataProps } from "@/lib/types";
import { useCreateEvent, useUpdateEvent } from "@/query/lib";

export function EventForm({
  id,
  event,
}: {
  id: string | null;
  event: Events | null;
}) {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { mutate, isPending } = useCreateEvent();
  const { mutate: m2, isPending: l2 } = useUpdateEvent(id);

  const isLoading = isPending || l2;

  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    description: "",
    event_date: "",
    location: "",
    status: "draft",
    tags: "",
    tickets_sold: 0,
    imgUrl: "",
  });

  useEffect(() => {
    if (event) {
      const date = new Date(event.event_date);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      setFormData({
        title: event.title,
        description: event.description,
        event_date: localDate,
        location: event.location,
        status: event.status,
        tags: event.tags.join(", "),
        tickets_sold: event.tickets_sold,
        imgUrl: event.imgUrl,
      });
    }
  }, [event]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("description", formData.description.trim());
      payload.append("event_date", formData.event_date);
      payload.append("location", formData.location.trim());
      payload.append("status", formData.status);
      payload.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      );
      payload.append("tickets_sold", String(formData.tickets_sold));

      if (formData.imgUrl instanceof File) {
        payload.append("image", formData.imgUrl);
      }

      if (isEdit && id) {
        m2(payload);
      } else {
        mutate(payload);
      }

      router.push("/");
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      imgUrl: file,
    }));
  };

  const imagePreview =
    formData.imgUrl instanceof File
      ? URL.createObjectURL(formData.imgUrl)
      : typeof formData.imgUrl === "string" && formData.imgUrl.length > 0
      ? formData.imgUrl
      : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEdit
              ? "Update event details below"
              : "Fill in the details to create a new event"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent border-gray-300`}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter event description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="event_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="event_date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent border-gray-300`}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent border-gray-300`}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="tickets_sold"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tickets Sold
              </label>
              <input
                type="number"
                id="tickets_sold"
                name="tickets_sold"
                value={formData.tickets_sold}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter tags separated by commas"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate multiple tags with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>

            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="h-40 w-full object-cover rounded-lg border"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Saving..."
                : isEdit
                ? "Update Event"
                : "Create Event"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
