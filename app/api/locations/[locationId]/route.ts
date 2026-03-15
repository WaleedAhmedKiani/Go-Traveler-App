import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(req: Request, context: { params: Promise<{ locationId: string }> }) {

     const { locationId } = await context.params;
 
  try {

   
    await prisma.location.delete({
      where: { id: locationId },
    });

    return NextResponse.json({ success: true, message: "Location deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete location" },
      { status: 500 }
    );
  }
}