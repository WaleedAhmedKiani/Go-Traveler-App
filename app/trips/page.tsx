import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default async function TripsPage() {
    const session = await auth();

    //  Protect the page (no DB request without login)
    if (!session?.user?.id) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-3xl font-bold mb-2">Trips</h1>
                <p>Please login to view your trips.</p>
            </div>
        );
    }

    //  Fetch trips sorted by date DESC directly in Prisma
    const trips = await prisma.trip.findMany({
        where: { userId: session.user.id },
        orderBy: { startDate: "desc" },
    });

    // Normalize today's date to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTrips = [];
    const pastTrips = [];

    trips.forEach((trip) => {
        const start = new Date(trip.startDate);
        start.setHours(0, 0, 0, 0);

        if (start >= today) {
            upcomingTrips.push(trip);
        } else {
            pastTrips.push(trip);
        }
    });

    return (
        <div className="space-y-6 max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tighter">Dashboard</h1>

                <Link href="/trips/new">
                    <Button className="cursor-pointer">New Trip</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {session.user.name}</CardTitle>
                </CardHeader>

                <CardContent className="text-gray-600">
                    <p>
                        {trips.length > 0
                            ? `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips"}. 
                 ${upcomingTrips.length} upcoming, 
                 ${pastTrips.length} completed.`
                            : "You have no trips yet. Start planning your next adventure!"}
                    </p>
                </CardContent>

                </Card>

                <div>
                    <h2 className="text-2xl font-bold my-4">Recent Trips</h2>

                    {trips.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <p className="text-xl font-medium mb-2 ">No trips yet. Start planning your next adventure!</p>

                                <Link href="/trips/new">
                                    <Button className="cursor-pointer">Create Trip</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trips.slice(0, 6).map((trip) => (

                            <Link key={trip.id} href={`/trips/${trip.id}`} className="block">
                            
                            <Card key={trip.id} className="mb-4 hover:shadow-lg transition cursor-pointer">
                                <CardHeader>
                                    <CardTitle>{trip.title || "Untitled Trip"}</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm">
                                        <strong>Start:</strong>{" "}
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong>End:</strong>{" "}
                                        {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                             </Link>
                        ))}
                        </div>
                    )}
                </div>
            
        </div>
    );
}