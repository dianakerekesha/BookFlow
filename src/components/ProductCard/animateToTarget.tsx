export const animateToTarget = (
  sourceEl: HTMLElement,
  targetEl: HTMLElement,
) => {
  const sourceRect = sourceEl.getBoundingClientRect();
  let targetRect = targetEl.getBoundingClientRect();
  const iconSize = 40;
  const bookCenter = sourceRect.width / 2 - iconSize;

  if (targetRect.left === 0 && targetRect.top === 0) {
    targetRect = {
      top: 20,
      left: window.innerWidth - 50,
      width: 40,
      height: 40,
    } as DOMRect;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  Object.assign(container.style, {
    position: 'fixed',
    top: `${sourceRect.top - bookCenter}px`,
    left: `${sourceRect.left + bookCenter}px`,
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    zIndex: '999',
    pointerEvents: 'none',
    transition: 'all 1.1s cubic-bezier(0.1, 0, 0.1, 0)',
    color: '#00',
  });

  container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h8" />
    </svg>
  `;

  requestAnimationFrame(() => {
    Object.assign(container.style, {
      top: `${targetRect.top}px`,
      left: `${targetRect.left}px`,
      transform: 'scale(0.5) rotate(360deg)',
      opacity: '0',
    });
  });

  setTimeout(() => {
    container.remove();
  }, 1100);
};
