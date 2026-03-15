"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobePreview() {
  const globeEl = useRef<any>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    globeEl.current.pointOfView(
      { lat: 20, lng: 0, altitude: 2.3 },
      2000
    );
  }, []);

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <Globe
        ref={globeEl}
        width={420}
        height={320}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
}