(() => {
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

  // builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
