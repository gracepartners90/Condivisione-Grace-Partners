/**
 * Large video sections with minimal custom controls (docs/performance/architettura.md §4).
 * - preload="none" and no poster attribute: nothing downloads until play; the cover is a
 *   lazy <picture> overlaid on the video and hidden on the first rendered frame.
 * - Muted autoplay only on desktop (≥ 64em), when the section is mostly in view, and never with
 *   prefers-reduced-motion, Save-Data or 2G. Pauses when it leaves the viewport.
 */
import { track } from './track';

type Connection = { saveData?: boolean; effectiveType?: string };

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = window.matchMedia('(min-width: 64em)');
const conn = (navigator as Navigator & { connection?: Connection }).connection;
const lowData = Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? '');

document.querySelectorAll<HTMLElement>('[data-video]').forEach((root) => {
  const video = root.querySelector<HTMLVideoElement>('video');
  const toggle = root.querySelector<HTMLButtonElement>('[data-video-toggle]');
  const mute = root.querySelector<HTMLButtonElement>('[data-video-mute]');
  const time = root.querySelector<HTMLElement>('[data-video-time]');
  const cover = root.querySelector<HTMLElement>('[data-video-cover]');
  const fullscreen = root.querySelector<HTMLButtonElement>('[data-video-fullscreen]');
  const errorBox = root.querySelector<HTMLElement>('[data-video-error]');
  if (!video || !toggle) return;

  const labels = {
    play: toggle.dataset.labelPlay ?? 'Riproduci il video',
    pause: toggle.dataset.labelPause ?? 'Metti in pausa il video',
    mute: mute?.dataset.labelMute ?? 'Disattiva l’audio',
    unmute: mute?.dataset.labelUnmute ?? 'Attiva l’audio',
  };
  const autoplayWanted = root.dataset.autoplay === 'true' && !reduceMotion && !lowData;
  const videoId = root.dataset.videoId ?? 'video';
  const videoTitle = root.dataset.videoTitle ?? '';
  let pausedByUser = false;
  let startedBy: 'autoplay' | 'utente' | null = null;
  let tracked = false;
  const milestones = new Set<number>();
  let shownSecond = -1;

  const sync = () => {
    const playing = !video.paused && !video.ended;
    root.dataset.state = playing ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', playing ? labels.pause : labels.play);
    if (mute) mute.setAttribute('aria-label', video.muted ? labels.unmute : labels.mute);
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

  // The cover is a large pointer target for the same action as the play button.
  cover?.addEventListener('click', () => toggle.click());

  fullscreen?.addEventListener('click', () => {
    const v = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (video.requestFullscreen) video.requestFullscreen().catch(() => v.webkitEnterFullscreen?.());
    else v.webkitEnterFullscreen?.();
    if (video.paused) play('utente');
  });

  mute?.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) track('video_unmute', { video_id: videoId, video_current_time: Math.round(video.currentTime) });
    sync();
  });

  ['play', 'pause', 'ended', 'volumechange'].forEach((type) => video.addEventListener(type, sync));

  // Hide the cover on the first rendered frame, not on 'play': no black flash.
  video.addEventListener('playing', () => (root.dataset.ready = ''), { once: true });

  // Counted on the first rendered frame: 'play' fires even when the file then fails to load.
  video.addEventListener('playing', () => {
    if (tracked) return;
    tracked = true;
    track('video_start', { video_id: videoId, video_title: videoTitle, video_trigger: startedBy ?? 'utente' });
  });

  video.addEventListener('timeupdate', () => {
    const s = Math.floor(video.currentTime);
    if (time && s !== shownSecond) {
      shownSecond = s;
      time.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    }
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
  video.addEventListener('error', () => {
    root.dataset.state = 'error';
    if (errorBox) errorBox.textContent = errorBox.dataset.text ?? '';
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          if (autoplayWanted && desktop.matches && !pausedByUser && video.paused) {
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
