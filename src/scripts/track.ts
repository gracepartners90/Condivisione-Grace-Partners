/**
 * Analytics-ready event layer (docs/cro/piano-misurazione.md).
 * No analytics tool is active at launch: events are pushed to an in-memory
 * `window.dataLayer` only. No network requests, no cookies, no storage.
 * Add `?debug_tracking` to the URL to log events in the console.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const debug = new URLSearchParams(window.location.search).has('debug_tracking');
const pageType = document.body.dataset.pageType ?? '';

export function track(event: string, params: Params = {}) {
  const payload: Record<string, unknown> = { event, page_type: pageType };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') payload[key] = value;
  }
  (window.dataLayer ||= []).push(payload);
  if (debug) console.info('[track]', payload);
}

const toSnake = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

// One delegated listener for every element marked [data-track].
document.addEventListener(
  'click',
  (event) => {
    const el = (event.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    const { track: name, ...rest } = el.dataset;
    if (!name) return;

    const params: Params = {};
    for (const [key, value] of Object.entries(rest)) params[toSnake(key)] = value;
    params.cta_text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);

    if (name !== 'contact_click' && el instanceof HTMLAnchorElement && el.href) {
      params.link_url = el.href;
      if (el.hostname && el.hostname !== window.location.hostname) params.link_domain = el.hostname;
    }
    track(name, params);
  },
  { capture: true },
);
