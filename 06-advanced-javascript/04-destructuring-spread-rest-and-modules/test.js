// test.js — run with: node test.js  (from inside this folder)
//
// utils.js uses real ES module syntax (`export function ...`). require()
// cannot load ES modules, so we use Node's native dynamic import() instead,
// which can load a plain .js file with `export`/`import` directly, with no
// extra configuration needed.
//
// main.js is NOT tested here, because it touches `document` directly (it
// renders the receipt onto the page) and has no `document` to use when run
// under plain Node - see its README's "How to Run" section for how to view
// it in a browser instead.
(async () => {
  const { formatCurrency, sumPrices, sumAll } = await import("./utils.js");

  if (formatCurrency(9.5) !== "$9.50") {
    console.error("FAIL: formatCurrency(9.5) should be '$9.50'");
    process.exit(1);
  }
  console.log("PASS: formatCurrency(9.5) === '$9.50'");

  if (formatCurrency(0) !== "$0.00") {
    console.error("FAIL: formatCurrency(0) should be '$0.00'");
    process.exit(1);
  }
  console.log("PASS: formatCurrency(0) === '$0.00'");

  if (sumPrices([1, 2, 3]) !== 6) {
    console.error("FAIL: sumPrices([1, 2, 3]) should be 6");
    process.exit(1);
  }
  console.log("PASS: sumPrices([1, 2, 3]) === 6");

  if (sumPrices([]) !== 0) {
    console.error("FAIL: sumPrices([]) should be 0");
    process.exit(1);
  }
  console.log("PASS: sumPrices([]) === 0");

  // sumAll uses a rest parameter (...nums), so it is called the same way
  // main.js calls it: by spreading an array into individual arguments.
  const prices = [4, 5, 6];
  if (sumAll(...prices) !== 15) {
    console.error("FAIL: sumAll(...[4, 5, 6]) should be 15");
    process.exit(1);
  }
  console.log("PASS: sumAll(...prices) === 15");

  if (sumAll() !== 0) {
    console.error("FAIL: sumAll() with no arguments should be 0");
    process.exit(1);
  }
  console.log("PASS: sumAll() with no arguments === 0");

  console.log("PASS: utils.js exports work as expected");
})();
