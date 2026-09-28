/**
 * Hotspot nodes on images: each node is a real <button> that discloses its label
 * (aria-expanded). Hover and focus also reveal the label via CSS.
 */
document.querySelectorAll<HTMLElement>('[data-nodes]').forEach((root) => {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-node-toggle]')];

  const setOpen = (button: HTMLButtonElement, open: boolean) => button.setAttribute('aria-expanded', String(open));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      buttons.forEach((b) => setOpen(b, false));
      setOpen(button, open);
    });
  });

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = buttons.find((b) => b.getAttribute('aria-expanded') === 'true');
    if (open) {
      setOpen(open, false);
      open.focus();
    }
  });
});
