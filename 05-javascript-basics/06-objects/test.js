const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const document = window.document;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);
document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));

// The student object starts with 5 data properties (describe() is a method,
// not data, so it should be skipped when rendering the list).
let items = document.querySelectorAll("#output li");
if (items.length !== 5) {
  console.error(`FAIL: expected 5 rendered properties, got ${items.length}`);
  process.exit(1);
}
console.log("PASS: initial render lists all 5 data properties");

// Update GPA (dot notation) and confirm the rendered value changes.
document.getElementById("update-gpa-btn").dispatchEvent(new window.Event("click", { bubbles: true }));
const gpaItem = Array.from(document.querySelectorAll("#output li")).find((li) =>
  li.textContent.startsWith("gpa:")
);
if (!gpaItem || !gpaItem.textContent.includes("3.9")) {
  console.error("FAIL: updating gpa did not update the rendered value");
  process.exit(1);
}
console.log("PASS: updating a property updates the rendered card");

// Add a minor (bracket notation) and confirm the property count grows.
document.getElementById("add-minor-btn").dispatchEvent(new window.Event("click", { bubbles: true }));
items = document.querySelectorAll("#output li");
if (items.length !== 6) {
  console.error(`FAIL: expected 6 rendered properties after adding one, got ${items.length}`);
  process.exit(1);
}
console.log("PASS: adding a property adds a new rendered row");

// Delete isEnrolled and confirm the property count shrinks back down.
document.getElementById("delete-enrolled-btn").dispatchEvent(new window.Event("click", { bubbles: true }));
items = document.querySelectorAll("#output li");
const stillHasEnrolled = Array.from(items).some((li) => li.textContent.startsWith("isEnrolled:"));
if (items.length !== 5 || stillHasEnrolled) {
  console.error("FAIL: deleting a property did not remove it from the rendered card");
  process.exit(1);
}
console.log("PASS: deleting a property removes its rendered row");
