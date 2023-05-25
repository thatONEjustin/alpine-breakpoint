var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/index.js
function src_default(Alpine) {
  Alpine.directive("breakpoint", async (el, { value, modifiers, expression }, { Alpine: Alpine2, evaluateLater, effect, cleanup }) => {
    let mediaQuery = window.matchMedia(`(${value}-width: ${modifiers[0]}px)`);
    const initEvent = new CustomEvent("breakpoint", {
      bubbles: false,
      detail: {
        matches: mediaQuery.matches
      }
    });
    await Alpine2.$nextTick;
    el.dispatchEvent(initEvent);
    mediaQuery.addEventListener("change", (event) => {
      el.dispatchEvent(new CustomEvent("breakpoint", {
        bubbles: false,
        detail: {
          matches: event.matches
        }
      }));
    });
    cleanup(() => {
      mediaQuery.removeEventListener("change");
    });
  });
}

// builds/module.js
var module_default = src_default;
