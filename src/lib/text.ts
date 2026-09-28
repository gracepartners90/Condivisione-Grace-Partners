/**
 * Small typographic helpers for visible text (docs/contenuti/tone-of-voice.md §7).
 * Keep raw values in the data: the JSON-LD needs plain spaces.
 */

/** Non-breaking spaces, e.g. in phone numbers that must not wrap. */
export const nb = (s: string) => s.replace(/ /g, ' ');
