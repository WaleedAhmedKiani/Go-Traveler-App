"use server"

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export const createTrip = async (formData: FormData) => {

 

  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const imageUrl = formData.get("imageUrl") as string | null;



  if (!title || !description || !startDateStr || !endDateStr ) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);



  await prisma.trip.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      userId: session.user.id, 

    }
  });

  redirect("/trips");
};