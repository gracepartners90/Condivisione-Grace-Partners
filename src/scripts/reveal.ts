/**
 * Scroll reveal: elements marked [data-reveal] (and apertures) get `is-inview` when they enter
 * the viewport. Content stays visible without JavaScript: CSS hides elements only once
 * `reveal-ready` is set on <html>, which happens here, after the elements already on screen
 * have been marked as shown. Nothing visible at start-up is ever hidden or re-animated: the
 * LCP element is painted in the first frame (docs/performance/architettura.md §6.2).
 */
export {};

const root = document.documentElement;
const elements = document.querySelectorAll<HTMLElement>('[data-reveal], .aperture');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (elements.length > 0 && 'IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-inview');
        observer.unobserve(el);
        // Line reveals: drop the mask once the last line has landed.
        if (el.dataset.reveal === 'lines') {
          const lines = el.querySelectorAll('.line').length;
          window.setTimeout(() => el.classList.add('is-revealed'), 700 + lines * 90 + 100);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );

  // Read every position first, then write: one layout, no thrashing.
  const vh = window.innerHeight;
  const onScreen = Array.from(elements, (el) => {
    const r = el.getBoundingClientRect();
    return r.top < vh && r.bottom > 0;
  });
  elements.forEach((el, i) => {
    if (onScreen[i]) el.classList.add('is-inview', 'is-revealed');
    else observer.observe(el);
  });
  // Last: the hidden states now apply only to elements below the fold.
  root.classList.add('reveal-ready');

  // Keyboard users never chase an invisible focus: reveal the block that receives it.
  document.addEventListener('focusin', (event) => {
    let el = (event.target as Element).closest<HTMLElement>('[data-reveal], .aperture');
    while (el) {
      el.classList.add('is-inview', 'is-revealed');
      el = el.parentElement?.closest<HTMLElement>('[data-reveal], .aperture') ?? null;
    }
  });
}
