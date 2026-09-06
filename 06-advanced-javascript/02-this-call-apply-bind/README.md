# 6.2: this, call/apply/bind

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- That the value of `this` is decided by HOW a function is called, not where it's written
- Why passing a method somewhere as a plain value (like to `setTimeout`) breaks its `this`
- How `.call()` and `.apply()` let you set `this` explicitly for a single call
- How `.bind()` creates a new function with `this` permanently locked in
- Why arrow functions never have their own `this`, and when that makes them the fix

## Prerequisites
Topic 6.1: Scope, Hoisting and Closures.

## Explanation

### `this` depends on how you call the function, not where you defined it
In a regular function, `this` is not fixed when the function is written - it is decided
fresh every time the function is *called*, based on what's in front of the call:

```js
const user = {
  name: "Amara",
  greet: function () {
    return "Hi, I'm " + this.name;
  },
};

user.greet(); // "Hi, I'm Amara" - called AS a method of user, so this = user
```

Because `user.greet()` is called with `user.` right before it, `this` inside `greet`
becomes `user` for that call. That is the whole rule for a regular function called as a
method: whatever is immediately before the dot becomes `this`.

### The bug: passing a method somewhere loses that connection
Trouble starts the moment you hand the *function itself* to something else, instead of
calling it as a method right there:

```js
const detachedGreet = user.greet; // only the FUNCTION moves - `user` does not
detachedGreet(); // called with nothing before it - this is NOT `user` anymore
```

This is exactly what happens with `setTimeout(user.greet, 500)`: `setTimeout` doesn't
call `user.greet()` as a method - it stores the function you gave it and calls it later,
on its own, with no object in front of it. The result: inside `greet`, `this` ends up
being the wrong thing (in a browser, the global `window` object; in Node, the global
object) - so `this.name` is not `"Amara"`, and the greeting comes out wrong.

### Fix 1: `.call()` and `.apply()` - set `this` immediately
`.call()` and `.apply()` run a function right away, letting you specify `this` yourself
as the very first argument:

```js
function introduce(greeting) {
  return greeting + ", I'm " + this.name;
}
introduce.call(user, "Hello");   // "Hello, I'm Amara" - arguments listed one by one
introduce.apply(user, ["Hello"]); // "Hello, I'm Amara" - arguments bundled in an array
```

They do the exact same job - the only difference is how you pass any *extra* arguments
the function needs: one at a time with `.call()`, or as a single array with `.apply()`.

### Fix 2: `.bind()` - lock in `this` for later
`.call()`/`.apply()` run the function immediately. `.bind()` does not run anything - it
returns a **brand-new function** that behaves like the original, except `this` is
permanently fixed to whatever you passed in, no matter how that new function is later
called:

```js
const boundGreet = user.greet.bind(user);
setTimeout(boundGreet, 500); // still works correctly - this is locked to `user`
```

This is the classic fix for the `setTimeout` problem: bind the method to the right
object *before* handing it off.

### Fix 3: arrow functions don't have their own `this` at all
Arrow functions (`() => { ... }`) are different from regular functions in one important
way: they do not get their own `this` when called. Instead, they look `this` up
*lexically* - meaning they simply reuse whatever `this` is in the surrounding code where
the arrow function was written, permanently:

```js
const user2 = {
  name: "Amara",
  greetLater: function () {
    const arrowGreet = () => "Hi, I'm " + this.name;
    return arrowGreet(); // `this` here is NOT its own - it's greetLater's `this`
  },
};
user2.greetLater(); // "Hi, I'm Amara" - because greetLater() was called as user2.greetLater()
```

Because the arrow function is written inside `greetLater`, and `greetLater` was called
as `user2.greetLater()` (so `this` inside it is `user2`), the arrow function simply
inherits that same `this`. This is why arrow functions are often reached for as callbacks
inside methods - there is no separate `this` for them to lose.

## The Demo
Open `script.js`. It defines the same buggy `user.greet` scenario, then two working
fixes, all built to be directly comparable:

- `getBuggyGreeting()` pulls `user.greet` into a bare variable and calls it with nothing
  before it - reproducing exactly what `setTimeout(user.greet, ...)` does internally.
- `getBoundGreeting()` calls `user.greet.bind(user)` first, then calls the result -
  always correct, regardless of how it's later called.
- `getArrowFixedGreeting()` calls `userWithArrowFix.greetLater()`, which wraps an arrow
  function around the greeting logic so it reuses `greetLater`'s own correct `this`.
- `getCallExample()` and `getApplyExample()` show `.call()` and `.apply()` doing the same
  job as each other, just passing arguments differently.
- The last block wires three buttons on the page to these functions, each wrapped in a
  real `setTimeout(..., 0)` so the demo genuinely reproduces (and then fixes) the
  callback scenario described above, not just a same-line function call.

## How to Run
Open `index.html` directly in your browser, click each button, and compare the three
results printed on the page.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a fourth button that calls `user.greet.call(user)` directly (no `setTimeout`
involved) and displays the result - confirm it's correct immediately, without needing
`.bind()` at all, because `.call()` sets `this` and runs the function in one step.

## Key Takeaways
- `this` is determined by how a function is called, not where it is defined
- Passing a method as a bare value (like to `setTimeout`) disconnects it from its object
- `.call()`/`.apply()` invoke a function immediately with a `this` you choose
- `.bind()` returns a new function with `this` permanently fixed, useful for callbacks
- Arrow functions never have their own `this` - they reuse the `this` of the code around
  where they were written
