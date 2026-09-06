# 6.8: Async JavaScript: Promises & async/await

**Difficulty:** Intermediate+
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- The difference between synchronous and asynchronous code, and why the order code
  appears on the page is not always the order it runs in
- What a Promise is and its three states: pending, fulfilled, rejected
- Consuming a Promise with `.then()`, `.catch()`, and `.finally()`
- Running several Promises at once with `Promise.all()`
- Writing the same asynchronous logic with `async`/`await` and `try/catch`

## Prerequisites
Topics 6.1-6.7 (especially error handling in 6.5). This is the hardest new idea in the
whole module, so this topic uses no real network calls at all - just a timer - so you can
focus entirely on execution order before topic 6.9 adds a real API on top of it.

## Explanation

### Synchronous vs. asynchronous
JavaScript runs **synchronously** by default: one line at a time, top to bottom, and each
line finishes completely before the next one starts. Some operations, though - a timer, a
network request, reading a file - take an unpredictable amount of real time to finish.
JavaScript does not freeze and wait for these; instead, it hands the operation off and
keeps running the rest of the script immediately. Only once that background operation
finishes does JavaScript come back and run the code you attached to it. This is called
**asynchronous** ("async" for short) behavior.

The classic way to see this is with `console.log` around a `setTimeout`:

```js
console.log("1. Before setTimeout");
setTimeout(function () {
  console.log("3. Inside setTimeout (runs last, even with 0ms delay)");
}, 0);
console.log("2. After setTimeout");
```

This logs `1`, then `2`, then `3` - never `1, 3, 2` - even though the delay is `0`
milliseconds. The `setTimeout` callback always has to wait for the rest of the currently
running script to finish first, no matter how short its delay is. Demo 1 on this page lets
you watch this happen live.

### What is a Promise?
A **Promise** is a JavaScript object that acts as a placeholder for a value you don't have
yet, but will (or won't) have at some point in the future. Every Promise starts in the
**pending** state, and settles into exactly one of two final states, exactly once:

- **fulfilled** - the operation succeeded, and the Promise now holds a result value
- **rejected** - the operation failed, and the Promise now holds an error

Once a Promise settles, it stays settled - it never changes state again.

### Consuming a Promise: `.then()` / `.catch()` / `.finally()`
- `.then(onFulfilled)` registers a function to run once the Promise is fulfilled, and
  receives the result value as its argument.
- `.catch(onRejected)` registers a function to run instead, if the Promise is rejected.
- `.finally(fn)` registers a function that runs either way, once the Promise has settled -
  a good place for cleanup that should happen regardless of success or failure, like
  hiding a loading message.

```js
wait(1500)
  .then(function (result) { /* success */ })
  .catch(function (error) { /* failure */ })
  .finally(function () { /* either way */ });
```

### Running several Promises together: `Promise.all()`
`Promise.all([p1, p2, p3])` takes an array of Promises that are already running at the same
time, and returns one new Promise that fulfills once **every** one of them has fulfilled -
with an array of their results, in the same order. If any one of them rejects, the whole
thing rejects immediately. Because the Promises run concurrently rather than one after
another, the total time is close to the *longest* individual one, not the sum of all of
them - demo 4 shows this directly.

### `async`/`await`: the same thing, written differently
`async`/`await` is not a separate feature from Promises - it's syntax sugar built on top of
them, so the two demos below produce identical results. Marking a function `async` means it
always returns a Promise, and unlocks the `await` keyword inside it. `await somePromise`
pauses *that function only* (the rest of the page keeps working normally) until the Promise
settles, then either hands back its fulfilled value directly, or throws its rejection
reason as a normal JavaScript error - which means you can handle it with an ordinary
`try/catch`, exactly like the error handling covered in 6.5:

```js
async function loadSomething() {
  try {
    var result = await wait(1500);
    // use result
  } catch (error) {
    // handle the failure
  } finally {
    // runs either way
  }
}
```

## The Demo
`script.js` defines two hand-written Promise-returning helpers:

- `wait(ms)` returns a Promise that resolves (with a message) after `ms` milliseconds,
  using a real `setTimeout` internally - simulating a slow operation with no actual network
  call involved.
- `waitAndFail(ms)` is identical, except it always rejects, purely so demo 5 has a failure
  to catch.

The five buttons on the page each call a demo function:
- `runOrderDemo` (demo 1) logs the synchronous-vs-asynchronous ordering explained above,
  both to the Console and to the on-page numbered list.
- `runThenDemo` (demo 2) calls `wait(1500)` and consumes it with `.then()`/`.catch()`/
  `.finally()`, updating a status message from "Loading..." to "Done!".
- `runAwaitDemo` (demo 3) calls the exact same `wait(1500)`, but consumes it with
  `async`/`await` and `try/catch/finally` instead - compare it side by side with demo 2.
- `runAllDemo` (demo 4) awaits `Promise.all([wait(1000), wait(1500), wait(2000)])` and
  reports the total elapsed time, to show the three waits ran concurrently.
- `runErrorDemo` (demo 5) awaits `waitAndFail(1200)` inside a `try/catch`, showing the
  caught error message on the page.

All of the DOM-wiring code (the `document.addEventListener(...)` calls near the bottom of
`script.js`) is wrapped in `if (typeof document !== "undefined") { ... }`, so `test.js` can
`require()` this file in plain Node - where there is no `document` - and use `wait()` and
`waitAndFail()` directly without any of the page-wiring code running or erroring.

## How to Run
Open `index.html` directly in your browser. Everything on this page runs locally with
timers - no internet connection or external API is used.

## How This Demo Is Tested
This topic has an automated test in `test.js` that does not require an internet connection
(it only exercises `wait()` and `waitAndFail()` with short, real delays). Run it with
`node test.js` from inside this folder (or run every topic's tests at once from the repo
root with `npm test`).

## Try It Yourself
Add a new button and a `runRaceDemo` function that uses `Promise.race([wait(1000),
wait(3000)])` instead of `Promise.all(...)`, and show the single result it settles with
first. Compare how quickly it finishes to the `Promise.all()` demo above.

## Key Takeaways
- JavaScript runs synchronous code top to bottom without pausing, and only comes back to
  handle an async result once the current script has finished running
- A Promise is a placeholder for a future value, and settles exactly once into either the
  fulfilled or rejected state
- `.then()`/`.catch()`/`.finally()` handle a Promise's success, failure, and completion
- `Promise.all()` runs several Promises concurrently and waits for all of them to finish
- `async`/`await` is syntax sugar over Promises that lets you write asynchronous code with
  ordinary `try/catch`, and produces the exact same behavior as `.then()`/`.catch()`
