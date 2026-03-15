"use server"

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


const geocodeAddress = async (address: string) => {
    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${key}`);

    if (!response.ok) {
        throw new Error("Failed to geocode address");
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
        throw new Error("Invalid address  or No Location found for the provided address");
    }

    const [lng, lat] = data.features[0].center;
    return { lat, lng };

}

export const addLocation = async (formData: FormData, tripId: string) => {

    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("Unauthorized");
    }

    const address = formData.get("address") as string;

    if (!address) {
        throw new Error("Address is required");
    }

    const { lat, lng } = await geocodeAddress(address);
    const count = await prisma.location.count({ where: { tripId } });


    await prisma.location.create({
        data: {

            locationTitle: address,
            latitude: lat,
            longitude: lng,
            order: count,
            tripId,
        }
    })

    redirect(`/trips/${tripId}`);

};