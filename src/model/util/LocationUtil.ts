/**
 * Gets the distance in meters between two given points.
 * Assumes that the earth is a perfect sphere.
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 */
export function calculateDistance(
  a: GeolocationPosition,
  b: GeolocationPosition,
): number {
  const RADIUS_EARTH = 6371000; // in meters
  const lat1 = toRadians(a.coords.latitude);
  const lat2 = toRadians(b.coords.latitude);
  const deltaLat = lat2 - lat1;
  const deltaLon = toRadians(b.coords.longitude - a.coords.longitude);

  const hav =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
  return RADIUS_EARTH * c;
}

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}
