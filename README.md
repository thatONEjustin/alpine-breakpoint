# alpine-breakpoint

x-directive for responsive event handling

x-directive for responsive event handling

```html
<div x-data="{ test: null }" x-breakpoint:max.768 @breakpoint="test = $event.detail.matches">
    <p x-text="`component1: ${test}`"></p>
    <span x-text="(test) ? `👍` : `👎`"></span>
</div>
```

usage for initialization as follows:
`x-breakpoint.min|max.width`

`min|max`
min or max dictates the threshold type of viewport measurement (based on width)

`.width`
written with integers, base unit is pixels.

directive makes use of:

```js
window.matchMedia(`(${min|max}-width: ${width}px)`)
```

for checking viewport dimensions. whenever the query fires a 'change' event a custom `@breakpoint` event will fire, with the media query's `matches` state returned with it:

```jsx
@breakpoint="test = $event.detail.matches"
```

the directive will automatically dispatch an event on initialization as well. Setting the above example's `null` value to the proper measurement when loaded.

