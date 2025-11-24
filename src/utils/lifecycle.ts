export function onPageReady(callback: () => void): void {
  callback();
  document.addEventListener("astro:page-load", callback);
}