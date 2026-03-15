"use client";

import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY!;

interface MapProps {
  locations: {
    lat: number;
    lng: number;
  }[];
  animateMarkers?: boolean;
}

export default function MapTilerMap({ locations, animateMarkers = false }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markers = useRef<maptilersdk.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center:
          locations.length > 0
            ? [locations[0].lng, locations[0].lat]
            : [73.0479, 33.6844], // Default to Islamabad, Pakistan
        zoom: 6,
      });

      map.current.addControl(new maptilersdk.NavigationControl());
    }

    // Clear old markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add new markers
     locations.forEach((loc, index) => {
  const marker = new maptilersdk.Marker().setLngLat([loc.lng, loc.lat]).addTo(map.current!);

  if (animateMarkers) {
    const el = marker.getElement();
    el.style.opacity = "0";
    el.style.transform = "translateY(-50px)";
    setTimeout(() => {
      el.style.transition = "all 0.5s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  }

  markers.current.push(marker);
});
  }, [locations, animateMarkers]);

  return <div ref={mapContainer} className="w-full h-full rounded-xl border" />;
}