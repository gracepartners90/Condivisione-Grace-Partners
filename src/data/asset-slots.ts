/**
 * Missing client assets. Each slot renders as a declared placeholder (docs/creativa/
 * direzione-visiva.md §4.5) until the file is added to src/assets/images/ and wired in the
 * page. This list is also the asset request sent to the client (README, "Asset da fornire").
 * Formats come from the visual direction §1.2: Porta 3:5 (places), Schermo 16:10 (SIII),
 * Video 16:9.
 */
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
};

const place = (name: string, lat: number, lon: number, usedIn: string): AssetSlot => ({
  kind: 'foto',
  label: `${name}: fotografia reale del luogo, luce naturale, orizzonte visibile.`,
  spec: 'Formato verticale 3:5, lato lungo di almeno 2400 px.',
  format: '3:5',
  ratio: '3 / 5',
  alt: name,
  usedIn,
  coords: { lat, lon },
});

const siii = (name: string): AssetSlot => ({
  kind: 'screenshot',
  label: `${name}: schermata dell’esperienza SIII, vista desktop.`,
  spec: 'Formato 16:10, almeno 2560 × 1600 px, più la vista mobile.',
  format: '16:10',
  ratio: '16 / 10',
  alt: `Anteprima dell’esperienza immersiva di ${name}`,
  usedIn: '/ e /siii/ (showcase)',
});

export const assetSlots = {
  'siii-masseria-santella': siii('Masseria Santella'),
  'siii-maison-mimina': siii('Maison Miminà'),
  'siii-dielle': siii('D.L. Natura Dentro'),
  'siii-anteprima': {
    kind: 'screenshot',
    label: 'Un’esperienza SIII vista da smartphone, in verticale.',
    spec: 'Formato verticale 3:5, almeno 1200 × 2000 px.',
    format: '3:5',
    ratio: '3 / 5',
    alt: 'Anteprima di un’esperienza SIII su smartphone',
    usedIn: '/siii/ (hero)',
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
  },
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
