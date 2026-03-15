import {prisma} from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ tripId: string }> }
) {
  const { tripId } = await context.params;

  const locations = await prisma.location.findMany({
    where: { tripId },
    orderBy: { order: "asc" }
  });

  return new Response(JSON.stringify(locations), {
    headers: { "Content-Type": "application/json" },
  });
}