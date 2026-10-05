/**
 * Page metadata: single source for <title>, meta description, breadcrumb labels and indexing.
 * Texts come from docs/seo/mappa-keyword-url.md (seo-content), rules from
 * docs/seo/specifiche-tecniche.md (seo-technical). Canonical paths end with "/".
 */

export const DEFAULT_OG_IMAGE = '/og/default.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'ITnode: esperienze digitali immersive per imprese e territori';

export type PageId = 'home' | 'siii' | 'puglia-digitale' | 'citta-digitali' | 'contatti' | 'privacy-policy' | 'cookie-policy' | '404';

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Label used in the visible breadcrumb and in BreadcrumbList. */
  crumb: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
};

export const pages: Record<PageId, PageMeta> = {
  home: {
    path: '/',
    title: 'ITnode | Esperienze immersive per imprese e territori',
    description:
      'ITnode rende esplorabili sul Web gli spazi di imprese e territori con i Siti Interattivi Immersivi (SIII) e i progetti Puglia Digitale e Città Digitali.',
    crumb: 'Home',
  },
  siii: {
    path: '/siii/',
    title: 'SIII, Siti Interattivi Immersivi oltre il tour 360° | ITnode',
    description:
      'Il SIII replica gli spazi della tua azienda in un ambiente da esplorare da desktop e smartphone: hotspot, prodotti, video, richieste e prenotazioni.',
    crumb: 'SIII',
  },
  'puglia-digitale': {
    path: '/puglia-digitale/',
    title: 'Puglia Digitale: destination marketing immersivo | ITnode',
    description:
      'Puglia Digitale è una piattaforma di destination marketing che digitalizza e valorizza città, borghi e imprese pugliesi con esperienze immersive.',
    crumb: 'Puglia Digitale',
  },
  'citta-digitali': {
    path: '/citta-digitali/',
    title: 'Città Digitali: le attività del territorio online | ITnode',
    description:
      'Città Digitali è il portale con cui ITnode porta online le attività di città come Varese, Altamura e Caltanissetta con tour virtuali e strumenti digitali.',
    crumb: 'Città Digitali',
  },
  contatti: {
    path: '/contatti/',
    title: 'Contatti, Acquaviva delle Fonti (BA) | ITnode',
    description:
      'Parliamo del tuo prossimo spazio digitale: SIII, Puglia Digitale o Città Digitali. ITnode, Via Sant’Anna, 34, Acquaviva delle Fonti (BA). Tel. 080 2466520.',
    crumb: 'Contatti',
  },
  'privacy-policy': {
    path: '/privacy-policy/',
    title: 'Privacy Policy | ITnode',
    description:
      'Come ITnode tratta i dati personali inviati con il modulo di contatto: chi è il titolare, quali dati raccoglie, perché li usa e quali diritti hai.',
    crumb: 'Privacy Policy',
  },
  'cookie-policy': {
    path: '/cookie-policy/',
    title: 'Cookie Policy | ITnode',
    description:
      'Quali cookie usa il sito di ITnode e a che cosa servono: nessun cookie di profilazione né di statistica, solo eventuali cookie tecnici necessari.',
    crumb: 'Cookie Policy',
  },
  '404': {
    path: '/404/',
    title: 'Pagina non trovata | ITnode',
    description:
      'La pagina che cerchi non esiste più o è stata spostata. Riparti dalla home di ITnode oppure esplora SIII, Puglia Digitale e Città Digitali.',
    crumb: 'Pagina non trovata',
    noindex: true,
  },
};

/** Breadcrumb trail for an inner page: Home › Page. */
export function crumbsFor(id: PageId) {
  if (id === 'home') return [];
  return [
    { name: pages.home.crumb, path: pages.home.path },
    { name: pages[id].crumb, path: pages[id].path },
  ];
}
