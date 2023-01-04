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

export function elementExists(selector: string): boolean {
  return document.querySelector(selector) !== null;
}
