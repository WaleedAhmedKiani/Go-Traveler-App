"use client";

import React from "react";
import { Location, Trip } from "@prisma/client";
import Image from "next/image";
import { Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import Map from "../components/MapTilerMap";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export type TripWithLocation = Trip & {
    locations: Location[];
};

interface TripDetailContentProps {
    trip: TripWithLocation;
}

// Reusable NoLocations Component
const NoLocations = ({ tripId }: { tripId: string }) => (
    <div className="text-center py-10 text-gray-500 border rounded-lg">
        <p className="text-lg mb-3">No locations added yet.</p>
        <Link href={`/trips/${tripId}/itinerary/new`}>
            <Button className="cursor-pointer">
                <Plus className="w-4 h-4 mr-2" /> Add First Location
            </Button>
        </Link>
    </div>
);

export default function TripDetailsContent({ trip }: TripDetailContentProps) {
    const [activeTab, setActiveTab] = React.useState("overview");
    const [locations, setLocations] = React.useState<Location[]>(trip.locations);

    // Delete function using state instead of reload
    const handleDelete = async (locationId: string) => {
        if (!confirm("Are you sure you want to delete this location?")) return;

        const res = await fetch(`/api/locations/${locationId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setLocations(locations.filter((loc) => loc.id !== locationId));
        } else {
            alert("Failed to delete location.");
        }
    };

    return (
        <div className="container max-w-auto px-4 py-8 space-y-8">
            {/* Trip Header */}
            {trip.imageUrl && (
                <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-xl relative">
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover"
                        style={{ objectFit: "cover" }} 
                    />
                </div>
            )}

            <div className="bg-white p-6 shadow rounded-b-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {trip.title || "Untitled Trip"}
                    </h1>
                    <div className="flex items-center text-gray-800 mt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-xs">
                            {trip.startDate?.toLocaleDateString() || "No start date"} -{" "}
                            {trip.endDate?.toLocaleDateString() || "No end date"}
                        </span>
                    </div>
                </div>

                <div className="mt-4 md:mt-0">
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                        <Button className="cursor-pointer">
                            <Plus className="w-4 h-4 mr-2" /> Add Locations
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white p-6 shadow rounded-b-lg">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview" className="text-xl cursor-pointer">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="itinerary" className="text-xl cursor-pointer">
                            Itinerary
                        </TabsTrigger>
                        <TabsTrigger value="map" className="text-xl cursor-pointer">
                            Map
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">

                          <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>

                                    <Link href={`/trips`}>
                                        <Button className="cursor-pointer mt-1.5">
                                            <p>Back to Trips</p>
                                        </Button>
                                    </Link>
                                </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              

                                <div className="space-y-4">
                                    <div className="flex items-start ">
                                        <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                                        <div>
                                            <p className="font-medium text-gray-700">Dates</p>
                                            <p className="text-sm text-gray-500">
                                                {trip.startDate?.toLocaleDateString() || "No start date"} -{" "}
                                                {trip.endDate?.toLocaleDateString() || "No end date"}
                                            </p>
                                            <p className="text-sm text-gray-500 font-semibold">
                                                {`${Math.round(
                                                    ((trip.endDate?.getTime() || 0) -
                                                        (trip.startDate?.getTime() || 0)) /
                                                    (1000 * 60 * 60 * 24)
                                                )} day(s)`}
                                            </p>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                                        <div>
                                            <p>Destinations</p>
                                            <p>
                                                {locations.length} {locations.length === 1 ? "Location" : "Locations"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="h-96 rounded-lg overflow-hidden">
                                <Map
                                    locations={locations.map((loc) => ({
                                        lat: loc.latitude,
                                        lng: loc.longitude,
                                    }))}
                                    animateMarkers={true} // Optional: animate marker
                                />
                            </div>



                            {trip.locations.length <= 0 && (
                                <div className="text-center p-4">
                                    <p>Add location to see them on map.  </p>

                                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                                        <Button className="cursor-pointer mt-1.5">
                                            <Plus className="w-4 h-4 mr-2" /> Add Locations
                                        </Button>
                                    </Link>

                                </div>
                            )}


                            {/* Trip Description */}

                            <div className="w-auto text-xl font-semibold">
                                {trip.description && (
                                    <div>
                                        <p className="text-gray-700 text-base ">{trip.description}</p>
                                    </div>
                                )}

                            </div>

                        </div>
                    </TabsContent>

                    {/* Itinerary Tab */}
                    <TabsContent value="itinerary" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Full Itinerary</h2>


                            {/* Back to Trip page */}
                            <Link href={`/trips`}>
                                <Button className="cursor-pointer mt-1.5">
                                    <p>Back to Trips</p>
                                </Button>
                            </Link>
                        </div>

                        {locations.length === 0 ? (
                            <NoLocations tripId={trip.id} />
                        ) : (
                            <div className="space-y-4">
                                {locations
                                    .sort((a, b) => a.order - b.order)
                                    .map((loc, index) => (
                                        <div
                                            key={loc.id}
                                            className="p-4 border rounded-lg bg-gray-50 shadow-sm flex items-start justify-between hover:shadow-md hover:-translate-y-1 transition-transform duration-200"
                                        >
                                            <div className="flex items-start">
                                                <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                                                    {index + 1}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{loc.locationTitle}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Lat: {loc.latitude.toFixed(4)} — Lng: {loc.longitude.toFixed(4)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="h-8 w-8 p-0 flex items-center justify-center cursor-pointer"
                                                    aria-label="Delete Location"
                                                    onClick={() => handleDelete(loc.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Map Tab */}
                    <TabsContent value="map" className="space-y-6">

                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold mb-4">Trip Map</h2>

                            <Link href={`/trips`}>
                                <Button className="cursor-pointer mt-1.5">
                                    <p>Back to Trips</p>
                                </Button>
                            </Link>

                        </div>

                        {locations.length === 0 ? (
                            <NoLocations tripId={trip.id} />
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6">
                                {/* Location List */}
                                <div className="space-y-4">
                                    {locations
                                        .sort((a, b) => a.order - b.order)
                                        .map((loc, i) => (
                                            <div
                                                key={loc.id}
                                                className="p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <h3 className="font-semibold">
                                                    {i + 1}. {loc.locationTitle}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Lat: {loc.latitude.toFixed(4)} — Lng: {loc.longitude.toFixed(4)}
                                                </p>
                                            </div>
                                        ))}
                                </div>

                                {/* Map */}
                                <div className="h-96 rounded-lg overflow-hidden border shadow">
                                    <Map
                                        locations={locations.map((loc) => ({
                                            lat: loc.latitude,
                                            lng: loc.longitude,
                                        }))}
                                        animateMarkers={true}
                                    />
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

