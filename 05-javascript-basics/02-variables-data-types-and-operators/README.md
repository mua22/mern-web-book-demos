# 5.2: Variables, Data Types and Operators

**Difficulty:** Beginner
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- The difference between declaring a variable with `var`, `let`, and `const`
- JavaScript's primitive data types, and how to check a value's type with `typeof`
- Arithmetic, comparison, and logical operators
- Why `==` and `===` can give different answers, and why this course always prefers `===`

## Prerequisites
Topic 5.1: Embedding Scripts and the Browser

## Explanation

### Variables: `var`, `let`, `const`
A **variable** is a name you give to a stored value, so you can refer to it later instead
of retyping the value itself. JavaScript has three keywords for creating one:

```js
let score = 10;      // can be reassigned later
const pi = 3.14159;  // cannot be reassigned after this line
var oldStyle = "hi";  // the original keyword, from JavaScript's earliest versions
```

- **`let`** creates a variable whose value can change later with a plain `=` assignment.
- **`const`** creates a variable whose value can never be reassigned after it is first set.
  Trying to assign a new value to a `const` throws an error. Note that this is about the
  variable binding itself, not necessarily the contents of an object or array it points
  to - that distinction matters more once we reach objects and arrays, later in this
  module.
- **`var`** is the original keyword, still valid, but avoided in modern code because of
  scoping behavior that is easy to misuse. (What "scope" means exactly - which parts of a
  program can see which variables - is the subject of Module 6; for now, just know that
  `var` has looser, more error-prone rules than `let` and `const`.)

This course's default: reach for `const` first, and only switch to `let` when you already
know a variable's value needs to change later. Avoid `var` in new code.

### Primitive data types and `typeof`
Every value in JavaScript has a type. The basic ("primitive") types are:

| Type | Example | Meaning |
|---|---|---|
| `string` | `"hello"` | Text, written in quotes |
| `number` | `42`, `3.14` | Any numeric value - JavaScript does not separate integers from decimals |
| `boolean` | `true`, `false` | A yes/no, on/off value |
| `null` | `null` | "No value" - assigned deliberately, on purpose |
| `undefined` | `undefined` | "No value" - the automatic value of a variable that was declared but never assigned |

JavaScript also has two further primitive types worth knowing by name even though this
course does not use them directly: `bigint` (for integers too large for `number` to
represent precisely, written like `123n`) and `symbol` (a guaranteed-unique value,
occasionally used as a special kind of key). You will not need either in this module.

The **`typeof`** operator tells you a value's type as a string: `typeof "hi"` is
`"string"`, `typeof 42` is `"number"`, and so on. One famous quirk to remember: `typeof
null` returns `"object"`, not `"null"` - a bug baked into JavaScript's very first version
that is now permanent, because fixing it would break too much existing code on the web.

### Operators
An **operator** is a symbol that performs an operation on one or more values.

**Arithmetic operators**: `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%`
(remainder - "modulo" - the amount left over after dividing, e.g. `10 % 3` is `1`), and
`**` (exponent - raises to a power, e.g. `2 ** 3` is `8`).

**Comparison operators**: `>`, `<`, `>=`, `<=` compare size in the obvious way and produce a
`boolean`. `==`, `===`, `!=`, and `!==` compare equality, explained next.

**Logical operators**: `&&` (AND - true only if both sides are true), `||` (OR - true if
either side is true), and `!` (NOT - flips a boolean).

### `==` vs `===`
This is one of the most important habits to build early. `==` ("loose equality") converts
both sides to a common type before comparing - this automatic conversion is called **type
coercion**. That can produce surprising results: `5 == "5"` is `true`, even though one side
is a number and the other is a string of text, because JavaScript quietly converts the
string to a number first.

`===` ("strict equality") never coerces: it only returns `true` if both the value and the
type already match. `5 === "5"` is `false`. `5 === 5` is `true`.

**Always prefer `===` (and its opposite, `!==`)** over `==`/`!=`. Strict equality makes your
comparisons behave exactly as they look, and avoids a whole category of bugs caused by
JavaScript's coercion rules doing something you did not expect.

## The Demo
Open `script.js`.

- The top of the file briefly declares a `var`, a `let`, and a `const` to show the syntax
  side by side (including a commented-out line showing what reassigning a `const` would
  do: throw an error).
- `buildExamples()` returns an array of `{ label, value }` pairs, one for each `typeof`
  check and each arithmetic, comparison, and logical operator described above. It is a
  plain function with no connection to the page at all.
- `formatExample(example)` turns one pair into the string `"label -> value"`.
- `renderExamples()` is the only function that touches the DOM: it loops over
  `buildExamples()`, logs each formatted line to the console, and also appends it as an
  `<li>` inside `<ul id="output">` in `index.html`, so the results are visible directly on
  the page.

## How to Run
Open `index.html` directly in your browser (open DevTools Console too, where noted). No
installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a new example to the array inside `buildExamples()` in `script.js` - for example
`{ label: "10 === 10.0", value: 10 === 10.0 }` - and reload `index.html` to see your new
line appear in the output list.

## Key Takeaways
- `let` can be reassigned, `const` cannot; prefer `const` unless you know a value will
  change
- The primitive types are `string`, `number`, `boolean`, `null`, and `undefined` (plus
  `bigint` and `symbol`, by name only for now)
- `typeof` reports a value's type as a string - with the historical exception that
  `typeof null` is `"object"`
- `==`/`!=` coerce types before comparing; `===`/`!==` do not - always prefer the strict
  versions
- Logical `&&`, `||`, and `!` combine or invert boolean values
