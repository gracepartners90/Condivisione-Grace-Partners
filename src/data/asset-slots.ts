/**
 * Missing client assets. Each slot renders as an intentional placeholder until the file
 * is added to src/assets/images/ and wired in the page. This list is also the asset
 * request sent to the client (see README "Asset da fornire").
 */
export type AssetSlot = {
  label: string;
  spec: string;
  ratio: string;
  alt: string;
  usedIn: string;
};

export const assetSlots = {
  'siii-masseria-santella': {
    label: 'Masseria Santella: schermata dell’esperienza SIII',
    spec: 'JPG/PNG · 16:10 · min. 2400×1500 px',
    ratio: '16 / 10',
    alt: 'Anteprima dell’esperienza immersiva di Masseria Santella',
    usedIn: '/siii (showcase)',
  },
  'siii-maison-mimina': {
    label: 'Maison Miminà: schermata dell’esperienza SIII',
    spec: 'JPG/PNG · 16:10 · min. 2400×1500 px',
    ratio: '16 / 10',
    alt: 'Anteprima dell’esperienza immersiva di Maison Miminà',
    usedIn: '/siii (showcase)',
  },
  'siii-dielle': {
    label: 'D.L. Natura Dentro: schermata dell’esperienza SIII',
    spec: 'JPG/PNG · 16:10 · min. 2400×1500 px',
    ratio: '16 / 10',
    alt: 'Anteprima dell’esperienza immersiva di D.L. Natura Dentro',
    usedIn: '/siii (showcase)',
  },
  'puglia-paesaggio': {
    label: 'Puglia: fotografia di paesaggio (costa o entroterra)',
    spec: 'JPG · 16:9 · min. 2800×1575 px',
    ratio: '16 / 9',
    alt: 'Paesaggio pugliese',
    usedIn: '/puglia-digitale (hero)',
  },
  'luogo-acquaviva': {
    label: 'Acquaviva delle Fonti: fotografia del luogo',
    spec: 'JPG · 4:5 · min. 1600×2000 px',
    ratio: '4 / 5',
    alt: 'Acquaviva delle Fonti',
    usedIn: '/puglia-digitale (I luoghi)',
  },
  'luogo-gravina': {
    label: 'Gravina in Puglia: fotografia del luogo',
    spec: 'JPG · 4:5 · min. 1600×2000 px',
    ratio: '4 / 5',
    alt: 'Gravina in Puglia',
    usedIn: '/puglia-digitale (I luoghi)',
  },
  'luogo-monopoli': {
    label: 'Monopoli: fotografia del luogo',
    spec: 'JPG · 4:5 · min. 1600×2000 px',
    ratio: '4 / 5',
    alt: 'Monopoli',
    usedIn: '/puglia-digitale (I luoghi)',
  },
  'luogo-varese': {
    label: 'Varese: fotografia del luogo',
    spec: 'JPG · 3:2 · min. 2400×1600 px',
    ratio: '3 / 2',
    alt: 'Varese',
    usedIn: '/citta-digitali (L’Italia in un unico portale)',
  },
  'luogo-altamura': {
    label: 'Altamura: fotografia del luogo',
    spec: 'JPG · 3:2 · min. 2400×1600 px',
    ratio: '3 / 2',
    alt: 'Altamura',
    usedIn: '/citta-digitali (L’Italia in un unico portale)',
  },
  'luogo-caltanissetta': {
    label: 'Caltanissetta: fotografia del luogo',
    spec: 'JPG · 3:2 · min. 2400×1600 px',
    ratio: '3 / 2',
    alt: 'Caltanissetta',
    usedIn: '/citta-digitali (L’Italia in un unico portale)',
  },
  'video-poster': {
    label: 'Città Digitali: fotogramma di copertina del video',
    spec: 'JPG · 16:9 · 1920×1080 px',
    ratio: '16 / 9',
    alt: 'Copertina del video di Città Digitali',
    usedIn: '/citta-digitali (video)',
  },
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
