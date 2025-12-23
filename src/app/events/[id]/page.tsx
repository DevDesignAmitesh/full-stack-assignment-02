export default async function viewEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // event-id
  const { id } = await params;
  return <div>{id}</div>;
}
