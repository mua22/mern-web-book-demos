# 5.4: Functions

**Difficulty:** Beginner
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to write a function as a function declaration, a function expression, and an arrow
  function
- What parameters are, and how to give one a default value
- How `return` sends a value back out of a function
- A one-line preview of why arrow functions behave differently with `this` (full
  explanation in Topic 6.2)

## Prerequisites
Topic 5.3: Control Flow

## Explanation

### What a function is
A **function** is a named (or unnamed) block of code that does not run the moment it is
written - it only runs later, when something **calls** it. Calling a function can hand it
some values to work with, called **arguments**, which the function receives through its
declared **parameters** - named placeholders listed in parentheses. Functions let you write
a set of instructions once and reuse it anywhere you need that same behavior, instead of
copying and pasting code.

### Function declarations
```js
function add(a, b) {
  return a + b;
}
```
Starts with the `function` keyword and a name (`add`). `a` and `b` are its parameters.
**`return`** sends a value back to whatever called the function, and immediately ends the
function - any code written after a `return` statement never runs.

### Function expressions
```js
const subtract = function (a, b) {
  return a - b;
};
```
Here the function itself has no name of its own ("anonymous") and is instead stored in a
variable, `subtract`, using the same `=` assignment you already know from Topic 5.2. You
call it the same way either way: `subtract(5, 2)`.

### Arrow functions
```js
const multiply = (a, b) => a * b;
```
A shorter syntax, using `=>` instead of the `function` keyword, introduced in more recent
JavaScript. When the function's entire body is a single expression, you can drop the curly
braces and the word `return` entirely - the value of that expression is returned
automatically. (An arrow function can still use `{ }` and an explicit `return` for a
multi-line body, exactly like the other two styles, when it needs to.)

One difference worth knowing about now, as a preview: **arrow functions do not get their
own `this` value**, the way function declarations and function expressions do. What `this`
actually refers to is explained properly in Topic 6.2 - for now, just remember that this
difference exists, because it is one of the reasons a codebase might deliberately choose an
arrow function in one place and a regular function in another.

### Default parameter values
```js
const divide = (a, b = 1) => a / b;
```
Writing `b = 1` in the parameter list gives `b` a **default value**: if the caller does not
supply a second argument at all (or explicitly passes `undefined`), `b` automatically
becomes `1` instead of `undefined`. `divide(10, 2)` returns `5`; `divide(7)` returns `7`,
because `b` defaults to `1`.

## The Demo
Open `script.js`.

- `add(a, b)` is a function declaration.
- `subtract(a, b)` is a function expression.
- `multiply(a, b)` is an arrow function, with `this`-behavior noted in a comment.
- `divide(a, b = 1)` is an arrow function with a default parameter value.
- Each of the four calculator buttons in `index.html` has a `click` event listener attached
  in `script.js`. Clicking one reads the two input fields, converts their text to numbers
  with `Number(...)`, calls the matching function, and displays the result with a small
  shared helper, `showResult(label, value)`.

## How to Run
Open `index.html` directly in your browser (open DevTools Console too, where noted). No
installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a fifth operation - for example a `remainder` arrow function using the `%` operator
from Topic 5.2 - along with a new button in `index.html` and a matching click listener in
`script.js`.

## Key Takeaways
- A function declaration starts with `function name(...)`; a function expression stores an
  anonymous function in a variable; an arrow function uses `=>` and can skip `return` for a
  single-expression body
- Parameters are named placeholders for the values (arguments) a function is called with
- `return` sends a value back out of a function and ends it immediately
- A default parameter value (`b = 1`) is used automatically when the caller omits that
  argument
- Arrow functions do not get their own `this` - covered fully in Topic 6.2
