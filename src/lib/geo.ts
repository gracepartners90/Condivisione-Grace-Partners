/**
 * Geographic helpers for the "Coordinate" and "Orizzonte" devices.
 * Bearings and distances are computed at build time from real coordinates.
 */
export type LatLon = { lat: number; lon: number };

const EARTH_RADIUS_KM = 6371.0088;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Great-circle distance in kilometres (haversine). */
export function distanceKm(a: LatLon, b: LatLon): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** Initial bearing from a to b, in degrees 0–360 (0 = north, clockwise). */
export function bearing(a: LatLon, b: LatLon): number {
  const f1 = rad(a.lat);
  const f2 = rad(b.lat);
  const dl = rad(b.lon - a.lon);
  const y = Math.sin(dl) * Math.cos(f2);
  const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

/** "40.90° N · 16.85° E" — decimal degrees at the precision of the source: 2 digits, never
 *  padded (visual direction §1.4, docs/strategia/coordinate-luoghi.md). */
export function formatCoords({ lat, lon }: LatLon): string {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'O';
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lon).toFixed(2)}° ${ew}`;
}

/** "081°" — three-digit bearing. */
export function formatBearing(value: number): string {
  return `${String(Math.round(value) % 360).padStart(3, '0')}°`;
}

/** Italian number formatting for kilometres: "848 km", "6 km". */
export function formatKm(value: number): string {
  return `${Math.round(value).toLocaleString('it-IT')} km`;
}
