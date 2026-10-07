/**
 * Client images used on more than one page, with their alt text (docs/contenuti/alt-text.md).
 * Founder portraits: derived from the client files with the "inchiostro" treatment
 * (scripts/prepare-assets.mjs, docs/creativa/direzione-visiva.md §4.3). The source photos were
 * edited with AI tools, so a transparency note is shown under them (AI Act art. 50):
 * set `showAiNote` to false only after the client and legal counsel say so.
 */
import ritratto from '../assets/images/derivate/fondatore-ritratto.jpg';
import ritrattoContatti from '../assets/images/derivate/fondatore-contatti.jpg';
import santellaInterno from '../assets/images/siii-masseria-santella-desktop-interno.jpg';
import santellaIngresso from '../assets/images/siii-masseria-santella-desktop-ingresso.jpg';
import santellaSala from '../assets/images/siii-masseria-santella-mobile-sala.jpg';
import miminaIngresso from '../assets/images/siii-maison-mimina-desktop-ingresso.jpg';
import dielleIngresso from '../assets/images/siii-dielle-desktop-ingresso.jpg';
import { founder } from './site';

// Portraits: provenance not confirmed (generated or retouched), so the note says both until the
// client answers (review docs/review/2026-09-28-sito-veridicita-brand-strategist.md, I5).
const aiNote = 'Immagine generata o elaborata con strumenti di intelligenza artificiale';
const showAiNote = true;

/**
 * Event photo: the source file carries the watermark of a generative editor (brief I7). Same
 * criterion as the portraits until the client sends the original shot (review B4).
 */
export const eventPhotoNote = 'Immagine elaborata con strumenti di intelligenza artificiale';

// Alt texts from docs/contenuti/alt-text.md ("with the name in the text"), adapted to the
// monochrome crops: no colours that the treated image no longer shows.
export const founderPortrait = {
  image: ritratto,
  alt: `${founder.name} a braccia conserte, in abito scuro.`,
  aiNote: showAiNote ? aiNote : undefined,
};

export const founderPortraitContacts = {
  image: ritrattoContatti,
  alt: `${founder.name} in abito scuro, sorridente.`,
  aiNote: showAiNote ? aiNote : undefined,
};

// SIII screenshots sent by the user on 2026-10-07: desktop 2000 × 1250 (16:10), mobile 1200 × 2000 (3:5).
// Unused views stay in src/assets/images/ for the creative-director (siii-*-mobile-*, Masseria's other view).
// Alt texts follow the patterns of docs/contenuti/alt-text.md («Slot segnaposto»); provisional until
// copywriter-content reviews them.

/** Home, chapter 01: a SIII in use, inside the space, with its menu and hotspots. */
export const siiiHomeScreen = {
  image: santellaInterno,
  alt: 'Masseria Santella nel suo Sito Interattivo Immersivo: una sala con la volta bianca e una porta a vetri ad arco aperta sugli altri ambienti, con il menu delle azioni e i punti interattivi.',
};

/**
 * /siii/ hero: an experience on a smartphone (Porta 3:5 on desktop, 4:5 below the text). It is the LCP
 * element at every width, so it must stay within the LCP image budget (docs/performance/budget.md §4:
 * ≤ 60 KB up to 828 px): this view is 37 KB in AVIF at 828 px; the reception façade, 78 KB, is not.
 */
export const siiiHeroScreen = {
  image: santellaSala,
  alt: 'Masseria Santella su smartphone: una sala con la volta bianca, un divanetto e una porta a vetri aperta sulla stanza accanto, con il menu delle azioni e un punto interattivo.',
};

/** /siii/ examples, by showcase id (site.ts): the opening view of each experience. */
export const siiiExampleScreens = {
  'masseria-santella': {
    image: santellaIngresso,
    alt: 'Masseria Santella nel suo Sito Interattivo Immersivo: il cancello d’ingresso tra i pini in una vista a piccolo pianeta, con il pulsante per entrare nell’esperienza e il menu delle azioni.',
  },
  'maison-mimina': {
    image: miminaIngresso,
    alt: 'Maison Miminà nel suo Sito Interattivo Immersivo: la vetrina sulla strada, tra i pini, in una vista a piccolo pianeta, con il pulsante per entrare nell’esperienza e la barra dei contatti.',
  },
  'dl-natura-dentro': {
    image: dielleIngresso,
    alt: 'D.L. Natura Dentro nel suo Sito Interattivo Immersivo: il vialetto d’ingresso tra le siepi e le palme in una vista a piccolo pianeta, con il pulsante per entrare nell’esperienza e il menu delle azioni.',
  },
} as const;
