import { elementVisible, urlMatch, waitUntil } from "../util";

const dialogQuerySelector = 'form[phx-submit="destroy-app"] > dialog[open]';

const buttonClass =
  "text-red-700 bg-red-100 hover:bg-red-200 inline-flex items-center justify-center w-full sm:w-auto mt-5 sm:mt-0 mb-2 sm:mb-0 shrink-0 px-3.5 py-2.5 border border-transparent font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm";

async function deleteProject() {
  await waitUntil(
    () => urlMatch("apps/.*/settings") && elementVisible(dialogQuerySelector)
  );

  const dialog = document.querySelector(dialogQuerySelector)!;

  const projectName = dialog.querySelector<HTMLSpanElement>(
    "span.text-navy.font-medium"
  )?.innerText;

  if (!projectName) {
    console.log("Could not find project name");
    return;
  }

  const input = dialog.querySelector<HTMLInputElement>('input[id="app_name"]');

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

  input.value = projectName;

  submitButton.disabled = false;
  submitButton.className = buttonClass;
}

export default Promise.race([deleteProject()]);
