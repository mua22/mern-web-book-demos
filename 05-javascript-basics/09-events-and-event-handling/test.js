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

// Add an item via the button.
document.getElementById("item-input").value = "Finish homework";
document.getElementById("add-btn").dispatchEvent(new window.Event("click", { bubbles: true }));

if (document.querySelectorAll("#item-list li").length !== 1) {
  console.error("FAIL: adding an item did not append a list item");
  process.exit(1);
}
console.log("PASS: adding an item via the button appends a new <li>");

// Add a second item via the Enter key (keydown) to exercise that path too.
const input = document.getElementById("item-input");
input.value = "Buy groceries";
const enterEvent = new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true });
input.dispatchEvent(enterEvent);

if (document.querySelectorAll("#item-list li").length !== 2) {
  console.error("FAIL: pressing Enter did not add a second item");
  process.exit(1);
}
console.log("PASS: pressing Enter in the input also adds an item");

// This "Remove" button was created long after the page's own DOMContentLoaded
// listener ran, and never had a click listener attached to it directly.
// Clicking it should still work, because #item-list handles it via delegation.
const firstRemoveBtn = document.querySelector("#item-list li .remove-btn");
firstRemoveBtn.dispatchEvent(new window.Event("click", { bubbles: true }));

if (document.querySelectorAll("#item-list li").length !== 1) {
  console.error("FAIL: clicking a dynamically-added remove button (via delegation) did not remove its item");
  process.exit(1);
}
console.log("PASS: delegated click removes the correct dynamically-added item");

// Remove the last remaining item too, confirming the list can empty out completely.
document.querySelector("#item-list li .remove-btn").dispatchEvent(new window.Event("click", { bubbles: true }));

if (document.querySelectorAll("#item-list li").length !== 0) {
  console.error("FAIL: removing the last item did not empty the list");
  process.exit(1);
}
console.log("PASS: removing the last item empties the list");
