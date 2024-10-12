import breakpoint from '../src/index'

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(breakpoint)
})
