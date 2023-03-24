import { elementVisible, urlMatch, waitUntil } from "../util";

const deleteRepoSelector = 'details-dialog[aria-label="Delete repository"]';
const archiveRepoSelector = 'details-dialog[aria-label="Archive repository"]';

async function deleteRepo() {
  await waitUntil(
    () => urlMatch(".*/.*/settings") && elementVisible(deleteRepoSelector)
  );

  const dialog = document.querySelector(deleteRepoSelector)!;

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

  delete submitButton.dataset.disableInvalid;
  submitButton.removeAttribute("disabled");
}

async function archiveRepo() {
  await waitUntil(
    () => urlMatch(".*/.*/settings") && elementVisible(archiveRepoSelector)
  );

  const dialog = document.querySelector(archiveRepoSelector)!;

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

  delete submitButton.dataset.disableInvalid;
  submitButton.removeAttribute("disabled");
}

export default Promise.race([deleteRepo(), archiveRepo()]);
