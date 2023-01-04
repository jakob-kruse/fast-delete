export function waitUntil(condition: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      let result = condition();
      if (result) {
        resolve();
        clearInterval(interval);
        return;
      }
    }, 200);
  });
}

export function urlMatch(match: string | RegExp): boolean {
  return new RegExp(match).test(window.location.pathname);
}

export function elementVisible(selector: string): boolean {
  const element = document.querySelector(selector);

  if (!element) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return style && style.display !== "none" && style.visibility !== "hidden";
}
