import { EventDetail } from "@/components/pages/EventDetails";

export default async function viewEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EventDetail id={id} />;
}
