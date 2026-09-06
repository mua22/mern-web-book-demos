# 6.5: Error Handling

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- How to use `try`, `catch`, and `finally` to handle errors without crashing your program
- How to throw your own errors with `throw new Error("message")`
- How to write a custom error class (extending `Error`) so calling code can tell error
  types apart
- The difference between catching an error locally and letting it propagate up to the caller
- How to turn a caught error into a friendly message for the user

## Prerequisites
Module 5: JavaScript Basics, plus 6.3 Prototypes & Classes (this topic extends the built-in
`Error` class).

## Explanation

When something goes wrong while your code is running — a user types text into a field that
expects a number, a network request fails, a value is missing — JavaScript can either crash
(stop executing) or you can handle the problem gracefully. The `try`/`catch` statement is
how you do the latter.

```js
try {
  // code that might fail
} catch (error) {
  // runs only if something inside try threw an error
} finally {
  // runs no matter what — whether try succeeded or catch ran
}
```

The `finally` block is optional and runs in every case, which makes it useful for cleanup
work (closing a connection, hiding a loading spinner) that has to happen either way.

You are not limited to reacting to errors JavaScript throws for you — you can throw your
own with `throw new Error("message")`. Once thrown, an error stops normal execution and
jumps straight to the nearest `catch` block that can handle it:

```js
function requirePositive(n) {
  if (n <= 0) {
    throw new Error("Value must be positive.");
  }
  return n;
}
```

### Custom error classes

A plain `Error` only tells you *that* something went wrong, not *what kind* of problem it
was. Since `Error` is a class (see 6.3 Prototypes & Classes), you can subclass it to create
your own, more specific error type:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);       // sets this.message
    this.name = "ValidationError";
  }
}
```

Now calling code can distinguish "the input was invalid" from any other kind of failure
using `instanceof`:

```js
try {
  parseAge("banana");
} catch (error) {
  if (error instanceof ValidationError) {
    // this is a problem with what the user typed
  } else {
    // something else went wrong — a bug, not bad input
    throw error; // let it propagate, we don't know how to handle it here
  }
}
```

### Catch locally, or let it propagate?

A good rule of thumb: catch an error where you can actually *do* something useful about it
— show a message, retry, fall back to a default. If a function has no good way to respond
to a failure (it doesn't know whether the caller wants a message shown, a retry attempted,
or something else entirely), it should let the error propagate up by not catching it at
all, or by catching it just to add context and then re-throwing it. Catching an error and
silently doing nothing ("swallowing" it) hides bugs and makes them much harder to find
later.

## The Demo

Open `script.js`. There are three parts:

1. **`ValidationError`** — a custom error class extending `Error`, giving it a distinct
   `name` so it is easy to recognize.
2. **`parseAge(input)`** — validates a raw string: it must be non-empty, a real number, a
   whole number, and positive. Any failure throws a `ValidationError` with a message aimed
   at a human reader. On success it returns the parsed number. Notice `parseAge` itself
   never touches the DOM or shows a message — it just validates and throws or returns. That
   is what makes it reusable and easy to test.
3. **The form submit handler** — this is where the `try/catch` lives. It calls `parseAge`,
   and on success shows the parsed value; on failure it checks `error instanceof
   ValidationError` and shows `error.message` in the page. This is the "catch it locally"
   case from the explanation above: the submit handler is exactly the place that knows how
   to turn a validation problem into feedback the user can act on.

## How to Run
Open `index.html` directly in your browser.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a second check to `parseAge` that rejects ages over 130 (throwing a `ValidationError`
with a message like `"Age must be realistic."`), then confirm the form shows your new
message when you type in `999`.

## Key Takeaways
- `try`/`catch`/`finally` lets you handle failures without crashing the whole program
- `throw new Error("message")` lets you signal your own failure conditions
- Extending `Error` with a custom class lets calling code distinguish error types with
  `instanceof`, instead of guessing from a string message
- Catch errors where you can act on them; otherwise let them propagate to a caller that can
