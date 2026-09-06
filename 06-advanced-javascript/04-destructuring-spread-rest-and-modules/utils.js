// utils.js - 6.4 Destructuring, Spread/Rest and Modules
//
// Every function here is exported with a plain `export function ...`. This
// file never touches the DOM, which is what makes it possible to test on
// its own, straight from Node, with no browser involved at all (see
// test.js).

// A plain named export - main.js imports it as `import { formatCurrency }
// from "./utils.js"`.
export function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

// Takes a single array argument and adds up its contents.
export function sumPrices(prices) {
  return prices.reduce(function (total, price) {
    return total + price;
  }, 0);
}

// Uses a REST PARAMETER instead: `...nums` collects every argument passed
// to sumAll into one real array called `nums`, no matter how many arguments
// are given. This is different from sumPrices above, which takes exactly
// one argument that must already be an array - main.js calls this one as
// sumAll(...somePricesArray), using the SPREAD operator to turn an array
// back into individual arguments.
export function sumAll(...nums) {
  return nums.reduce(function (total, num) {
    return total + num;
  }, 0);
}
