import { defineConfig } from "tsup";

function createUserScriptBanner() {
  return `// ==UserScript==
// @name         fast-delete
// @namespace    fast-delete
// @version      0.0.1
// @description  Userscript to verify deletion on various providers, becuase I am sure, yes.
// @author       Jakob Kruse <contact@jakob-kruse.de>
// @match        *://*/*
// @grant        none
// ==/UserScript==
`;
}

export default defineConfig({
  entry: {
    "fast-delete": "src/index.ts",
  },
  outDir: "dist",
  format: ["iife"],
  clean: true,
  banner: {
    js: createUserScriptBanner(),
  },
  outExtension() {
    return {
      js: ".user.js",
    };
  },
});
