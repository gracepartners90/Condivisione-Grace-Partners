/**
 * Text alternative of a map with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the same
 * data as the dots: regions north → south, the region with most cities, then the names the map draws.
 * No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
 * Wording: copywriter-brand (L4, L6). «Tra queste» only when the map draws names (narrow maps draw
 * fewer than wide ones, so they are examples). A map that draws none, like the one of /citta-digitali/
 * whose nodes are named by the cards beside it, gets no third sentence (ux-designer, 2026-10-05).
 */
import cittaDigitali from '../data/citta-digitali.json';

const REGIONS = ['Lombardia', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']; // ISTAT order, north → south

const perRegion = new Map<string, number>();
for (const c of cittaDigitali.citta) perRegion.set(c.region, (perRegion.get(c.region) ?? 0) + 1);
const unknown = [...perRegion.keys()].filter((r) => !REGIONS.includes(r));
if (unknown.length) throw new Error(`lib/citta-digitali.ts: add ${unknown.join(', ')} to REGIONS`);

const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);

/** `names`: the names the map draws on wide screens, north → south; none for a map without names. */
export function describeCittaDigitali(names: string[] = []): string {
  const regions = REGIONS.filter((r) => perRegion.has(r));
  const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
  const share = mostCount > cittaDigitali.citta.length / 2 ? 'la maggior parte' : 'più che altrove';
  const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
  return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}.${among}`;
}
