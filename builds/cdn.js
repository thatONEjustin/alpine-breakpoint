import breakpoint from '../src/index'

document.addEventListener('alpine:initializing', () => {
    window.Alpine.plugin(breakpoint)
})