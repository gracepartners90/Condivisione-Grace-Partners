/**
 * Single source of truth for company data, navigation, portals and external experiences.
 * Values marked "DA VERIFICARE" come from public sources and must be confirmed by the client
 * (see docs/brief/brief-consolidato.md).
 */

export const site = {
  name: 'ITnode',
  /** DA VERIFICARE: from the public business registry. */
  legalName: 'ITNODE S.r.l.',
  /** DA VERIFICARE: from the public business registry. */
  vatId: '08937270729',
  url: 'https://itnode.it',
  locale: 'it_IT',
  language: 'it-IT',
  email: 'info@itnode.it',
  phone: { display: '+39 080 2466520', href: 'tel:+390802466520' },
  mobile: { display: '+39 335 1229785', href: 'tel:+393351229785' },
  address: {
    label: 'Sede operativa',
    street: 'Via Sant’Anna, 34',
    postalCode: '70021',
    locality: 'Acquaviva delle Fonti',
    province: 'BA',
    region: 'Puglia',
    country: 'IT',
  },
  /** Missing mandatory company data (art. 2250 c.c.): rendered only when provided. */
  rea: '',
  shareCapital: '',
} as const;

/** DA VERIFICARE: the founder's name comes from the LinkedIn profile listed among the contacts. */
export const founder = {
  name: 'Giacomo Lenoci',
  role: 'Fondatore di ITnode',
  linkedin: 'https://www.linkedin.com/in/giacomo-lenoci/',
} as const;

export const nav = [
  { id: 'siii', label: 'SIII', href: '/siii/' },
  { id: 'puglia-digitale', label: 'Puglia Digitale', href: '/puglia-digitale/' },
  { id: 'citta-digitali', label: 'Città Digitali', href: '/citta-digitali/' },
  { id: 'contatti', label: 'Contatti', href: '/contatti/' },
] as const;

export const portals = {
  cittaDigitali: { name: 'Città Digitali', url: 'https://www.cittadigitali.it', display: 'cittadigitali.it' },
  pugliaDigitale: { name: 'Puglia Digitale', url: 'https://www.lapugliadigitale.it', display: 'lapugliadigitale.it' },
} as const;

export const video = {
  cittaDigitali: 'https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2',
} as const;

/**
 * Places. Coordinates are public data (town centre, decimal degrees, 4 digits) and must be
 * checked before launch (docs/creativa/direzione-visiva.md §1.4). Bearings and distances
 * from the ITnode office are computed from them in src/lib/geo.ts.
 */
export type Place = {
  id: string;
  name: string;
  province: string;
  region: string;
  lat: number;
  lon: number;
  url?: string;
  display?: string;
};

export const office: Place = {
  id: 'acquaviva',
  name: 'Acquaviva delle Fonti',
  province: 'BA',
  region: 'Puglia',
  lat: 40.8957,
  lon: 16.8412,
};

export const pugliaPlaces: Place[] = [
  { id: 'acquaviva', name: 'Acquaviva delle Fonti', province: 'BA', region: 'Puglia', lat: 40.8957, lon: 16.8412, url: 'https://www.acquavivadigitale.com', display: 'acquavivadigitale.com' },
  { id: 'gravina', name: 'Gravina in Puglia', province: 'BA', region: 'Puglia', lat: 40.8196, lon: 16.4231, url: 'https://www.gravinadigitale.it', display: 'gravinadigitale.it' },
  { id: 'monopoli', name: 'Monopoli', province: 'BA', region: 'Puglia', lat: 40.95, lon: 17.3, url: 'https://www.monopolidigitale.it', display: 'monopolidigitale.it' },
];

export const italyPlaces: Place[] = [
  { id: 'varese', name: 'Varese', province: 'VA', region: 'Lombardia', lat: 45.8206, lon: 8.8251, url: 'https://www.varesedigitale.it', display: 'varesedigitale.it' },
  { id: 'altamura', name: 'Altamura', province: 'BA', region: 'Puglia', lat: 40.8286, lon: 16.5528, url: 'https://www.altamuradigitale.com', display: 'altamuradigitale.com' },
  { id: 'caltanissetta', name: 'Caltanissetta', province: 'CL', region: 'Sicilia', lat: 37.49, lon: 14.0617, url: 'https://www.caltanissettadigitale.it', display: 'caltanissettadigitale.it' },
];

/** Places on the Home horizon: every town where ITnode's three worlds are online. */
export const horizonPlaces: Place[] = [
  pugliaPlaces[2],
  { id: 'cassano', name: 'Cassano delle Murge', province: 'BA', region: 'Puglia', lat: 40.8906, lon: 16.77 },
  italyPlaces[1],
  pugliaPlaces[1],
  italyPlaces[2],
  italyPlaces[0],
];

export const siiiShowcase = [
  { id: 'masseria-santella', name: 'Masseria Santella', place: 'Cassano delle Murge (BA)', lat: 40.8906, lon: 16.77, url: 'https://www.cassanodigitale.it/masseriasantella/', portal: 'cassanodigitale.it', slot: 'siii-masseria-santella' },
  { id: 'maison-mimina', name: 'Maison Miminà', place: 'Monopoli (BA)', lat: 40.95, lon: 17.3, url: 'https://www.monopolidigitale.it/maisonmimina/', portal: 'monopolidigitale.it', slot: 'siii-maison-mimina' },
  { id: 'dl-natura-dentro', name: 'D.L. Natura Dentro', place: 'Acquaviva delle Fonti (BA)', lat: 40.8957, lon: 16.8412, url: 'https://www.acquavivadigitale.com/dielle/', portal: 'acquavivadigitale.com', slot: 'siii-dielle' },
] as const;

/** Contact-form interests; `value` is what gets submitted. */
export const interests = [
  { value: 'siii', label: 'SIII' },
  { value: 'puglia-digitale', label: 'Puglia Digitale' },
  { value: 'citta-digitali', label: 'Città Digitali' },
] as const;

export type InterestValue = (typeof interests)[number]['value'];
