import { elementVisible, urlMatch, waitUntil } from "../util";

const dialogQuerySelector = 'details-dialog[aria-label="Delete repository"]';

export async function github_com() {
  await waitUntil(() => {
    return urlMatch(".*/.*/settings") && elementVisible(dialogQuerySelector);
  });

  const dialog = document.querySelector(
    dialogQuerySelector
  ) as HTMLDialogElement;

  const repoName = document.location.pathname.split("/").slice(1, 3).join("/");

  const input = dialog.querySelector<HTMLInputElement>("input[name=verify]");

  if (!input) {
    console.log("Could not find input");
    return;
  }

  const submitButton = dialog.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );

  if (!submitButton) {
    console.log("Could not find submit button");
    return;
  }

  input.value = repoName;

  submitButton.removeAttribute("data-disable-invalid");
  submitButton.removeAttribute("disabled");
}
