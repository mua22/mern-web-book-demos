# 7.3: Events

**Difficulty:** Intermediate
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- Listening for events with `.on('click', handler)`
- The event object, and the difference between `event.target` and `this`
- Event delegation: `.on('click', '.child-selector', handler)` on a parent element
- Why delegation matters for elements added to the page after it first loads
- Removing handlers with `.off()`, and canceling default browser behavior with
  `event.preventDefault()`

## Prerequisites
Topic 7.2: DOM Manipulation.

## Explanation

### Events, briefly
An **event** is something that happens in the browser that your code can react to — a
click, a key press, a form submission, and many more. jQuery's `.on(eventType, handler)`
method registers a **handler**: a function that runs every time that event happens on the
selected element(s).

```js
$('#add-btn').on('click', function () {
  // runs every time #add-btn is clicked
});
```

### The event object and `event.target`
When jQuery calls your handler, it passes it one argument, conventionally named `event`,
describing the event that just happened. One especially useful property is
`event.target` — the exact element the event actually happened on. This matters because a
click doesn't only affect the element you clicked; it also **bubbles**: the same click event
travels upward through every ancestor element, one level at a time, all the way up to the
page itself. `event.target` always stays fixed as the original element clicked, even while
the event is bubbling through its ancestors and being seen by their handlers too.

### The problem with binding directly (a recap of where 7.2 left off)
7.2's Remove buttons were bound directly, at the exact moment each button was created:

```js
newItem.find('.remove-btn').on('click', function () { ... });
```

This only works because the button already existed at that exact line of code. Any element
created **after** that — added to the page later, whether by a user action or more code
running afterward — was never around to be bound, so nothing would happen if you clicked
it, unless you remembered to bind it individually, every single time, everywhere new items
get created. In a bigger app this becomes easy to forget and easy to get wrong.

### Event delegation
Delegation solves this by listening in exactly one place — a parent element that already
exists when the page loads — instead of on each individual child:

```js
$('#item-list').on('click', '.remove-link', function (event) {
  // this runs for a click on ANY .remove-link inside #item-list,
  // including ones that don't exist yet when this code runs
});
```

This works because of event bubbling: a click on a `.remove-link` bubbles up through its
ancestors, including `#item-list`, and jQuery checks — at the moment the click actually
happens, not when this code first ran — whether the click started on something matching
`.remove-link`. Since that check happens live, on every click, it doesn't matter whether
the `.remove-link` existed yet when `.on(...)` was first called. One registration, made
once, keeps working forever, for any number of items added long after the page loaded.

Inside a delegated handler, `this` (and `event.currentTarget`) refers to the specific
descendant element that matched your selector (here, the `.remove-link` itself) — which can
be different from `event.target`, if that element has children of its own. This demo's
Remove link wraps its text in a `<span>`, so clicking directly on the word "Remove" reports
`event.target` as that inner `<span>`, while `this` is still the `<a class="remove-link">`
that actually matched the delegation selector.

### `preventDefault()`
Some elements have a built-in default reaction to certain events — clicking a link normally
navigates the browser to its `href`, and submitting a form normally reloads the page.
`event.preventDefault()` stops that default reaction from happening, without stopping your
own handler from running. This demo's Remove control is a real `<a href="#">` link; without
`preventDefault()`, clicking it would also jump the page to the top (because of the `#`)
every time an item is removed.

### `.off()`
`.off(eventType, selector)` removes a previously-registered handler that matches the same
event type and selector you gave `.on()`. This demo includes a button that calls `.off()`
to turn the delegated Remove handler off entirely, so you can see, by comparison, what
*not* having a working handler looks like — then turns it back on by calling `.on()` again.

## The Demo
Open `script.js`. It rebuilds the same "add item" list idea as 7.2, but on purpose wires
Remove differently:

- `$('#item-list').on('click', '.remove-link', function (event) { ... })` is registered
  **once**, when the page loads, on the list container — not on each item.
- `$('#add-btn').on('click', ...)` still creates new `<li>` elements exactly as in 7.2, but
  notice it does **not** attach any click handler to the new Remove link at all — the
  delegated handler above already covers it.
- The delegated handler calls `event.preventDefault()` (so the `<a href="#">` doesn't
  navigate) and then `$(this).closest('li').remove()` to delete just that item.
- The "Turn delegated handler off" button calls `$('#item-list').off('click',
  '.remove-link')`, then re-registers it with `.on()` when clicked again, so you can compare
  both states directly in the browser.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
jQuery from the CDN (and, for 7.5, to call the JSONPlaceholder API).

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with:
```
node test.js
```
from inside this folder (or run every topic's tests at once from the repo root with
`npm test`).

## Try It Yourself
Add a second delegated handler on `#item-list` for the `dblclick` (double-click) event,
delegated to `li`, that shows a browser `alert()` with the clicked item's text. Confirm it
works even on items added after the page has loaded.

## Key Takeaways
- `.on(eventType, handler)` reacts to events like clicks; the handler receives an `event`
  object describing what happened
- `event.target` is the exact element an event started on, which can differ from `this`
  inside a delegated handler
- Event delegation — `.on(eventType, selector, handler)` registered on a stable parent —
  keeps working for elements added to the page later, unlike handlers bound directly to
  each element
- `event.preventDefault()` cancels an element's default browser behavior (like a link
  navigating) without stopping your own handler
- `.off(eventType, selector)` removes a previously-registered handler
