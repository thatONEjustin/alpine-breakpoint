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

// src/index.ts
function src_default(Alpine) {
  Alpine.directive("breakpoint", breakpoint_directive);
}
var breakpoint_directive = async (element, { value, modifiers }, { Alpine, cleanup }) => {
  const mobile_breakpoint_type = value ? value : "max";
  const mobile_width = modifiers.length != 0 ? modifiers[0] : 768;
  const media_query_string = `(${mobile_breakpoint_type}-width: ${mobile_width}px)`;
  const media_query = window.matchMedia(media_query_string);
  const custom_event_listener = (event) => {
    element.dispatchEvent(event_factory(event.matches));
  };
  media_query.addEventListener("change", custom_event_listener);
  await Alpine.$nextTick;
  element.dispatchEvent(event_factory(media_query.matches));
  cleanup(() => {
    media_query.removeEventListener("change", custom_event_listener);
  });
};
function event_factory(is_mobile) {
  return new CustomEvent("breakpoint", {
    bubbles: false,
    detail: {
      matches: is_mobile
    }
  });
}

// builds/module.js
var module_default = src_default;
