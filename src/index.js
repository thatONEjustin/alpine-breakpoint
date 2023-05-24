export default function (Alpine) {
    Alpine.directive('breakpoint', async (el, { value, modifiers, expression }, { Alpine, evaluateLater, effect, cleanup }) => { 
        let mediaQuery = window.matchMedia(`(${value}-width: ${modifiers[0]}px)`);   

        const initEvent = new CustomEvent("breakpoint", {
            bubbles: false,
            detail: {
                matches: mediaQuery.matches
            },
        });

        await Alpine.$nextTick;
        el.dispatchEvent(initEvent)
            
        mediaQuery.addEventListener('change', event => {
            el.dispatchEvent(new CustomEvent('breakpoint', {
                bubbles: false,
                detail: { 
                    matches: event.matches 
                },
            }))
        })
        
        cleanup(() => {
            mediaQuery.removeEventListener('change')
        })
    })
}