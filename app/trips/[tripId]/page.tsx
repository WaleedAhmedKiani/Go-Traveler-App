import { auth } from "@/auth";
import TripDetailsContent from "../../../components/Trip-Details";
import { prisma } from "@/lib/prisma";


export default async function TripDetails({
    params,
}: {
    params: Promise<{ tripId: string }>;
}){
    const { tripId } = await params;

    const session = await auth();
    if (!session?.user?.id) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-3xl font-bold mb-2">Trip Details</h1>
                <p>Please log in to view trip details.</p>
            </div>
        );
    }


    const trip = await prisma.trip.findFirst({
        where: { id: tripId , userId: session.user.id },
        include: { locations: true },
    });

    if (!trip) {
        return <div>Trip not found or inaccessible.</div>

    }

    return <TripDetailsContent trip={trip} />

}