"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// Updated Location type (no city/country)
interface LocationType {
    id: string;
    locationTitle: string;
    latitude: number;
    longitude: number;
    order: number;
}

// Dynamic import to prevent SSR errors
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobePage() {
    const params = useParams();
    const tripId = params.tripId;

    const globeEl = useRef<any>(null);

    const [locations, setLocations] = useState<LocationType[]>([]);
    const [loading, setLoading] = useState(false);

    // Convert locations to arcs for globe
    const createArcs = (locations: LocationType[]) => {
        return locations.slice(1).map((loc, i) => ({
            startLat: locations[i].latitude,
            startLng: locations[i].longitude,
            endLat: loc.latitude,
            endLng: loc.longitude,
        }));
    };

    // Fetch locations from API
    const fetchLocations = async () => {
        if (!tripId) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/trips/${tripId}/locations`);
            if (!res.ok) throw new Error(`API error: ${res.status}`);
            const data = await res.json();
            setLocations(data);
        } catch (err) {
            console.error("Failed to fetch locations:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
        const interval = setInterval(fetchLocations, 10000); // refresh every 10s
        return () => clearInterval(interval);
    }, [tripId]);

    // Fly to a specific location safely
    const flyToLoc = (lat: number, lng: number) => {
        if (!globeEl.current) return;
        globeEl.current.pointOfView({ lat, lng, altitude: 1.5 }, 2000);
    };

    // Safe globe controls setup after globe loads
    const onGlobeReady = () => {
        if (!globeEl.current) return;

        const controls = globeEl.current.controls();
        if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.6;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center text-3xl font-semibold mb-8 tracking-tight">
                    Your Travel Journey
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Globe */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-full h-125 overflow-hidden">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            <Globe
                                ref={globeEl}
                                width={500}
                                height={420}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                backgroundColor="rgba(0,0,0,0)"
                                onGlobeReady={onGlobeReady}

                                // Points
                                pointsData={locations}
                                pointLat="latitude"
                                pointLng="longitude"
                                pointLabel={(d) => {
                                    const loc = d as LocationType;
                                    return `<div style="text-align:center"><strong>${loc.locationTitle}</strong></div>`;
                                }}
                                pointColor={() => "#ff6b4a"}
                                pointAltitude={0.35}
                                pointRadius={0.25}
                                onPointClick={(loc: any) => flyToLoc(loc.latitude, loc.longitude)}

                                // Arcs
                                arcsData={createArcs(locations)}
                                arcStartLat="startLat"
                                arcStartLng="startLng"
                                arcEndLat="endLat"
                                arcEndLng="endLng"
                                arcColor={() => ["#00aaff", "#0066ff"]}
                                arcAltitude={0.15}
                                arcStroke={0.9}
                                arcDashLength={0.5}
                                arcDashGap={0.3}
                                arcDashAnimateTime={2500}
                            />
                        </div>
                    </div>

                    {/* Locations List */}
                    <div className="bg-white rounded-xl shadow-lg p-6 max-h-125 overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-6">Locations:</h2>
                        <div className="space-y-3">
                            {locations.map((loc) => (
                                <button
                                    key={loc.id}
                                    onClick={() => flyToLoc(loc.latitude, loc.longitude)}
                                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition"
                                >
                                    <p className="font-semibold">{loc.locationTitle}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}