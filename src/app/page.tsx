import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EventsList } from "@/components/pages/EventList";
import { fetchEvents } from "@/lib/hooks";
import { Suspense } from "react";

export default async function Home() {
  const events = await fetchEvents();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventsList events={events} />
    </Suspense>
  );
}
