/**
 * Gets the distance in meters of the two given points.
 * Assumes that the earth is a perfect sphere.
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 */
export function calculateDistance(
  a: GeolocationPosition,
  b: GeolocationPosition,
): number {
  const RADIUS_EARTH = 6371;
  const lat1 = a.coords.latitude;
  const lat2 = b.coords.latitude;
  const long1 = a.coords.longitude;
  const long2 = b.coords.longitude;

  return (
    inverseHarversineFunction(
      haversineFunction(lat2 - lat1) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          haversineFunction(long2 - long1),
    ) * RADIUS_EARTH
  );
}

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineFunction(deg: number) {
  return Math.pow(Math.sin(toRadians(deg / 2)), 2);
}

function inverseHarversineFunction(deg: number) {
  return 2 * Math.asin(Math.sqrt(deg));
}
