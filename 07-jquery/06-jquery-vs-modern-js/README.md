# 7.6: jQuery vs. Modern JavaScript

**Difficulty:** Intermediate+
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- How to do the same DOM task with jQuery and with plain modern JavaScript, side by side
- What jQuery was originally created to solve
- Why modern JavaScript (and frameworks like React) have reduced the need for jQuery in
  new projects
- Honest, practical reasons jQuery is still found in real codebases today

## Prerequisites
Topic 7.5: AJAX with jQuery. This is the last topic in the module — it steps back and asks
when jQuery is (and isn't) still the right tool.

## Explanation

### The same behavior, two ways
This page has two buttons that do the identical thing — toggle an `open` class on a panel
— one wired with jQuery, one wired with vanilla (library-free) JavaScript:

| Task | jQuery | Vanilla JavaScript |
|---|---|---|
| Select an element by id | `$('#panel-jquery')` | `document.getElementById('panel-jquery')` |
| Listen for a click | `.on('click', fn)` | `.addEventListener('click', fn)` |
| Toggle a class | `.toggleClass('open')` | `.classList.toggle('open')` |

Reading these side by side, the vanilla versions aren't dramatically longer — a big part of
why jQuery has become less essential for new projects (more on this below).

### Arrow functions, briefly
The vanilla-JS handler in `script.js` is written as `() => { ... }` instead of `function ()
{ ... }`. This is called an **arrow function** — a shorter, newer syntax for writing an
anonymous function, popularized by modern JavaScript. `() => { ... }` means the same thing
as `function () { ... }`, used everywhere else in this module; you'll see both styles in
real code, and they behave the same for a simple callback like this one.

### What jQuery solved historically
jQuery was created in 2006, at a time when browsers disagreed with each other constantly.
The same handful of tasks — selecting elements, listening for events, making an AJAX
request — often required different code in Internet Explorer, Firefox, and Safari. jQuery's
whole value proposition was writing one version of that code that quietly worked
everywhere. On top of that, the browser's own DOM APIs at the time were verbose:
`document.querySelectorAll` didn't even exist yet in most browsers, and there was no
`.classList`, no built-in Promises, and no `fetch`. jQuery's shorter, chainable syntax was a
genuine, significant improvement over what was available natively.

### Why modern JavaScript needs it less
Since then, browsers have standardized on the same behavior for the DOM APIs jQuery used to
paper over, and JavaScript itself gained the features jQuery used to provide: `.classList`,
`document.querySelector` / `querySelectorAll`, the `fetch()` function for AJAX-style
requests, Promises for handling asynchronous results, and more, all built in, all
consistent across browsers, with no library required. For a new project today, the specific
cross-browser problems jQuery was built to solve mostly no longer exist.
On top of that, many projects being built today use a framework — React, covered later in
this roadmap, is one example — which manages the DOM for you in a completely different way
(you describe what the page should look like, and the framework figures out how to update
it), making direct DOM manipulation, jQuery's specialty, something you reach for far less
often in the first place.

### Why jQuery is still around
None of this means jQuery has disappeared from real work:

- **Legacy systems.** Enormous amounts of existing, working code were written when jQuery
  was the standard choice, and rewriting working code just to remove a library is rarely
  worth the risk or cost.
- **Quick prototypes.** For a small script on a simple page with no build step, jQuery's
  one-line CDN setup (as used throughout this module) is still genuinely fast to reach for.
- **WordPress and similar platforms.** WordPress ships jQuery by default and much of its
  plugin and theme ecosystem depends on it, so it remains a practical requirement in that
  world specifically.
- **Familiarity.** Many developers, and a lot of documentation and tutorials, still assume
  jQuery, which keeps it in active use even outside the cases above.

Knowing jQuery is practical for exactly these reasons — you are likely to encounter it in
real codebases — even as you write mostly modern JavaScript (and, later, React) going
forward.

## The Demo
Open `script.js`:

- `updateStatus()` is a plain shared function that checks both panels' state and writes a
  one-line summary to the page — used by both buttons, so you can watch both sides update
  in exactly the same way.
- `$('#btn-jquery').on('click', function () { $('#panel-jquery').toggleClass('open');
  updateStatus(); });`, wrapped in `$(document).ready(...)`, is the jQuery version.
- `document.getElementById('btn-vanilla').addEventListener('click', () => {
  document.getElementById('panel-vanilla').classList.toggle('open'); updateStatus(); });`
  is the vanilla version — written directly, with no `$(document).ready(...)` equivalent,
  because this demo's `<script>` tag is placed at the end of `<body>`, after every element
  above it already exists.

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
Add a third button, wired with vanilla JavaScript, that closes BOTH panels at once by
setting `classList.remove('open')` on `#panel-vanilla` and calling jQuery's
`.removeClass('open')` on `#panel-jquery` — one button, using both approaches together.

## Key Takeaways
- The same DOM task can usually be written in jQuery or in plain modern JavaScript, and the
  vanilla version is often not much longer today
- jQuery was created to paper over real cross-browser inconsistencies and a verbose,
  incomplete native DOM API — problems that mostly no longer exist in modern browsers
- Frameworks like React (covered later in this roadmap) reduce the need for direct DOM
  manipulation entirely, for different reasons than modern vanilla JS does
- jQuery remains common in legacy code, quick prototypes, and platforms like WordPress —
  knowing it is still a practical, real-world skill
