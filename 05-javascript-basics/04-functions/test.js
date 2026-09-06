// test.js — run with: node test.js  (from inside this folder)
const { add, subtract, multiply, divide } = require("./script.js");

if (add(2, 3) !== 5) {
  console.error("FAIL: add(2,3) should be 5");
  process.exit(1);
}
console.log("PASS: add(2,3) is 5");

if (subtract(5, 2) !== 3) {
  console.error("FAIL: subtract(5,2) should be 3");
  process.exit(1);
}
console.log("PASS: subtract(5,2) is 3");

if (multiply(4, 6) !== 24) {
  console.error("FAIL: multiply(4,6) should be 24");
  process.exit(1);
}
console.log("PASS: multiply(4,6) is 24");

if (divide(10, 2) !== 5) {
  console.error("FAIL: divide(10,2) should be 5");
  process.exit(1);
}
console.log("PASS: divide(10,2) is 5");

// divide's second parameter defaults to 1 when omitted.
if (divide(7) !== 7) {
  console.error("FAIL: divide(7) should default b to 1 and return 7");
  process.exit(1);
}
console.log("PASS: divide(7) uses its default parameter value and returns 7");

console.log("PASS: calculator functions work as expected");
