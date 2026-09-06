// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// ---------------------------------------------------------------------------
// Part 1: test the createCounter() closure directly - no DOM needed.
// Requiring script.js also runs its scope/hoisting console demo, which is
// harmless (it only logs to the console).
// ---------------------------------------------------------------------------
const { createCounter } = require("./script.js");

const counter = createCounter();
if (counter.increment() !== 1) {
  console.error("FAIL: first increment should return 1");
  process.exit(1);
}
if (counter.increment() !== 2) {
  console.error("FAIL: second increment should return 2");
  process.exit(1);
}
if (counter.decrement() !== 1) {
  console.error("FAIL: decrement should return 1");
  process.exit(1);
}
counter.reset();
if (counter.increment() !== 1) {
  console.error("FAIL: increment after reset should return 1");
  process.exit(1);
}
console.log("PASS: counter closure behaves correctly");

// Each call to createCounter() must have its own private `count` - that is
// the whole point of a closure over a locally-declared variable.
const counterB = createCounter();
counterB.increment();
counterB.increment();
counterB.increment();
if (counter.increment() !== 2) {
  console.error("FAIL: separate counters should not share state");
  process.exit(1);
}
if (counterB.increment() !== 4) {
  console.error("FAIL: counterB should have kept its own independent count");
  process.exit(1);
}
console.log("PASS: separate createCounter() calls have independent state");

// ---------------------------------------------------------------------------
// Part 2: load index.html with jsdom and confirm the buttons actually
// update the count shown on the page.
// ---------------------------------------------------------------------------
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

const countDisplay = window.document.getElementById("count-display");
if (countDisplay.textContent !== "Count: 0") {
  console.error("FAIL: count display should start at 'Count: 0'");
  process.exit(1);
}
console.log("PASS: count display starts at 'Count: 0'");

window.document.getElementById("increment-btn").dispatchEvent(new window.Event("click"));
window.document.getElementById("increment-btn").dispatchEvent(new window.Event("click"));
if (countDisplay.textContent !== "Count: 2") {
  console.error("FAIL: clicking Increment twice should show 'Count: 2', got " + countDisplay.textContent);
  process.exit(1);
}
console.log("PASS: clicking Increment updates the page");

window.document.getElementById("decrement-btn").dispatchEvent(new window.Event("click"));
if (countDisplay.textContent !== "Count: 1") {
  console.error("FAIL: clicking Decrement should show 'Count: 1', got " + countDisplay.textContent);
  process.exit(1);
}
console.log("PASS: clicking Decrement updates the page");

window.document.getElementById("reset-btn").dispatchEvent(new window.Event("click"));
if (countDisplay.textContent !== "Count: 0") {
  console.error("FAIL: clicking Reset should show 'Count: 0', got " + countDisplay.textContent);
  process.exit(1);
}
console.log("PASS: clicking Reset updates the page");
