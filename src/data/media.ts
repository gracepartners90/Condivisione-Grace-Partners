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
import yesNegozio from '../assets/images/siii-yes-mobile-negozio.jpg';
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

// SIII screenshots sent by the user on 2026-10-07: desktop 2000 × 1250 (16:10), mobile 1200 × 2000 (3:5); on
// 2026-10-08 the YES shop, mobile 1200 × 2000, for the /siii/ hero (user request).
// Unused views stay in src/assets/images/ for the creative-director (siii-*-mobile-*, Masseria's other view).
// Alt texts: docs/contenuti/alt-text.md v1.6 («Nel sito»). They describe the view, not the controls drawn
// in it (docs/ux/accessibilita.md §2.8). On /siii/ the examples do not repeat the business name: the h3
// right after the image says it.

/** Home, chapter 01: a SIII in use, inside the space, with its menu and hotspots. */
export const siiiHomeScreen = {
  image: santellaInterno,
  alt: 'Il SIII di Masseria Santella: una sala con la volta bianca e una porta a vetri ad arco aperta sugli altri ambienti, con il menu e i punti interattivi.',
};

/**
 * /siii/ hero: an experience on a smartphone (Porta 3:5 on desktop, 4:5 below the text). It is the LCP
 * element at every width, so it must stay within the LCP image budget (docs/performance/budget.md §4:
 * AVIF ≤ 60 KB in every phone variant, ≤ 150 KB on desktop): the 4:5 crop from the top is 54.0 KB in AVIF
 * at 1080 px (from the bottom it would be 64.2), the desktop view 83.7 KB at 1200 px.
 * Alt text: docs/contenuti/alt-text.md v1.10 (the interface is named as a whole: menu and icons are controls).
 */
export const siiiHeroScreen = {
  image: yesNegozio,
  alt: 'Il negozio YES da smartphone: la parete verde, la scala che sale al soppalco, gli scaffali di legno e l’interfaccia dell’esperienza.',
};

/** /siii/ examples, by showcase id (site.ts): the opening view of each experience. */
export const siiiExampleScreens = {
  'masseria-santella': {
    image: santellaIngresso,
    alt: 'La schermata d’avvio dell’esperienza: il cancello d’ingresso tra gli alberi in una vista a piccolo pianeta, con il menu.',
  },
  'maison-mimina': {
    image: miminaIngresso,
    alt: 'La schermata d’avvio dell’esperienza: la vetrina su una strada alberata in una vista a piccolo pianeta, con il menu.',
  },
  'dl-natura-dentro': {
    image: dielleIngresso,
    alt: 'La schermata d’avvio dell’esperienza: il vialetto d’ingresso tra le siepi, sotto una palma, in una vista a piccolo pianeta, con il menu.',
  },
} as const;
