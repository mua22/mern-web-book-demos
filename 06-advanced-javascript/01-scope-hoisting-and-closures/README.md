# 6.1: Scope, Hoisting and Closures

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- The difference between global scope, function scope, and block scope
- Why `var` behaves differently from `let`/`const` when it comes to scope
- What "hoisting" actually does to function declarations, `var`, and `let`/`const`
- What the "temporal dead zone" is and why it exists
- What a closure is, and how to use one to create truly private data

## Prerequisites
Module 5: JavaScript Basics.

## Explanation

### Scope: where can a variable be seen?
"Scope" just means: from which parts of your code can you see and use a given
variable? JavaScript has three kinds you'll run into constantly:

- **Global scope** - declared outside any function or block; visible everywhere in the
  file.
- **Function scope** - declared with `var` inside a function; visible anywhere inside
  that function, no matter how deeply nested in `if`/`for`/etc. blocks.
- **Block scope** - declared with `let` or `const` inside a `{ }` pair (a function body,
  an `if`, a `for` loop, or even a bare `{ }`); visible only inside that specific block.

The important part is how `var` and `let`/`const` disagree about blocks:

```js
function example() {
  if (true) {
    var a = "function-scoped";
    let b = "block-scoped";
  }
  console.log(a); // works - var ignores the if-block entirely
  console.log(b); // ReferenceError - b does not exist outside the if-block
}
```

`var` only respects function boundaries. `let` and `const` respect the exact `{ }` pair
they were declared in. This is one of the main reasons modern JavaScript almost always
uses `let`/`const` instead of `var` - block scope matches what most people intuitively
expect a loop or `if` to do.

### Hoisting: what happens before your code runs
Before JavaScript executes a scope line by line, it does a setup pass over that scope
first. This setup pass is called **hoisting**, and it treats different kinds of
declarations differently:

- A **function declaration** (`function name() { ... }`) is hoisted completely: both its
  name and its entire body are ready to use from the very top of the scope. This is why
  you can call a function before the line where it's written:

  ```js
  sayHi(); // works, even though sayHi is defined below
  function sayHi() {
    console.log("hi");
  }
  ```

- A **`var`** declaration is hoisted, but only the name - not its value. The variable
  exists from the top of the function, holding `undefined`, until the line that assigns
  it actually runs:

  ```js
  console.log(x); // undefined - not an error, just not assigned yet
  var x = 5;
  console.log(x); // 5
  ```

- A **`let`/`const`** declaration is also hoisted in the sense that JavaScript already
  knows the name exists, but the variable is unusable until its declaration line runs.
  This unusable period is called the **temporal dead zone (TDZ)**. Trying to read the
  variable while it's in the TDZ throws a `ReferenceError`, instead of quietly giving you
  `undefined`:

  ```js
  console.log(y); // ReferenceError: Cannot access 'y' before initialization
  let y = 5;
  ```

  This is considered an improvement over `var`'s behavior: a bug that `var` would hide
  (silently reading `undefined`) becomes an error you notice immediately with `let`.

### Closures: a function that remembers where it was born
A **closure** happens when a function is defined inside another function, and keeps
access to that outer function's variables even after the outer function has already
returned. This sounds abstract, so walk through it concretely:

```js
function makeGreeter(name) {
  return function () {
    console.log("Hello, " + name);
  };
}

const greetSana = makeGreeter("Sana");
makeGreeter("Bilal"); // this call has already finished...
greetSana(); // ...but greetSana() still remembers name = "Sana"
```

`makeGreeter("Sana")` runs, creates a local variable `name`, and returns a small
function. Normally, once `makeGreeter` finishes running, its local variables would be
gone. But because the returned function uses `name`, JavaScript keeps that specific
`name` alive, attached to that one returned function. Calling `makeGreeter` again with a
different argument creates a completely separate closure with its own `name` - they
never interfere with each other.

The most useful thing closures give you is **true privacy**: a variable that only your
returned functions can reach, with no way for outside code to read or overwrite it
directly (not even by digging through the object with a `for...in` loop - it simply
isn't a property of anything).

## The Demo
Open `script.js`. It has four parts:

- `scopeDemo()` shows `var` leaking out of an `if` block while `let` does not, then logs
  the results (open the browser console to see this).
- `hoistingDemo()` calls a function before its own declaration line (works), reads a
  `var` before its assignment line (prints `undefined`), and reads a `let` before its
  declaration line inside a `try/catch` (throws, caught and logged instead of crashing
  the page).
- `createCounter()` is the closure at the heart of this topic. It declares a private
  `count` variable and returns an object with `increment`, `decrement`, and `reset`
  functions that all close over that same `count` - there is no other way to reach it.
- The last block wires three buttons (`#increment-btn`, `#decrement-btn`, `#reset-btn`)
  to one `counter` object returned by `createCounter()`, and writes the current count
  into `#count-display` after every click.

That last block is wrapped in `if (typeof document !== "undefined") { ... }` so this same
`script.js` file can also be loaded directly by `test.js` in plain Node, where there is
no `document` to touch.

## How to Run
Open `index.html` directly in your browser, and also open the DevTools console (F12) to
see the scope and hoisting output logged when the page loads.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a fourth function to the object returned by `createCounter()` called
`incrementBy(n)` that adds `n` to the private `count` in one step, then wire it up to a
new button and a number `<input>` on the page.

## Key Takeaways
- `var` is function-scoped and ignores block boundaries; `let`/`const` are block-scoped
- Function declarations are fully hoisted, so they can be called before their own line
- `var` is hoisted as `undefined`; `let`/`const` are hoisted into an unusable "temporal
  dead zone" and throw if read too early
- A closure is a function that keeps access to the variables from the scope it was
  created in, even after that outer scope has finished running
- Closures are the standard way to create private state in JavaScript, without classes
  or any special syntax
