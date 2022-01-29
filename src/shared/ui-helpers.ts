interface PopupProps {
  url: string;
  title: string;
  w: number;
  h: number;
}

export const popupCenter = (
  window: Window,
  { url, title, w, h }: PopupProps,
) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.innerWidth;
  const dualScreenTop = window.innerWidth;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      topbar=no,
      scrollbars=yes,
      width=${w}, 
      height=${h}, 
      top=${top}, 
      left=${left}
      `,
  );

  if (window.focus) {
    newWindow.focus();
  }
};
