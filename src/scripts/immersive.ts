export {};

/**
 * Immersive preview facade: the third-party experience (iframe) loads only on request.
 * Markup provides [data-immersive] with data-embed-src and data-embed-title.
 */
document.querySelectorAll<HTMLElement>('[data-immersive]').forEach((root) => {
  const trigger = root.querySelector<HTMLButtonElement>('[data-immersive-load]');
  const stage = root.querySelector<HTMLElement>('[data-immersive-stage]');
  const src = root.dataset.embedSrc;
  if (!trigger || !stage || !src) return;

  trigger.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = root.dataset.embedTitle ?? '';
    iframe.allow = 'fullscreen; xr-spatial-tracking; gyroscope; accelerometer';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';
    stage.replaceChildren(iframe);
    root.dataset.state = 'loaded';
    iframe.focus();
  });
});
