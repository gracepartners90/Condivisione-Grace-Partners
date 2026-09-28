export {};

/**
 * Large video sections with minimal custom controls.
 * - preload="none" in markup; nothing downloads until play.
 * - Muted autoplay only when the section is mostly in view, and never with
 *   prefers-reduced-motion or Save-Data. Pauses when it leaves the viewport.
 */
type NetworkInformation = { saveData?: boolean };

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = Boolean((navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData);

document.querySelectorAll<HTMLElement>('[data-video]').forEach((root) => {
  const video = root.querySelector<HTMLVideoElement>('video');
  const toggle = root.querySelector<HTMLButtonElement>('[data-video-toggle]');
  const mute = root.querySelector<HTMLButtonElement>('[data-video-mute]');
  if (!video || !toggle) return;

  const labels = {
    play: toggle.dataset.labelPlay ?? 'Riproduci il video',
    pause: toggle.dataset.labelPause ?? 'Metti in pausa il video',
    mute: mute?.dataset.labelMute ?? 'Disattiva l’audio',
    unmute: mute?.dataset.labelUnmute ?? 'Attiva l’audio',
  };
  const autoplay = root.dataset.autoplay === 'true' && !reduceMotion && !saveData;
  let pausedByUser = false;

  const sync = () => {
    const playing = !video.paused && !video.ended;
    root.dataset.state = playing ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', playing ? labels.pause : labels.play);
    toggle.setAttribute('aria-pressed', String(playing));
    if (mute) {
      mute.setAttribute('aria-label', video.muted ? labels.unmute : labels.mute);
      mute.setAttribute('aria-pressed', String(!video.muted));
    }
  };

  const play = () => video.play().catch(() => sync());

  toggle.addEventListener('click', () => {
    if (video.paused || video.ended) {
      pausedByUser = false;
      play();
    } else {
      pausedByUser = true;
      video.pause();
    }
  });

  mute?.addEventListener('click', () => {
    video.muted = !video.muted;
    sync();
  });

  ['play', 'pause', 'ended', 'volumechange'].forEach((type) => video.addEventListener(type, sync));
  video.addEventListener('error', () => {
    root.dataset.state = 'error';
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          if (autoplay && !pausedByUser && video.paused) {
            video.muted = true;
            play();
          }
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0, 0.5] },
    ).observe(root);
  }

  sync();
});
