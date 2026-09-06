// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// --- Part 1: pure logic functions, tested directly from plain Node ---
const { fizzBuzzValue, getDayName } = require("./script.js");

if (fizzBuzzValue(3) !== "Fizz") {
  console.error("FAIL: fizzBuzzValue(3) should be 'Fizz'");
  process.exit(1);
}
if (fizzBuzzValue(5) !== "Buzz") {
  console.error("FAIL: fizzBuzzValue(5) should be 'Buzz'");
  process.exit(1);
}
if (fizzBuzzValue(15) !== "FizzBuzz") {
  console.error("FAIL: fizzBuzzValue(15) should be 'FizzBuzz'");
  process.exit(1);
}
if (fizzBuzzValue(7) !== "7") {
  console.error("FAIL: fizzBuzzValue(7) should be the string '7'");
  process.exit(1);
}
console.log("PASS: fizzBuzzValue handles Fizz, Buzz, FizzBuzz, and plain numbers");

if (getDayName(1) !== "Sunday" || getDayName(7) !== "Saturday") {
  console.error("FAIL: getDayName should map 1 -> Sunday and 7 -> Saturday");
  process.exit(1);
}
if (getDayName(9) !== "Invalid day") {
  console.error("FAIL: getDayName(9) should be 'Invalid day'");
  process.exit(1);
}
console.log("PASS: getDayName maps day numbers to names, with a default for invalid input");

// --- Part 2: rendered output, checked with jsdom ---
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const document = window.document;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);
document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));

const fizzBuzzItems = document.querySelectorAll("#fizzbuzz-list li");
if (fizzBuzzItems.length !== 20) {
  console.error("FAIL: expected 20 rendered FizzBuzz list items, found " + fizzBuzzItems.length);
  process.exit(1);
}
if (fizzBuzzItems[14].textContent.indexOf("FizzBuzz") === -1) {
  console.error("FAIL: the 15th rendered item should mention FizzBuzz");
  process.exit(1);
}
console.log("PASS: FizzBuzz list rendered 20 items, including FizzBuzz for 15");

const dayItems = document.querySelectorAll("#day-name-list li");
if (dayItems.length !== 7) {
  console.error("FAIL: expected 7 rendered day-name list items, found " + dayItems.length);
  process.exit(1);
}
console.log("PASS: day-name list rendered all 7 days");
