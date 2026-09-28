/**
 * Missing client assets. Each slot renders as a declared placeholder (docs/creativa/
 * direzione-visiva.md §4.5) until the file is added to src/assets/images/ and wired in the
 * page. This list is also the asset request sent to the client (README, "Asset da fornire").
 * Formats come from the visual direction §1.2: Porta 3:5 (places), Schermo 16:10 (SIII),
 * Video 16:9.
 *
 * Two modes (visual direction §4.5): `staging` (default) shows what is requested;
 * `publish` (PUBLIC_SLOT_MODE=publish) shows a typographic variant with no service text,
 * for a go-live without some assets. The flag is explicit: a preview is also a production build.
 */
import { office } from './site';
import { bearing, distanceKm, formatBearing, formatCoords, formatKm } from '../lib/geo';

export const SLOT_MODE: 'staging' | 'publish' = import.meta.env.PUBLIC_SLOT_MODE === 'publish' ? 'publish' : 'staging';

/** Typographic variant shown in `publish` mode. */
export type SlotPublish = {
  kind: 'place' | 'experience';
  name?: string;
  /** Mono lines under the name or the horizon; each line breaks only at « · ». */
  meta?: string[];
  /** Hotspot positions (%) for experiences, above the horizon (62%). */
  nodes?: { x: number; y: number }[];
};

export type AssetSlot = {
  kind: 'foto' | 'screenshot' | 'poster video';
  /** What the asset must show: a brief for whoever produces it, never a claim. */
  label: string;
  spec: string;
  /** Short format shown in the corner of the placeholder, e.g. "3:5". */
  format: string;
  ratio: string;
  alt: string;
  usedIn: string;
  /** Place slots show the coordinates of the place. */
  coords?: { lat: number; lon: number };
  publish: SlotPublish;
};

// Place meta from the office: bearing and distance (or «Sede» for Acquaviva itself), then coordinates.
const placeMeta = (lat: number, lon: number) => {
  const here = { lat, lon };
  const km = distanceKm(office, here);
  return [km < 1 ? 'Sede' : `${formatBearing(bearing(office, here))} · ${formatKm(km)}`, formatCoords(here)];
};

// At eye level, just above the horizon (62%): clear of the name even on a 16:10 phone screen.
const hotspots = [
  { x: 22, y: 50 },
  { x: 55, y: 47 },
  { x: 80, y: 51 },
];

const place = (name: string, lat: number, lon: number, usedIn: string): AssetSlot => ({
  kind: 'foto',
  label: `${name}: fotografia reale del luogo, luce naturale, orizzonte visibile.`,
  spec: 'Formato verticale 3:5, lato lungo di almeno 2400 px.',
  format: '3:5',
  ratio: '3 / 5',
  alt: name,
  usedIn,
  coords: { lat, lon },
  publish: { kind: 'place', name, meta: placeMeta(lat, lon) },
});

const siii = (name: string, place: string): AssetSlot => ({
  kind: 'screenshot',
  label: `${name}: schermata dell’esperienza SIII, vista desktop.`,
  spec: 'Formato 16:10, almeno 2560 × 1600 px, più la vista mobile.',
  format: '16:10',
  ratio: '16 / 10',
  alt: `Anteprima dell’esperienza immersiva di ${name}`,
  usedIn: '/ e /siii/ (showcase)',
  publish: { kind: 'experience', name, meta: [place], nodes: hotspots },
});

const slots = {
  'siii-masseria-santella': siii('Masseria Santella', 'Cassano delle Murge (BA)'),
  'siii-maison-mimina': siii('Maison Miminà', 'Monopoli (BA)'),
  'siii-dielle': siii('D.L. Natura Dentro', 'Acquaviva delle Fonti (BA)'),
  'siii-anteprima': {
    kind: 'screenshot',
    label: 'Un’esperienza SIII vista da smartphone, in verticale.',
    spec: 'Formato verticale 3:5, almeno 1200 × 2000 px.',
    format: '3:5',
    ratio: '3 / 5',
    alt: 'Anteprima di un’esperienza SIII su smartphone',
    usedIn: '/siii/ (hero)',
    publish: { kind: 'experience', nodes: [{ x: 30, y: 28 }, { x: 70, y: 40 }, { x: 44, y: 52 }] },
  },
  'luogo-acquaviva': place('Acquaviva delle Fonti', 40.8957, 16.8412, '/puglia-digitale/ (I luoghi)'),
  'luogo-gravina': place('Gravina in Puglia', 40.8196, 16.4231, '/puglia-digitale/ (I luoghi)'),
  'luogo-monopoli': place('Monopoli', 40.95, 17.3, '/puglia-digitale/ (I luoghi)'),
  'video-poster': {
    kind: 'poster video',
    label: 'Città Digitali: fotogramma di copertina del video.',
    spec: 'Video 16:9, 1920 × 1080 px.',
    format: '16:9',
    ratio: '16 / 9',
    alt: 'Copertina del video di Città Digitali',
    usedIn: '/citta-digitali/ (video)',
    // The video cover is already typographic (VideoSection): no slot is rendered for it.
    publish: { kind: 'experience' },
  },
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof slots;
export const assetSlots: Record<AssetSlotId, AssetSlot> = slots;

/** Slot of a place door (`luogo-<id>`); fails the build if the slot is not declared. */
export const placeSlot = (placeId: string): AssetSlotId => {
  const id = `luogo-${placeId}`;
  if (!(id in slots)) throw new Error(`asset-slots: no slot declared for ${id}`);
  return id as AssetSlotId;
};
