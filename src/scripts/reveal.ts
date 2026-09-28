export {};

/**
 * Scroll reveal: elements marked [data-reveal] get `is-inview` when they enter the viewport.
 * Content stays visible without JavaScript: CSS hides elements only once `reveal-ready`
 * is set on <html>, which happens here. Above-the-fold content should use CSS load
 * animations instead of [data-reveal] to avoid a flash.
 */
const root = document.documentElement;
const elements = document.querySelectorAll<HTMLElement>('[data-reveal], .aperture');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (elements.length > 0 && 'IntersectionObserver' in window && !reduceMotion) {
  root.classList.add('reveal-ready');
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
  elements.forEach((el) => observer.observe(el));

  // Keyboard users never chase an invisible focus: reveal the block that receives it.
  document.addEventListener('focusin', (event) => {
    let el = (event.target as Element).closest<HTMLElement>('[data-reveal], .aperture');
    while (el) {
      el.classList.add('is-inview', 'is-revealed');
      el = el.parentElement?.closest<HTMLElement>('[data-reveal], .aperture') ?? null;
    }
  });
}
