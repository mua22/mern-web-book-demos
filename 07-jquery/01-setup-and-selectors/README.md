# 7.1: Setup and Selectors

**Difficulty:** Beginner+
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- What jQuery is and how to add it to a page from a CDN
- How to safely wait for the page to finish loading with `$(document).ready(...)`
- How to select elements by id, class, and tag name with `$(...)`
- How jQuery selectors compare to plain JavaScript's `document.querySelector`
- How to chain multiple jQuery method calls together

## Prerequisites
Module 1: HTML and Module 2: CSS. No prior JavaScript experience is assumed.

## Explanation

### What is jQuery?
jQuery is a JavaScript library: a file full of pre-written JavaScript code, written by
someone else, that you load into your page so you can call its functions instead of
writing everything from scratch. jQuery's whole job is to make three things easier in the
browser: finding elements on the page, changing them, and reacting to what the user does
(clicks, typing, and so on).

### Adding jQuery to a page
Before you can use jQuery, the browser has to load the jQuery library file itself. The
easiest way to do that is a CDN (Content Delivery Network) — a server that hosts a copy of
the file for anyone to use, so you don't have to download or host it yourself:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="script.js"></script>
```

Order matters here. The jQuery `<script>` tag must come *before* your own script's tag,
because your script uses the `$` function that the jQuery file defines. If your script ran
first, `$` would not exist yet and your code would fail.

### A function, briefly
A **function** is a named (or, sometimes, unnamed) block of code that does not run the
moment it's written — it only runs when something calls it. Functions let you package up a
set of instructions once and reuse or delay them. In this topic's `script.js` you'll see:

```js
function () {
  // instructions here run later, not immediately
}
```

This is an **anonymous function** — a function with no name of its own, written directly at
the spot where it's needed and handed off to somewhere else to be run later. Handing a
function to another function like this, so it can be called back at the right time, is
called a **callback**.

### Waiting for the page with `$(document).ready(...)`
When the browser reads an HTML file, it processes it top to bottom. If your JavaScript
tries to select `#greeting` before the browser has reached that element further down the
page, it won't find it. `$(document).ready(...)` solves this: it takes a callback function
and only runs it once the whole page's structure (the DOM — Document Object Model, the
browser's in-memory model of the page) has finished loading.

```js
$(document).ready(function () {
  // safe to select and change elements here
});
```

There is a shorthand for this exact pattern that most real-world jQuery code uses instead:

```js
$(function () {
  // identical meaning to $(document).ready(function () { ... })
});
```

### Selecting elements
jQuery's `$(...)` function is used for two things: wrapping the page in `$(document)`, as
above, and selecting elements, using the exact same syntax as CSS selectors:

| Selector | Meaning | Vanilla JS equivalent |
|---|---|---|
| `$('#greeting')` | the element with id `greeting` | `document.querySelector('#greeting')` |
| `$('.note')` | every element with class `note` | `document.querySelectorAll('.note')` |
| `$('li')` | every `<li>` element on the page | `document.querySelectorAll('li')` |

The big practical difference: jQuery automatically wraps *every* matching element (even if
there are several) in a single object, and every method you call on it (like `.text()` or
`.css()`) automatically applies to all of them — no loop required. Vanilla JS's
`querySelectorAll` returns a list you'd normally have to loop over yourself to change more
than one element.

### Chaining
Most jQuery methods return the same jQuery object they were called on, which lets you
"chain" several actions in one statement:

```js
$('#greeting').text('Hello from jQuery!').css('color', 'blue');
```

This reads as: select `#greeting`, then set its text, then set its color — all in one line.

## The Demo
Open `script.js`. Inside the `$(document).ready(...)` callback:

- `$('#greeting').text('Hello from jQuery!').css('color', 'blue');` selects the single
  `<h1 id="greeting">` element, changes its text, and colors it blue, all chained together.
- `$('.note').css('font-style', 'italic').addClass('highlighted');` selects *both*
  `<p class="note">` paragraphs at once and italicizes and highlights them.
- `$('li').css('color', 'darkgreen');` selects every list item on the page by tag name.
- Finally, `$('li').length` counts how many `<li>` elements jQuery found (`.length` works
  here exactly like it does on a plain JavaScript array), and that count is written into
  the page so you can see, in the browser, that the selectors actually ran.

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
Add a new element to `index.html` — for example a `<p id="footer">` — and, in `script.js`,
select it with `$('#footer')` and change its text and background color.

## Key Takeaways
- jQuery is loaded from a CDN with a `<script>` tag, before your own script's tag
- `$(document).ready(function () { ... })` (or its shorthand `$(function () { ... })`)
  makes sure your code only runs once the page has fully loaded
- `$('#id')`, `$('.class')`, and `$('tag')` select elements using the same rules as CSS
- jQuery selections can represent multiple elements at once, and most jQuery methods apply
  to all of them without needing a loop
- Most jQuery methods return the same object, so calls can be chained with dots
