# Module 7: jQuery

jQuery is a JavaScript library built to make DOM selection, manipulation, events, and AJAX
requests short and consistent across browsers. It's older than the "modern JavaScript" you
may see elsewhere, but it is still found in countless real production codebases, and
learning it is also a gentle, practical introduction to the JavaScript concepts (selecting
elements, listening for events, talking to a server) that later modules build on directly.

This is the most advanced module of this batch: it's the first place in this roadmap where
you write real programming logic rather than only markup and styling.

**Difficulty range:** Beginner+ → Intermediate+
**Prerequisites:** [Module 1: HTML](../01-html/), [Module 2: CSS](../02-css/). No prior
JavaScript experience is assumed — each topic explains the small bit of JS syntax it needs
as it goes.

## Topics

| # | Topic | Difficulty | Folder |
|---|---|---|---|
| 7.1 | Setup & Selectors | Beginner+ | [01-setup-and-selectors](01-setup-and-selectors/) |
| 7.2 | DOM Manipulation | Intermediate | [02-dom-manipulation](02-dom-manipulation/) |
| 7.3 | Events | Intermediate | [03-events](03-events/) |
| 7.4 | Effects & Animations | Intermediate | [04-effects-and-animations](04-effects-and-animations/) |
| 7.5 | AJAX with jQuery | Intermediate+ | [05-ajax-with-jquery](05-ajax-with-jquery/) |
| 7.6 | jQuery vs. Modern JavaScript | Intermediate+ | [06-jquery-vs-modern-js](06-jquery-vs-modern-js/) |

## How to Run These Demos

jQuery is loaded from a CDN (`code.jquery.com`) in every demo's `index.html` — just open
the file in your browser. **An internet connection is required** to load the jQuery
library, but nothing needs to be installed.

## How These Demos Are Tested

Besides the structural HTML checks used across this whole repo, every topic in this module
also ships a small `test.js` that loads the demo's HTML and script with
[jsdom](https://github.com/jsdom/jsdom), simulates the interaction (a click, a form submit,
a mocked AJAX call), and asserts the DOM ends up in the expected state. Run all of them from
the repository root with:

```bash
npm install
npm test
```

[Back to the main roadmap](../README.md)
