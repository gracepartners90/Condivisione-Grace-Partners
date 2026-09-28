export {};

/**
 * Typographic marquee pause control (WCAG 2.2.2 Pause, Stop, Hide).
 * The animation itself is pure CSS; this only toggles `data-paused`.
 */
document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((marquee) => {
  const button = marquee.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
  if (!button) return;
  const labelPause = button.dataset.labelPause ?? 'Metti in pausa';
  const labelPlay = button.dataset.labelPlay ?? 'Riprendi';

  button.addEventListener('click', () => {
    const paused = marquee.dataset.paused !== 'true';
    marquee.dataset.paused = String(paused);
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? labelPlay : labelPause);
  });
});
