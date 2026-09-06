# 5.9: Events & Event Handling

**Difficulty:** Intermediate
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to attach a listener with `addEventListener`
- What the event object is, and what `event.target` tells you
- A few common event types: `click`, `submit`, `input`, `keydown`
- What event delegation is: one listener on a parent, handling clicks on many children
- Why delegation is necessary for elements that get added to the page after it first loads

## Prerequisites
Topic 5.8: DOM Selection & Manipulation

## Explanation
An **event** is something that happens in the browser that your code can react to: a
click, a key press, a form submission, text being typed. `addEventListener` is how you
tell an element "run this function whenever this kind of event happens to you":

```js
button.addEventListener("click", () => {
  console.log("The button was clicked.");
});
```

The first argument is the event type as a string. A few you'll use constantly:
- `"click"` -- the user clicked the element
- `"submit"` -- a `<form>` was submitted (covered fully in 5.10)
- `"input"` -- a form field's value just changed
- `"keydown"` -- a key was pressed down, anywhere the listener is attached

The function you pass in receives an **event object** describing what happened.
`event.target` is one of its most useful properties: it's the exact, specific element
that the event happened on, which matters a lot once one listener has to deal with
several different elements at once -- which is exactly what event delegation is.

### Event Delegation

Say you have a list of items, each with its own "Remove" button, and new items keep
getting added after the page has already loaded. You might expect to attach a click
listener to each "Remove" button individually, as it's created. That works (it's what
Topic 5.8 did), but there's another approach: attach **one** listener to the shared
parent element (the list itself), and let clicks on any child bubble up to it.

```js
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    event.target.closest("li").remove();
  }
});
```

This works because of **event bubbling**: when you click a button inside a `<li>`
inside a `<ul>`, the click event doesn't just fire on the button -- it also fires on
every ancestor, all the way up. By listening on the parent `<ul>` instead of each
button, and checking `event.target` to see which specific element was actually
clicked, one listener can handle clicks on any number of buttons, including ones that
don't exist yet at the moment the listener is attached.

That last point is the key reason delegation matters: **an element created with
`document.createElement` after the page has loaded has no event listeners of its own
unless your code explicitly attaches one to it.** If your only listeners were set up
once, when the page first loaded, any element added afterward -- like a new "Remove"
button -- would silently do nothing when clicked, because nothing was ever attached to
it directly. Delegating to a parent that already existed when the page loaded avoids
the problem: the parent's listener is already active, no matter how many children get
added under it later.

## The Demo
This demo rebuilds a similar list to Topic 5.8's, on purpose, so the two approaches sit
side by side. `addItem()` still creates a `<li>` containing a text `<span>` and a
"Remove" `<button>` -- but this time, the remove button gets no listener of its own at
all.

Instead, a single `click` listener is attached once to `#item-list`, the parent `<ul>`,
when the page loads. Inside it, `event.target.classList.contains("remove-btn")` checks
whether the specific element clicked was a remove button, and if so,
`event.target.closest("li")` walks up to that button's containing `<li>` so it can be
removed with `.remove()`. Every remove button ever created, including ones added long
after this listener was attached, is handled by this same one listener.

The demo also shows a `keydown` listener on the text input, so pressing Enter adds an
item the same way clicking "Add" does -- one more common event type in practice.

**Contrast with 5.8:** in 5.8's version, each remove button got its own listener at the
moment it was created, inside `addItem()` itself. That works fine there because
`addItem()` is the only place buttons are ever created. This version proves the same
outcome is achievable with exactly one listener, attached once, regardless of how many
items get added afterward -- which becomes essential once elements can be created from
more than one place, or in bulk (for example, items loaded from a server).

## How to Run
Open `index.html` directly in your browser. No installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a "Mark done" `<button>` next to each item's "Remove" button (created the same way,
inside `addItem()`), and extend the existing delegated listener on `#item-list` with a
second `if` branch that toggles a `done` class on the item's `<li>` when that new
button is clicked -- no new listener needed.

## Key Takeaways
- `addEventListener(type, handler)` attaches a function that runs when that event occurs
- The event object passed to your handler describes what happened; `event.target` is the exact element involved
- `click`, `submit`, `input`, and `keydown` are common event types, each firing for a different reason
- Event delegation attaches one listener to a parent and inspects `event.target`, instead of one listener per child
- Delegation is necessary because elements created after the page loads have no listeners of their own unless you attach one directly to them
