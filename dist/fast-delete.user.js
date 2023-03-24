// ==UserScript==
// @name         fast-delete
// @namespace    fast-delete
// @version      0.0.1
// @description  Userscript to verify deletion on various providers, becuase I am sure, yes.
// @author       Jakob Kruse <contact@jakob-kruse.de>
// @match        *://*/*
// @grant        none
// ==/UserScript==

(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/modules/index.ts
  var modules_exports = {};
  __export(modules_exports, {
    fly_io: () => fly_io_exports,
    github_com: () => github_com_exports
  });

  // src/modules/fly_io.ts
  var fly_io_exports = {};
  __export(fly_io_exports, {
    default: () => fly_io_default
  });

  // src/util.ts
  async function waitUntil(condition) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const result = condition();
        if (result) {
          resolve();
          clearInterval(interval);
        }
      }, 200);
    });
  }
  function urlMatch(match) {
    return new RegExp(match).test(window.location.pathname);
  }
  function elementVisible(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      return false;
    }
    const style = window.getComputedStyle(element);
    return style && style.display !== "none" && style.visibility !== "hidden";
  }

  // src/modules/fly_io.ts
  var dialogQuerySelector = 'form[phx-submit="destroy-app"] > dialog[open]';
  var buttonClass = "text-red-700 bg-red-100 hover:bg-red-200 inline-flex items-center justify-center w-full sm:w-auto mt-5 sm:mt-0 mb-2 sm:mb-0 shrink-0 px-3.5 py-2.5 border border-transparent font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm";
  async function deleteProject() {
    var _a;
    await waitUntil(
      () => urlMatch("apps/.*/settings") && elementVisible(dialogQuerySelector)
    );
    const dialog = document.querySelector(dialogQuerySelector);
    const projectName = (_a = dialog.querySelector(
      "span.text-navy.font-medium"
    )) == null ? void 0 : _a.innerText;
    if (!projectName) {
      console.log("Could not find project name");
      return;
    }
    const input = dialog.querySelector('input[id="app_name"]');
    if (!input) {
      console.log("Could not find input");
      return;
    }
    const submitButton = dialog.querySelector(
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
  var fly_io_default = Promise.race([deleteProject()]);

  // src/modules/github_com.ts
  var github_com_exports = {};
  __export(github_com_exports, {
    default: () => github_com_default
  });
  var deleteRepoSelector = 'details-dialog[aria-label="Delete repository"]';
  var archiveRepoSelector = 'details-dialog[aria-label="Archive repository"]';
  async function deleteRepo() {
    await waitUntil(
      () => urlMatch(".*/.*/settings") && elementVisible(deleteRepoSelector)
    );
    const dialog = document.querySelector(deleteRepoSelector);
    const repoName = document.location.pathname.split("/").slice(1, 3).join("/");
    const input = dialog.querySelector("input[name=verify]");
    if (!input) {
      console.log("Could not find input");
      return;
    }
    const submitButton = dialog.querySelector(
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
    const dialog = document.querySelector(archiveRepoSelector);
    const repoName = document.location.pathname.split("/").slice(1, 3).join("/");
    const input = dialog.querySelector("input[name=verify]");
    if (!input) {
      console.log("Could not find input");
      return;
    }
    const submitButton = dialog.querySelector(
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
  var github_com_default = Promise.race([deleteRepo(), archiveRepo()]);

  // src/index.ts
  console.log(modules_exports);
  var host = window.location.host;
  var hostWithoutDots = host.replace(/\./g, "_");
  var module = modules_exports[hostWithoutDots];
  if (module) {
    console.log(`Running module for ${host}...`);
    module == null ? void 0 : module();
  }
})();
