export async function geocodeLocation(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  const res = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      address
    )}.json?key=${apiKey}`
  );

  const data = await res.json();

  if (!data.features.length) {
    throw new Error("Location not found");
  }

  const [lng, lat] = data.features[0].center;

   return { latitude: lat, longitude: lng }; 
}