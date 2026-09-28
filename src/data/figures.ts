/**
 * Client figures. They are published only with their source (docs/cro/strategia-conversione.md
 * §9, brief N1–N3): fill the update date when the client provides it.
 */

/** DA FORNIRE: month and year of the Puglia Digitale figures, e.g. 'settembre 2026'. */
const pugliaUpdated = '';

export const figures = {
  puglia: {
    source: pugliaUpdated ? `Dati ITnode, aggiornati a ${pugliaUpdated}.` : 'Dati ITnode.',
  },
} as const;
