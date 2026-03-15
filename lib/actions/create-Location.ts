"use server";

import {prisma} from "../prisma";
import { geocodeLocation } from "@/lib/geocode";

export async function createLocation(
  tripId: string,
  locationTitle: string,
  order: number
) {

  const coords = await geocodeLocation(locationTitle);

  const location = await prisma.location.create({
    data: {
      locationTitle,
      latitude: coords.latitude,
      longitude: coords.longitude,
      order,
      tripId
    }
  });

  return location;
}