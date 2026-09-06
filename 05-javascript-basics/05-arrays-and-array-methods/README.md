# 5.5: Arrays and Array Methods

**Difficulty:** Beginner+
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to create an array, read items by index, and check its `.length`
- Changing an array in place with `.push`, `.pop`, `.shift`, and `.unshift`
- Transforming and summarizing arrays with `.forEach`, `.map`, `.filter`, and `.reduce`
- Searching an array with `.find` and `.includes`

## Prerequisites
Topic 5.4: Functions

## Explanation

### Creating an array, indexing, and `.length`
An **array** is an ordered list of values, written between square brackets and separated
by commas:

```js
const fruits = ["apple", "banana", "cherry"];
```

Each value has a numeric **index** - its position in the list - starting at `0`, not `1`.
`fruits[0]` is `"apple"`, the first item; `fruits[2]` is `"cherry"`, the third. `.length`
tells you how many items are in the array, so the last valid index is always
`fruits.length - 1`.

### Changing an array: `.push`, `.pop`, `.shift`, `.unshift`
These four methods all **mutate** the array - they change it directly, rather than
producing a new one:

| Method | Effect |
|---|---|
| `.push(item)` | Adds `item` to the **end** of the array |
| `.pop()` | Removes and returns the item at the **end** |
| `.unshift(item)` | Adds `item` to the **start** of the array |
| `.shift()` | Removes and returns the item at the **start** |

### The core iteration methods: `.forEach`, `.map`, `.filter`, `.reduce`
All of these take a **callback** - a function you hand in as an argument, which the array
method itself calls once for every item (you have already seen callbacks handed to
`addEventListener` and `$(document).ready` in earlier topics).

- **`.forEach(callback)`** runs the callback once per item, purely for side effects (such
  as adding something to the page). It does not build or return anything.
- **`.map(callback)`** builds a **new** array of the same length, with each item replaced
  by whatever the callback returns for it - for example, turning an array of product
  objects into an array of just their names.
- **`.filter(callback)`** builds a **new** array containing only the items for which the
  callback returns `true` - for example, keeping only the products in one category. The
  original array is left unchanged.
- **`.reduce(callback, startingValue)`** boils an entire array down to a single value. The
  callback receives the running total so far and the current item, and returns the new
  running total; `startingValue` is the total before the first item is processed. This demo
  uses it to add up a list of prices into one number.

### Searching: `.find` and `.includes`
- **`.find(callback)`** returns the **first** item for which the callback returns `true`,
  or `undefined` if nothing matches. Unlike `.filter`, it returns one item, not an array.
- **`.includes(value)`** checks whether an exact value is present anywhere in the array,
  returning `true` or `false`. It does not change the array.

## The Demo
Open `script.js`.

- The top of the file creates a small `fruits` array to demonstrate indexing and
  `.length`.
- `demoArrayBasics()` builds a `shoppingList` and walks through `.push`, `.unshift`,
  `.includes`, `.pop`, and `.shift` one step at a time, logging the array's contents after
  each change - open DevTools Console to follow along.
- `products` is an array of product objects, each with a `name`, `price`, and `category`.
- `filterByCategory(productList, category)` uses `.filter` to keep only one category.
- `getProductNames(productList)` uses `.map` to turn a list of products into a list of just
  their names.
- `getTotalPrice(productList)` uses `.reduce` to add up a list of prices into one total.
- `findProductByName(productList, name)` uses `.find` to locate one specific product.
- `renderProductList()` combines all of the above: it filters `products` down to
  `"electronics"`, maps the result to names, uses `.forEach` to add each name as an `<li>`
  to `<ul id="product-list">`, and displays the `.reduce`-computed total in
  `<p id="total-price">`.

## How to Run
Open `index.html` directly in your browser (open DevTools Console too, where noted). No
installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a `"kitchen"` section to `index.html` (a second `<ul id="kitchen-list">`), then in
`script.js` call `filterByCategory(products, "kitchen")` and render its names into that new
list, the same way `renderProductList()` does for electronics.

## Key Takeaways
- Array items are indexed starting at `0`; `.length` gives the item count
- `.push`/`.pop` add and remove at the end; `.unshift`/`.shift` add and remove at the start
- `.map` transforms every item into a new array; `.filter` keeps only matching items in a
  new array; `.reduce` combines every item into a single value
- `.forEach` runs a callback for its side effects and returns nothing
- `.find` returns the first matching item; `.includes` just checks whether a value is
  present
