# Module 6: Advanced JavaScript

Building on Module 5's fundamentals, this module covers the JavaScript concepts that
explain *why* the language behaves the way it does (scope, closures, `this`, prototypes),
the tools for writing more robust code (error handling, destructuring, modules), and how to
talk to a server from the browser (Promises, `async`/`await`, the Fetch API) — everything
you need before moving on to a real backend in later modules.

**Difficulty range:** Intermediate to Advanced
**Prerequisites:** [Module 5: JavaScript Basics](../05-javascript-basics/)

## Topics

| # | Topic | Difficulty | Folder |
|---|---|---|---|
| 6.1 | Scope, Hoisting & Closures | Intermediate | [01-scope-hoisting-and-closures](01-scope-hoisting-and-closures/) |
| 6.2 | `this`, `call`/`apply`/`bind` | Intermediate | [02-this-call-apply-bind](02-this-call-apply-bind/) |
| 6.3 | Prototypes & Classes | Intermediate | [03-prototypes-and-classes](03-prototypes-and-classes/) |
| 6.4 | Destructuring, Spread/Rest & Modules | Intermediate | [04-destructuring-spread-rest-and-modules](04-destructuring-spread-rest-and-modules/) |
| 6.5 | Error Handling | Intermediate | [05-error-handling](05-error-handling/) |
| 6.6 | Regular Expressions | Intermediate+ | [06-regular-expressions](06-regular-expressions/) |
| 6.7 | JSON | Intermediate | [07-json](07-json/) |
| 6.8 | Async JavaScript: Promises & async/await | Intermediate+ | [08-async-promises-and-async-await](08-async-promises-and-async-await/) |
| 6.9 | The Fetch API & Calling a Real API | Intermediate+ | [09-fetch-api-and-api-calls](09-fetch-api-and-api-calls/) |
| 6.10 | Browser Storage | Intermediate | [10-browser-storage](10-browser-storage/) |
| 6.11 | Project: Consume a Public REST API | Advanced | [11-project-consume-a-rest-api](11-project-consume-a-rest-api/) |

## How to Run These Demos

Every topic here is a self-contained `index.html` + `script.js` pair. Open `index.html`
directly in your browser and check the DevTools Console where noted. Topics 6.9 and 6.11
make a real network request to a public API and need an internet connection — this is
called out in their own README.

## How These Demos Are Tested

Every topic ships an automated `test.js`. Run all of them from the repository root with:

```bash
npm install
npm test
```

[Back to the main roadmap](../README.md)
