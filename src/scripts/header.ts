export {};

/**
 * Header state and mobile menu.
 * - `data-scrolled` on the header once the page leaves the very top (sentinel observed).
 * - Mobile menu is a native <dialog>: showModal() gives focus containment, Esc handling
 *   and an inert background for free.
 */
const header = document.querySelector<HTMLElement>('[data-site-header]');
const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');

if (header && sentinel && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    header.dataset.scrolled = String(!entry.isIntersecting);
  }).observe(sentinel);
}

const menu = document.querySelector<HTMLDialogElement>('[data-mobile-menu]');
const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');

if (menu && openButton) {
  const desktop = window.matchMedia('(min-width: 64em)');

  openButton.addEventListener('click', () => {
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
  });

  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  });

  menu.querySelectorAll<HTMLElement>('[data-menu-close], a[href]').forEach((el) => {
    el.addEventListener('click', () => menu.close());
  });

  // Clicking the backdrop (outside the panel) closes the menu.
  menu.addEventListener('click', (event) => {
    if (event.target === menu) menu.close();
  });

  desktop.addEventListener('change', (event) => {
    if (event.matches && menu.open) menu.close();
  });
}
