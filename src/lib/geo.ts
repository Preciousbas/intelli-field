import type { Facility, FacilityResult } from '../types';
const R = 6371; // Earth's radius in km
function toRad(d: number) {
  return d * (Math.PI / 180);
}
export function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export function findNearest(
  lat: number,
  lng: number,
  facilities: Facility[],
  opts?: { maxKm?: number; category?: string; state?: string; limit?: number },
): FacilityResult[] {
  const { maxKm, category, state, limit = 25 } = opts ?? {};
  return facilities
    .map((f) => ({ ...f, distance: haversine(lat, lng, f.lat, f.lng) }))
    .filter((f) => {
      if (maxKm && f.distance > maxKm) return false;
      if (category && f.category !== category) return false;
      if (state && f.state !== state) return false;
      return true;
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
export function uniqueValues(facilities: Facility[], key: keyof Facility): string[] {
  return [...new Set(facilities.map((f) => String(f[key])))].sort();
}