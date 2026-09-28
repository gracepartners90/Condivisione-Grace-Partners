/**
 * JSON-LD builders. Entities are linked through stable @id values so every page
 * publishes one coherent graph. Only data visible on the site is described.
 */
import { site, founder } from '../data/site';

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  founder: `${site.url}/#founder`,
};

export type Crumb = { name: string; path: string };

const abs = (path: string) => new URL(path, site.url).href;

export function organization(logoUrl?: string) {
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: site.name,
    legalName: site.legalName,
    url: abs('/'),
    ...(logoUrl ? { logo: { '@type': 'ImageObject', url: abs(logoUrl) } } : {}),
    email: site.email,
    telephone: site.phone.display,
    vatID: `IT${site.vatId}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.province,
      addressCountry: site.address.country,
    },
    founder: { '@id': ids.founder },
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs('/'),
    name: site.name,
    inLanguage: site.language,
    publisher: { '@id': ids.organization },
  };
}

export function webPage(opts: { path: string; title: string; description: string; crumbs?: Crumb[]; imageUrl?: string; about?: string[] }) {
  const url = abs(opts.path);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: site.language,
    isPartOf: { '@id': ids.website },
    publisher: { '@id': ids.organization },
    ...(opts.crumbs?.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(opts.imageUrl ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(opts.imageUrl) } } : {}),
    ...(opts.about?.length ? { about: opts.about.map((name) => ({ '@type': 'Thing', name })) } : {}),
  };
}

export function breadcrumbList(path: string, crumbs: Crumb[]) {
  const url = abs(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function person(imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': ids.founder,
    name: founder.name,
    jobTitle: 'Fondatore',
    worksFor: { '@id': ids.organization },
    sameAs: [founder.linkedin],
    ...(imageUrl ? { image: abs(imageUrl) } : {}),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
