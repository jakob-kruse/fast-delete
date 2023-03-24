import * as modules from "./modules/index";

console.log(modules);

const host = window.location.host;
const hostWithoutDots = host.replace(/\./g, "_");

const module = modules[hostWithoutDots];

if (module) {
  console.log(`Running module for ${host}...`);

  module?.();
}
