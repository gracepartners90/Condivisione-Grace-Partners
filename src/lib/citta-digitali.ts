/**
 * Text alternatives of the maps with the cities of Città Digitali (WCAG 1.1.1, 1.3.1), built from the
 * same data as the dots: regions north → south, the region with most cities, then the names the map draws.
 * No number: a count is a claim (docs/strategia/citta-digitali-elenco.md §4).
 * Wording: copywriter-brand (L4, L6, L7). «Tra queste» only when the map draws names, and only the names
 * drawn at every width, so that each one is on the map on a phone too (ux-designer, 2026-10-06). A map
 * that draws none, like the one of /citta-digitali/ whose nodes are named by the cards beside it, gets no
 * third sentence (ux-designer, 2026-10-05).
 */
import cittaDigitali from '../data/citta-digitali.json';

const REGIONS = ['Lombardia', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']; // ISTAT order, north → south

const perRegion = new Map<string, number>();
for (const c of cittaDigitali.citta) perRegion.set(c.region, (perRegion.get(c.region) ?? 0) + 1);
const unknown = [...perRegion.keys()].filter((r) => !REGIONS.includes(r));
if (unknown.length) throw new Error(`lib/citta-digitali.ts: add ${unknown.join(', ')} to REGIONS`);

const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : (xs[0] ?? ''));
const inRegion = (r: string) => (r === 'Lazio' ? `nel ${r}` : `in ${r}`);

/** «la maggior parte» only above half; otherwise «più che altrove» (copywriter-brand, L4). */
const shareOf = (count: number, total: number) => (count > total / 2 ? 'la maggior parte' : 'più che altrove');

/** `names`: the names the map draws at every width, north → south; none for a map without names. */
export function describeCittaDigitali(names: string[] = []): string {
  const regions = REGIONS.filter((r) => perRegion.has(r));
  const [mostRegion, mostCount] = [...perRegion].sort((a, b) => b[1] - a[1])[0];
  const share = shareOf(mostCount, cittaDigitali.citta.length);
  const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
  return `Carta d’Italia con le città di Città Digitali. Sono in ${andList(regions)}, ${share} ${inRegion(mostRegion)}.${among}`;
}

// The cities of Puglia Digitale are the cities of Puglia in the list (user, 2026-10-06:
// docs/strategia/citta-digitali-elenco.md §4). Provinces north → south, by their capital.
const PROVINCES: Record<string, string> = { FG: 'Foggia', BT: 'Barletta-Andria-Trani', BA: 'Bari', BR: 'Brindisi', TA: 'Taranto', LE: 'Lecce' };
const puglia = cittaDigitali.citta.filter((c) => c.region === 'Puglia');
const perProvince = new Map<string, number>();
for (const c of puglia) perProvince.set(c.province, (perProvince.get(c.province) ?? 0) + 1);
const unknownProvince = [...perProvince.keys()].filter((p) => !PROVINCES[p]);
if (unknownProvince.length) throw new Error(`lib/citta-digitali.ts: add ${unknownProvince.join(', ')} to PROVINCES`);

/**
 * Text alternative of the map of Puglia with the cities of Puglia Digitale (copywriter-brand, L7):
 * the province with most cities, the names the map draws at every width (north → south, without the
 * office) and the office, which the map rings. No list of provinces: all six would read as «tutta la
 * Puglia». Never a number (brand-strategist, §4). About 220 characters: an accessible name is read in
 * one breath (ux-designer, 2026-10-06).
 */
export function describePugliaDigitale(names: string[] = [], office?: string): string {
  const [[most, mostCount], second] = [...perProvince].sort((a, b) => b[1] - a[1]);
  // «la maggior parte» only above half; on a tie no province is named.
  const quota = mostCount > puglia.length / 2 ? 'la maggior parte' : 'più numerose';
  const where = second && second[1] === mostCount ? '' : `, ${quota} nella provincia di ${PROVINCES[most]}`;
  const among = names.length ? ` Tra queste: ${andList(names)}.` : '';
  const ring = office ? ` Un anello segna ${office}, sede di ITnode.` : '';
  return `Carta della Puglia con le città di Puglia Digitale${where}.${among}${ring}`;
}

/**
 * Text alternative of the map of the Terra di Bari (Home chapter 02): the text beside it names no
 * place, so the map is an image. The places it names, west → east as the strip reads, without the
 * office, then the office with its ring: the schema of L7 (copywriter-brand; ux-designer, 2026-10-07).
 */
export function describeTerraDiBari(places: { id: string; name: string; lon: number }[], office?: string): string {
  const names = places.filter((p) => p.id !== office).sort((a, b) => a.lon - b.lon).map((p) => p.name);
  const home = places.find((p) => p.id === office)?.name;
  const among = names.length ? ` con ${andList(names)}` : '';
  const ring = home ? ` Un anello segna ${home}, sede di ITnode.` : '';
  return `Carta della Terra di Bari${among}.${ring}`;
}
