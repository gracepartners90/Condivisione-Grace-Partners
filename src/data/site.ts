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
  { label: 'SIII', href: '/siii' },
  { label: 'Puglia Digitale', href: '/puglia-digitale' },
  { label: 'Città Digitali', href: '/citta-digitali' },
  { label: 'Contatti', href: '/contatti' },
] as const;

export const portals = {
  cittaDigitali: { name: 'Città Digitali', url: 'https://www.cittadigitali.it', display: 'cittadigitali.it' },
  pugliaDigitale: { name: 'Puglia Digitale', url: 'https://www.lapugliadigitale.it', display: 'lapugliadigitale.it' },
} as const;

export const video = {
  cittaDigitali: 'https://itnode-website-production.up.railway.app/public/video/citta-digitali.mp4?v=2',
} as const;

/** Geographic coordinates are public data (degrees and minutes, town centre). */
export type Place = {
  name: string;
  url: string;
  display: string;
  province: string;
  region: string;
  coords: string;
};

export const pugliaPlaces: Place[] = [
  { name: 'Acquaviva delle Fonti', url: 'https://www.acquavivadigitale.com', display: 'acquavivadigitale.com', province: 'BA', region: 'Puglia', coords: '40°54′N 16°50′E' },
  { name: 'Gravina in Puglia', url: 'https://www.gravinadigitale.it', display: 'gravinadigitale.it', province: 'BA', region: 'Puglia', coords: '40°49′N 16°25′E' },
  { name: 'Monopoli', url: 'https://www.monopolidigitale.it', display: 'monopolidigitale.it', province: 'BA', region: 'Puglia', coords: '40°57′N 17°18′E' },
];

export const italyPlaces: Place[] = [
  { name: 'Varese', url: 'https://www.varesedigitale.it', display: 'varesedigitale.it', province: 'VA', region: 'Lombardia', coords: '45°49′N 8°50′E' },
  { name: 'Altamura', url: 'https://www.altamuradigitale.com', display: 'altamuradigitale.com', province: 'BA', region: 'Puglia', coords: '40°50′N 16°33′E' },
  { name: 'Caltanissetta', url: 'https://www.caltanissettadigitale.it', display: 'caltanissettadigitale.it', province: 'CL', region: 'Sicilia', coords: '37°29′N 14°04′E' },
];

export const siiiShowcase = [
  { name: 'Masseria Santella', url: 'https://www.cassanodigitale.it/masseriasantella/', portal: 'cassanodigitale.it', coords: '40°53′N 16°46′E' },
  { name: 'Maison Miminà', url: 'https://www.monopolidigitale.it/maisonmimina/', portal: 'monopolidigitale.it', coords: '40°57′N 17°18′E' },
  { name: 'D.L. Natura Dentro', url: 'https://www.acquavivadigitale.com/dielle/', portal: 'acquavivadigitale.com', coords: '40°54′N 16°50′E' },
] as const;

/** Contact-form interests; `value` is what gets submitted. */
export const interests = [
  { value: 'siii', label: 'SIII' },
  { value: 'puglia-digitale', label: 'Puglia Digitale' },
  { value: 'citta-digitali', label: 'Città Digitali' },
] as const;

export type InterestValue = (typeof interests)[number]['value'];
