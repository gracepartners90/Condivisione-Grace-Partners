/**
 * Header state, mobile menu and in-page anchors (docs/ux/sitemap.md §3–4).
 * - `data-scrolled` on the header once the page leaves the very top (sentinel observed,
 *   no scroll listeners).
 * - Mobile menu is a native <dialog>: showModal() gives focus containment, Esc handling
 *   and an inert background for free.
 * - In-page anchors (e.g. "Parliamone" → #richiesta) move focus to the target's heading
 *   so keyboard and screen-reader users land where the page scrolled.
 */
import { track } from './track';
import { yieldToMain } from './yield';

const header = document.querySelector<HTMLElement>('[data-site-header]');
const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');

if (header && sentinel && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    header.dataset.scrolled = String(!entry.isIntersecting);
  }).observe(sentinel);
}

/** Focus the heading of an in-page target without fighting the scroll. */
function focusAnchorTarget(hash: string) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  const focusable = target.matches('[tabindex]') ? target : target.querySelector<HTMLElement>('[data-anchor-focus]');
  if (!focusable) return;
  requestAnimationFrame(() => focusable.focus({ preventScroll: true }));
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link || link.hash === '#contenuto' || link.closest('[data-mobile-menu]')) return;
  focusAnchorTarget(link.hash);
});

const menu = document.querySelector<HTMLDialogElement>('[data-mobile-menu]');
const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');

if (menu && openButton) {
  const desktop = window.matchMedia('(min-width: 64em)');
  let pendingHash: string | null = null;

  openButton.hidden = false;
  document.documentElement.classList.add('has-menu');

  openButton.addEventListener('click', async () => {
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    await yieldToMain();
    track('menu_open');
  });

  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    if (pendingHash) {
      // A same-page link was chosen: scroll there and focus it instead of "Menu".
      const hash = pendingHash;
      pendingHash = null;
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
      history.pushState(null, '', hash);
      focusAnchorTarget(hash);
      return;
    }
    openButton.focus();
  });

  menu.querySelectorAll<HTMLElement>('[data-menu-close]').forEach((el) => {
    el.addEventListener('click', () => menu.close());
  });

  menu.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const samePage = link.hash && link.pathname === window.location.pathname;
      if (samePage) {
        event.preventDefault();
        pendingHash = link.hash;
      }
      menu.close();
    });
  });

  // Clicking the backdrop (outside the panel) closes the menu.
  menu.addEventListener('click', (event) => {
    if (event.target === menu) menu.close();
  });

  desktop.addEventListener('change', (event) => {
    if (event.matches && menu.open) menu.close();
  });
}
