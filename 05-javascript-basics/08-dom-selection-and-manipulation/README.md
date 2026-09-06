# 5.8: DOM Selection & Manipulation

**Difficulty:** Intermediate
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to select elements with `document.querySelector`, `document.querySelectorAll`, and `document.getElementById`
- The difference between reading/writing `.textContent`, `.innerHTML`, and `.value`
- How to add and remove CSS classes with `.classList.add`, `.remove`, and `.toggle`
- How to build a new element with `document.createElement` and attach it with `.appendChild`
- How to remove an element from the page with `.remove()`

## Prerequisites
Topic 5.7: Strings & Template Literals

## Explanation
The **DOM** (Document Object Model) is the browser's live, in-memory representation of
the page's HTML -- every tag becomes an object your JavaScript can read from and
change. Everything in this topic is about reading and changing that representation.

**Selecting elements.** `document.getElementById("item-input")` finds the one element
with that exact `id`. `document.querySelector("#add-btn")` does effectively the same
thing but accepts any CSS selector (an id, a class like `.remove-btn`, a tag name, or
something more specific), and returns only the first match.
`document.querySelectorAll(".remove-btn")` returns *every* matching element, as a
static list you can loop over.

**Reading and writing content.** Three properties come up constantly:
- `.textContent` reads or writes plain text. Setting it replaces everything inside the
  element with that literal text -- safe, and the usual choice.
- `.innerHTML` reads or writes the element's contents as an HTML string, so it can
  create new nested tags. Only set it from text you trust, since it will render any
  markup you give it.
- `.value` reads or writes the current value of a form control like an `<input>` --
  `.textContent` doesn't work on inputs, because their value isn't stored as content
  between tags.

**Classes.** `.classList` gives you `.add("name")`, `.remove("name")`, and
`.toggle("name")` (adds it if missing, removes it if present) for changing which CSS
classes an element has, without having to rewrite its whole `class` attribute by hand.

**Creating and removing elements.** `document.createElement("li")` makes a new element
that exists only in memory -- it isn't on the page until you attach it, typically with
`parentElement.appendChild(newElement)`. To take an element off the page entirely, call
`.remove()` directly on it.

## The Demo
`script.js` builds a small shopping list. `addItem()` reads the trimmed text out of
`#item-input` with `.value`, and returns early if it's empty. It then creates a `<li>`
out of two pieces built with `document.createElement`: a `<span>` holding the item text
(set with `.textContent`) and a `<button>` labeled "Remove".

The remove button's click listener is attached directly to that one button, right when
it's created, and simply calls `li.remove()` -- removing just that list item. The
item's `<span>` also gets a click listener that calls `li.classList.toggle("done")`,
which the CSS uses to strike the text through.

Every change to the list also calls `updateCount()`, which uses
`list.querySelectorAll("li").length` to count the current items and writes a message
into `#item-count` with `.textContent`.

Binding each remove button's listener individually, at creation time, works well here
because `addItem()` is the only place new items are ever created. Topic 5.9 rebuilds
this same idea using a technique called event delegation instead, and explains why
you'd reach for that approach in cases this one doesn't cover.

## How to Run
Open `index.html` directly in your browser. No installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a "Clear All" button that removes every item from the list at once. Hint:
`list.innerHTML = ""` is one way; looping over `querySelectorAll("li")` and calling
`.remove()` on each is another.

## Key Takeaways
- `querySelector`/`querySelectorAll` accept any CSS selector; `getElementById` matches only an id
- `.textContent` is for plain text, `.innerHTML` is for markup, `.value` is for form control values
- `.classList.add`/`.remove`/`.toggle` change an element's CSS classes without touching the rest of its markup
- `document.createElement` makes an element in memory; `.appendChild` is what actually puts it on the page
- `.remove()` takes a specific element off the page
