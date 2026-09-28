/**
 * Large video sections with minimal custom controls.
 * - preload="none" in markup; nothing downloads until play.
 * - Muted autoplay only when the section is mostly in view, and never with
 *   prefers-reduced-motion or Save-Data. Pauses when it leaves the viewport.
 */
import { track } from './track';

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
  const videoId = root.dataset.videoId ?? 'video';
  const videoTitle = root.dataset.videoTitle ?? '';
  let pausedByUser = false;
  let startedBy: 'autoplay' | 'utente' | null = null;
  let tracked = false;
  const milestones = new Set<number>();

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

  const play = (trigger: 'autoplay' | 'utente') => {
    startedBy ??= trigger;
    return video.play().catch(() => sync());
  };

  toggle.addEventListener('click', () => {
    if (video.paused || video.ended) {
      pausedByUser = false;
      play('utente');
    } else {
      pausedByUser = true;
      video.pause();
    }
  });

  mute?.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) track('video_unmute', { video_id: videoId, video_current_time: Math.round(video.currentTime) });
    sync();
  });

  video.addEventListener('play', () => {
    if (tracked) return;
    tracked = true;
    track('video_start', { video_id: videoId, video_title: videoTitle, video_trigger: startedBy ?? 'utente' });
  });
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const percent = (video.currentTime / video.duration) * 100;
    for (const mark of [25, 50, 75]) {
      if (percent >= mark && !milestones.has(mark)) {
        milestones.add(mark);
        track('video_progress', { video_id: videoId, video_percent: mark });
      }
    }
  });
  video.addEventListener('ended', () => track('video_complete', { video_id: videoId }));

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
            play('autoplay');
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
