// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// ---------------------------------------------------------------------------
// Part 1: test the plain functions directly - no DOM needed.
// ---------------------------------------------------------------------------
const {
  getBuggyGreeting,
  getBoundGreeting,
  getArrowFixedGreeting,
  getCallExample,
  getApplyExample,
} = require("./script.js");

// The exact wrong text getBuggyGreeting() returns depends on the
// environment it runs in (there is no single global `this.name` value
// across browsers and Node) - what matters, and what we can always assert,
// is that it is NOT the correct "Hi, I'm Amara" greeting, because the
// connection between greet() and `user` was lost.
var buggyResult = getBuggyGreeting();
if (buggyResult === "Hi, I'm Amara") {
  console.error("FAIL: getBuggyGreeting() should NOT produce the correct greeting");
  process.exit(1);
}
console.log("PASS: getBuggyGreeting() demonstrates the lost `this` (got: " + JSON.stringify(buggyResult) + ")");

if (getBoundGreeting() !== "Hi, I'm Amara") {
  console.error("FAIL: getBoundGreeting() should return 'Hi, I'm Amara'");
  process.exit(1);
}
console.log("PASS: .bind(user) fixes the greeting");

if (getArrowFixedGreeting() !== "Hi, I'm Amara") {
  console.error("FAIL: getArrowFixedGreeting() should return 'Hi, I'm Amara'");
  process.exit(1);
}
console.log("PASS: the arrow function fixes the greeting");

if (getCallExample() !== "Hello, I'm Amara!") {
  console.error("FAIL: getCallExample() should return \"Hello, I'm Amara!\"");
  process.exit(1);
}
console.log("PASS: .call() sets `this` and passes arguments one by one");

if (getApplyExample() !== "Hello, I'm Amara!") {
  console.error("FAIL: getApplyExample() should return \"Hello, I'm Amara!\"");
  process.exit(1);
}
console.log("PASS: .apply() sets `this` and passes arguments as an array");

// ---------------------------------------------------------------------------
// Part 2: load index.html with jsdom and confirm the three buttons write
// the expected results onto the page after their setTimeout(..., 0) fires.
// ---------------------------------------------------------------------------
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

window.document.getElementById("bug-btn").dispatchEvent(new window.Event("click"));
window.document.getElementById("bind-btn").dispatchEvent(new window.Event("click"));
window.document.getElementById("arrow-btn").dispatchEvent(new window.Event("click"));

setTimeout(function () {
  var bugText = window.document.getElementById("bug-result").textContent;
  if (bugText.indexOf("Amara") !== -1) {
    console.error("FAIL: the buggy button's result should not contain 'Amara', got: " + bugText);
    process.exit(1);
  }
  console.log("PASS: clicking Run Buggy Version shows an incorrect result on the page");

  var bindText = window.document.getElementById("bind-result").textContent;
  if (bindText !== "Result: Hi, I'm Amara") {
    console.error("FAIL: the bind button's result should be \"Result: Hi, I'm Amara\", got: " + bindText);
    process.exit(1);
  }
  console.log("PASS: clicking Run .bind() Fix shows the correct result on the page");

  var arrowText = window.document.getElementById("arrow-result").textContent;
  if (arrowText !== "Result: Hi, I'm Amara") {
    console.error("FAIL: the arrow button's result should be \"Result: Hi, I'm Amara\", got: " + arrowText);
    process.exit(1);
  }
  console.log("PASS: clicking Run Arrow Fix shows the correct result on the page");
}, 20);
