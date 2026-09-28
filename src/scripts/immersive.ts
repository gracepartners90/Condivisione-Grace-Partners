import { track } from './track';

/**
 * Immersive preview facade: the third-party experience (iframe) loads only on request.
 * Markup provides [data-immersive] with data-embed-src and data-embed-title.
 */
document.querySelectorAll<HTMLElement>('[data-immersive]').forEach((root) => {
  const trigger = root.querySelector<HTMLButtonElement>('[data-immersive-load]');
  const stage = root.querySelector<HTMLElement>('[data-immersive-stage]');
  const src = root.dataset.embedSrc;
  if (!trigger || !stage || !src) return;

  // Warm up the connection only on intent, once per origin.
  const warm = () => {
    const origin = new URL(src, window.location.href).origin;
    if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
    document.head.append(Object.assign(document.createElement('link'), { rel: 'preconnect', href: origin }));
  };
  trigger.addEventListener('pointerenter', warm, { once: true });
  trigger.addEventListener('focus', warm, { once: true });

  trigger.addEventListener('click', () => {
    track('preview_start', { experience_id: root.dataset.experienceId, cta_location: 'showcase' });
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = root.dataset.embedTitle ?? '';
    iframe.allow = 'fullscreen; xr-spatial-tracking; gyroscope; accelerometer';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    stage.replaceChildren(iframe);
    root.dataset.state = 'loaded';
    iframe.focus();
  });
});
