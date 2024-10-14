(() => {
  // src/index.js
  function src_default(Alpine) {
    Alpine.directive("breakpoint", (el, { value, modifiers }, { cleanup }) => {
      let mediaQuery = window.matchMedia(`(${value}-width: ${modifiers[0]}px)`);
      const initEvent = new CustomEvent("breakpoint", {
        bubbles: false,
        detail: {
          matches: mediaQuery.matches
        }
      });
      Alpine.$nextTick;
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

  // builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
