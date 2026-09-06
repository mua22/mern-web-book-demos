# 7.2: DOM Manipulation

**Difficulty:** Intermediate
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- Reading and writing element content with `.text()`, `.html()`, and `.val()`
- Adding, removing, and toggling CSS classes with `.addClass()`, `.removeClass()`, and
  `.toggleClass()`
- Adding and removing whole elements with `.append()`, `.prepend()`, and `.remove()`
- Building brand-new elements in code with `$('<li>...</li>')`

## Prerequisites
Topic 7.1: Setup and Selectors.

## Explanation

### Getters and setters: the same method, two jobs
Several jQuery methods do double duty depending on whether you give them an argument:

- Call it with **no argument** and it acts as a **getter** — it reads and returns the
  current value.
- Call it **with an argument** and it acts as a **setter** — it changes the value and
  returns the same jQuery object (so you can keep chaining, as shown in 7.1).

```js
var current = $('#item-input').val(); // getter: read the input's current text
$('#item-input').val('');             // setter: replace it (here, clear the box)
```

- `.text()` gets or sets an element's plain text.
- `.html()` gets or sets an element's inner content as HTML — tags inside the string you
  pass become real elements, not literal text. Use `.text()` when you want to safely show
  plain text, and `.html()` only when you actually need to insert markup (as this demo does,
  to include a `<button>` inside a new list item).
- `.val()` gets or sets the current value of a form field, like a text `<input>`.

### Working with CSS classes
- `.addClass('name')` adds a class to the selected element(s).
- `.removeClass('name')` removes it.
- `.toggleClass('name')` adds the class if it isn't there, and removes it if it is — useful
  any time a value should flip between two states with each click, without writing your own
  if/else.

Changing behavior by adding or removing a class, and letting a plain CSS rule (in
`style.css`) decide what that class actually looks like, is a common and clean pattern —
your JavaScript only needs to know the *state* (has the class or not), not the visual
details.

### Building and inserting new elements
`$('<li></li>')` looks like a selector but isn't — when you pass `$(...)` a string that
looks like an HTML tag instead of a selector, jQuery creates a brand-new element from it.
That new element lives only in memory until you actually insert it somewhere on the page:

- `.append(newElement)` inserts `newElement` as the last child of the selected element.
- `.prepend(newElement)` inserts it as the first child instead.
- `.remove()` deletes the selected element(s) from the page entirely.

### A function, briefly (if you haven't seen 7.1 yet)
A **function** is a reusable, named block of code. You define it once with
`function name() { ... }` and then run ("call") it as many times as you like elsewhere by
writing `name()`. This demo defines `updateEmptyMessage()` once and calls it from two
different places, instead of repeating the same logic twice.

### A quick note on events
This demo needs to react to a button click, so it uses `.on('click', function () { ... })`
— jQuery's way of saying "run this function every time this element is clicked." Events are
the full subject of 7.3; for now, treat `.on('click', ...)` as a tool you already know how to
use, and see how directly it's used here.

## The Demo
Open `script.js`. It builds a small "add item to a list" app:

- `$('#add-btn').on('click', function () { ... })` runs whenever the Add button is clicked.
- Inside, `$('#item-input').val()` (getter) reads what the user typed.
- `$('<li></li>')` creates a new, empty list item in memory.
- `.html(...)` fills it with the typed text plus a Remove `<button>`, in one string.
- `newItem.find('.remove-btn').on('click', function () { ... })` attaches a click handler
  directly to that one new button, right when it's created, so clicking it finds the item
  with `.closest('li')` and deletes it with `.remove()`.
- `newItem.on('click', function (event) { ... })` similarly attaches a click handler directly
  to the new item itself, toggling a `done` class with `.toggleClass('done')` — except when
  the click landed on the Remove button, checked via `event.target` (covered fully in 7.3).
- `$('#item-list').append(newItem)` inserts the finished item into the page.
- `$('#item-input').val('')` (setter) clears the box afterward.
- `updateEmptyMessage()` uses `.addClass('hidden')` / `.removeClass('hidden')` to show or
  hide the "list is empty" message, and `.text(...)` (setter) to update a live item count.

Notice that both click handlers above are attached **directly to each new element, at the
moment it's created**. That works fine here, but it has a real limitation once an app grows
— 7.3 picks up exactly this point.

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
Add an "Add to Top" button next to "Add" that inserts the new item with `.prepend()`
instead of `.append()`, so it appears at the start of the list rather than the end.

## Key Takeaways
- `.text()`, `.html()`, and `.val()` each read (no argument) or write (with an argument)
  content — use `.html()` only when you actually need to insert markup
- `.addClass()` / `.removeClass()` / `.toggleClass()` change an element's classes; combine
  them with plain CSS rules to control appearance from JavaScript
- `$('<tag>...</tag>')` builds a new element in memory; `.append()` / `.prepend()` insert it
  into the page, and `.remove()` deletes an existing element
- Handlers attached directly to an element only work for elements that already existed when
  the handler was attached — a limitation 7.3 solves
