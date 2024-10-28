import type { Alpine as AlpineInstance } from 'alpinejs'

export default function (Alpine: AlpineInstance) {
  Alpine.directive('breakpoint', breakpoint_directive)
}

const breakpoint_directive = async (
  element: HTMLElement,
  { value, modifiers },
  { Alpine, cleanup }
) => {

  const mobile_breakpoint_type = (value) ? value : 'max'
  const mobile_width = (modifiers.length != 0) ? modifiers[0] : 768
  const media_query_string = `(${mobile_breakpoint_type}-width: ${mobile_width}px)`

  /*
   * NOTE: it doesn't fully make sense to me to why const 
   * here allows a variable to be modified with addEventListener later on
   * esp with typescript being so strict in these builds.
   * */
  const media_query: MediaQueryList = window.matchMedia(media_query_string);

  // const init_event: CustomEvent = event_factory(media_query.matches);

  /*
   * HACK: I want the element to be the event dispatcher origin
   * unfortunately event listeners have to match the event listeners
   * interface
   * */
  const custom_event_listener = (event: any) => {
    element.dispatchEvent(event_factory(event.matches))
  }

  media_query.addEventListener('change', custom_event_listener)

  await Alpine.$nextTick;

  element.dispatchEvent(event_factory(media_query.matches))

  cleanup(() => {
    media_query.removeEventListener('change', custom_event_listener)
  })
}

function event_factory(is_mobile: boolean): CustomEvent {
  return new CustomEvent('breakpoint', {
    bubbles: false,
    detail: {
      matches: is_mobile
    }
  })
}
