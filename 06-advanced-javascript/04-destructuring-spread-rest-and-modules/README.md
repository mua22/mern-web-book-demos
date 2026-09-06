# 6.4: Destructuring, Spread/Rest and Modules

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- Pulling values out of arrays and objects with destructuring, including default values
  and renaming
- Copying and merging arrays and objects with the spread operator (`...`)
- Spreading an array into individual arguments for a function call
- Collecting any number of function arguments into a real array with rest parameters
- Splitting code across files with real ES modules: `export` and `import`

## Prerequisites
Topic 6.3: Prototypes and Classes.

## Explanation

### Object destructuring: pulling fields out, with defaults and renaming
Destructuring lets you pull values out of an object into their own variables in one
line, instead of writing `object.property` repeatedly:

```js
const student = { name: "Sana", year: 2 };
const { name, year } = student;
// name is "Sana", year is 2
```

Two extra tricks make this much more useful in real code:

```js
const { name: studentName = "Unknown" } = student;
```

- **Renaming** (`name: studentName`): the value still comes from `student.name`, but it's
  stored in a variable called `studentName` instead of `name`. Useful when `name` would
  clash with another variable, or when a more descriptive name helps readability.
- **Default value** (`= "Unknown"`): only used if `student.name` is `undefined` (for
  example, if the `name` property is missing entirely). If `student.name` already has a
  value, the default is ignored completely.

### Array destructuring: pulling items out by position
Arrays destructure by position instead of by name:

```js
const colors = ["red", "green"];
const [first, second, third = "blue"] = colors;
// first is "red", second is "green", third is "blue" (colors has no 3rd item)
```

You can also skip a position entirely by leaving an empty slot between commas:
`const [first, , third] = colors;` grabs the 1st and 3rd items and ignores the 2nd.

### The spread operator: copying and merging
The same `...` syntax used above for skipping/collecting is also used, in a different
position, to "spread" an array or object's contents out:

```js
const morning = ["eggs", "toast"];
const evening = ["pasta"];
const allMeals = [...morning, ...evening]; // ["eggs", "toast", "pasta"] - a new array

const base = { theme: "light", fontSize: 14 };
const overrides = { fontSize: 18 };
const settings = { ...base, ...overrides }; // { theme: "light", fontSize: 18 }
```

For objects, if the same key appears in more than one spread source, the **last one
spread wins** - that's why `settings.fontSize` above ends up `18`, not `14`. Spreading
also works directly inside a function call, turning an array's contents into separate
arguments:

```js
function add3(a, b, c) { return a + b + c; }
const nums = [1, 2, 3];
add3(...nums); // 6 - exactly like calling add3(1, 2, 3)
```

### Rest parameters: the opposite direction
A **rest parameter** does the reverse of spreading into a call - it collects any number
of arguments passed *into* a function and gathers them into one real array, inside the
function:

```js
function sum(...nums) {
  // nums is a real array here, no matter how many arguments were passed
  return nums.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3); // 6
sum(10);      // 10
sum();        // 0
```

Spread and rest use the identical `...` syntax, but in opposite directions: spread
*expands* something you already have (an array, going into separate arguments); rest
*collects* separate arguments into something new (an array, inside the function).

### ES modules: splitting code across files with `import`/`export`
Every topic before this one has used a single `script.js` file. Real projects split code
across many files instead, and modern JavaScript has a standard, built-in way to do
that - **ES modules** - with no extra tools required:

```html
<script type="module" src="main.js"></script>
```

`type="module"` tells the browser to treat `main.js` as a module instead of a classic
script - which is what unlocks the `import`/`export` keywords at all. Inside `utils.js`:

```js
export function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}
```

`export` in front of a function makes it available to other files. Inside `main.js`:

```js
import { formatCurrency } from "./utils.js";
```

This pulls `formatCurrency` in by name from `utils.js`. The `./` at the start is
required - it tells the browser "look for this file relative to me", the same way you'd
write a relative link in HTML.

## The Demo
This topic's demo is a small "receipt builder", split across two files as described
above:

- `utils.js` exports three plain, DOM-free helper functions: `formatCurrency(amount)`,
  `sumPrices(prices)` (takes a single array), and `sumAll(...nums)` (uses a rest
  parameter, so it takes any number of individual arguments instead).
- `main.js` imports all three, then works through every concept above in order:
  destructures `buyerName`/`orderId`/`note` out of a sample `order` object (with a
  rename and a default value), destructures the 1st and 3rd items out of a
  `groceryItems` array (with a default for the missing 3rd), spreads two item arrays
  together into `allItems`, spreads two options objects together into `receiptOptions`
  (showing the "last one wins" rule for the shared `taxRate` key), then spreads
  `allItems`'s prices into `sumAll(...allPrices)` to get a `subtotal`.
- The last part of `main.js` builds the final HTML for the receipt using
  `formatCurrency()` from `utils.js`, and writes it into `#receipt` on the page.

## How to Run
Open `index.html` directly in your browser. Because this uses ES modules
(`import`/`export`), some browsers block `file://` module loading for security reasons -
if the imports don't work when you just double-click the file, serve the folder with a
simple local server, e.g. run `npx serve .` (or Python's `python -m http.server`) inside
this folder and open the printed localhost URL instead.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`). The
test loads `utils.js` directly with Node's dynamic `import()` and checks its three
exported functions; `main.js` is exercised by opening `index.html` in a browser instead,
since it renders directly to the page.

## Try It Yourself
Add a `formatItemCount(items)` function to `utils.js` that returns a string like
`"3 items"` (using `items.length`), export it, import it into `main.js`, and add one
more `<p>` line to the rendered receipt that uses it.

## Key Takeaways
- Destructuring pulls values out of objects (by name) or arrays (by position) into their
  own variables, and supports both renaming and default values
- Spread (`...`) expands an array or object's contents - to copy it, merge it with
  another, or pass its items as separate function arguments
- Rest parameters (`...nums`) do the opposite of spread: they collect any number of
  individual function arguments into one real array
- `<script type="module">` plus `export`/`import` is the standard, build-tool-free way to
  split JavaScript across multiple files
- ES module imports can be blocked when opening a file directly from disk in some
  browsers - serving the folder with a simple local server fixes that
