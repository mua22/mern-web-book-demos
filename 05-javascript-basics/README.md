# Module 5: JavaScript Basics

Everything so far has been about structure (HTML) and appearance (CSS, Bootstrap,
Tailwind), with jQuery as a first taste of scripting. This module steps back and builds
plain, modern JavaScript from the ground up: variables, control flow, functions, arrays,
objects, and the DOM — no library, just the language itself.

**Difficulty range:** Beginner to Intermediate
**Prerequisites:** [Module 1: HTML](../01-html/), [Module 2: CSS](../02-css/). Module 7
(jQuery) is not required first, but if you've done it, several ideas here (selecting
elements, handling events) will already feel familiar — this module explains what jQuery
was doing for you all along.

## Topics

| # | Topic | Difficulty | Folder |
|---|---|---|---|
| 5.1 | Embedding Scripts & the Browser | Beginner | [01-embedding-scripts-and-the-browser](01-embedding-scripts-and-the-browser/) |
| 5.2 | Variables, Data Types & Operators | Beginner | [02-variables-data-types-and-operators](02-variables-data-types-and-operators/) |
| 5.3 | Control Flow | Beginner | [03-control-flow](03-control-flow/) |
| 5.4 | Functions | Beginner | [04-functions](04-functions/) |
| 5.5 | Arrays & Array Methods | Beginner+ | [05-arrays-and-array-methods](05-arrays-and-array-methods/) |
| 5.6 | Objects | Beginner+ | [06-objects](06-objects/) |
| 5.7 | Strings & Template Literals | Beginner+ | [07-strings-and-template-literals](07-strings-and-template-literals/) |
| 5.8 | DOM Selection & Manipulation | Intermediate | [08-dom-selection-and-manipulation](08-dom-selection-and-manipulation/) |
| 5.9 | Events & Event Handling | Intermediate | [09-events-and-event-handling](09-events-and-event-handling/) |
| 5.10 | Working with Forms | Intermediate | [10-working-with-forms](10-working-with-forms/) |

## How to Run These Demos

Every topic here is a self-contained `index.html` + `script.js` pair (plus `style.css`
where it helps). Open `index.html` directly in your browser and open the browser's
DevTools Console to see logged output where noted — no server, no installation, no
internet connection required.

## How These Demos Are Tested

Every topic ships an automated `test.js`. Run all of them from the repository root with:

```bash
npm install
npm test
```

[Back to the main roadmap](../README.md)
