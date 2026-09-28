/**
 * JSON-LD builders (docs/seo/dati-strutturati.md). One @graph per page, entities linked
 * through stable @id values. Only data visible on the site is described; nodes with
 * missing required data are not published.
 */
import { site, founder, portals } from '../data/site';
import { pages, crumbsFor, type PageId } from '../data/pages';

const abs = (path: string) => new URL(path, site.url).href;

export const ids = {
  organization: abs('/#organization'),
  logo: abs('/#logo'),
  website: abs('/#website'),
  founder: abs('/#founder'),
  pugliaBrand: abs('/puglia-digitale/#brand'),
  cittaBrand: abs('/citta-digitali/#brand'),
  siiiService: abs('/siii/#service'),
  video: abs('/citta-digitali/#video'),
};

export type Crumb = { name: string; path: string };

export function organization({ withFounder = false } = {}) {
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['ITNODE', 'itNode'],
    url: abs('/'),
    logo: {
      '@type': 'ImageObject',
      '@id': ids.logo,
      url: abs('/brand/logo-itnode.png'),
      contentUrl: abs('/brand/logo-itnode.png'),
      caption: site.name,
    },
    description:
      'ITnode ha creato Città Digitali e Puglia Digitale, due progetti di digitalizzazione territoriale che portano online luoghi, imprese e attività attraverso Tour Virtuali Interattivi Immersivi.',
    email: site.email,
    telephone: site.phone.display,
    vatID: `IT${site.vatId}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street.replace('’', "'"),
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.province,
      addressCountry: site.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.phone.display,
      email: site.email,
      availableLanguage: 'it',
    },
    brand: [
      {
        '@type': 'Brand',
        '@id': ids.pugliaBrand,
        name: portals.pugliaDigitale.name,
        url: `${portals.pugliaDigitale.url}/`,
        description: 'Piattaforma interattiva immersiva per la valorizzazione territoriale.',
      },
      {
        '@type': 'Brand',
        '@id': ids.cittaBrand,
        name: portals.cittaDigitali.name,
        url: `${portals.cittaDigitali.url}/`,
        description: 'Tour virtuali, Siti Interattivi Immersivi e strumenti digitali per il tessuto imprenditoriale e commerciale italiano.',
      },
    ],
    ...(withFounder ? { founder: { '@id': ids.founder } } : {}),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs('/'),
    name: site.name,
    alternateName: 'ITNODE',
    inLanguage: 'it',
    publisher: { '@id': ids.organization },
  };
}

export function webPage(id: PageId, opts: { about?: string; type?: 'WebPage' | 'ContactPage'; videoId?: string } = {}) {
  const meta = pages[id];
  const url = abs(meta.path);
  const hasCrumbs = crumbsFor(id).length > 0;
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title.replace(/\s\|\sITnode$/, ''),
    description: meta.description,
    inLanguage: 'it',
    isPartOf: { '@id': ids.website },
    ...(opts.about ? { about: { '@id': opts.about } } : {}),
    ...(hasCrumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(opts.videoId ? { video: { '@id': opts.videoId } } : {}),
  };
}

export function breadcrumbList(id: PageId) {
  const url = abs(pages[id].path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbsFor(id).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/** Published only on the Home, where name, role and LinkedIn link are visible. No image until a real photo is confirmed. */
export function person() {
  return {
    '@type': 'Person',
    '@id': ids.founder,
    name: founder.name,
    jobTitle: 'Fondatore',
    worksFor: { '@id': ids.organization },
    sameAs: [founder.linkedin],
  };
}

export function siiiService() {
  return {
    '@type': 'Service',
    '@id': ids.siiiService,
    name: 'SIII – Siti Interattivi Immersivi',
    serviceType: 'Sito Interattivo Immersivo',
    description:
      'Il SIII replica digitalmente gli spazi fisici dell’impresa e crea un ambiente navigabile da desktop e smartphone, in cui esplorare gli ambienti, interagire con hotspot, vedere prodotti e video, richiedere informazioni e prenotare servizi.',
    provider: { '@id': ids.organization },
    url: abs('/siii/'),
  };
}

export type VideoData = {
  name?: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
};

/** VideoObject only when Google's required fields exist: never invented values. */
export function videoObject(video: VideoData) {
  if (!video.name || !video.thumbnailUrl || !video.uploadDate) return null;
  return {
    '@type': 'VideoObject',
    '@id': ids.video,
    name: video.name,
    ...(video.description ? { description: video.description } : {}),
    thumbnailUrl: abs(video.thumbnailUrl),
    uploadDate: video.uploadDate,
    ...(video.duration ? { duration: video.duration } : {}),
    ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
  };
}

/** Standard graph for a page: Organization, WebSite, WebPage (+ BreadcrumbList on inner pages). */
export function pageGraph(id: PageId, extra: object[] = [], opts: Parameters<typeof webPage>[1] = {}) {
  const nodes: object[] = [organization({ withFounder: id === 'home' }), website(), webPage(id, opts)];
  if (crumbsFor(id).length) nodes.push(breadcrumbList(id));
  return nodes.concat(extra);
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
