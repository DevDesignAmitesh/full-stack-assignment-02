import {
  createEvent,
  deleteEvent,
  fetchEvent,
  fetchEvents,
  updateEvent,
} from "@/lib/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";

export const queryKeys = {
  events: ["events"] as const,
  event: (id: string | null) => ["event", id] as const,
};

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: fetchEvents,
  });
}

export function useEvent(eventId: string | null) {
  return useQuery({
    queryKey: eventId ? queryKeys.event(eventId) : [],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
  });
}

export function useCreateEvent() {
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.events,
      });
    },
  });
}

export function useUpdateEvent(eventId: string | null) {
  return useMutation({
    mutationFn: (data: FormData) => updateEvent(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({
        queryKey: queryKeys.event(eventId),
      });
    },
  });
}

export function useDeleteEvent() {
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.events,
      });
    },
  });
}
