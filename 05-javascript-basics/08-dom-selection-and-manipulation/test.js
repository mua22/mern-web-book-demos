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

document.querySelector("#item-input").value = "Milk";
document.querySelector("#add-btn").dispatchEvent(new window.Event("click", { bubbles: true }));

if (document.querySelectorAll("#item-list li").length !== 1) {
  console.error("FAIL: adding an item did not append a list item");
  process.exit(1);
}
console.log("PASS: adding an item appends a new <li>");

if (document.getElementById("item-count").textContent !== "1 item") {
  console.error(`FAIL: expected item count "1 item", got "${document.getElementById("item-count").textContent}"`);
  process.exit(1);
}
console.log("PASS: item count label updates correctly");

document.querySelector("#item-list li .item-text").dispatchEvent(new window.Event("click", { bubbles: true }));
if (!document.querySelector("#item-list li").classList.contains("done")) {
  console.error("FAIL: clicking item text did not toggle the done class");
  process.exit(1);
}
console.log("PASS: clicking item text toggles the done class");

document.querySelector("#item-list li .remove-btn").dispatchEvent(new window.Event("click", { bubbles: true }));
if (document.querySelectorAll("#item-list li").length !== 0) {
  console.error("FAIL: clicking remove did not remove the item");
  process.exit(1);
}
if (document.getElementById("item-count").textContent !== "0 items") {
  console.error("FAIL: item count did not return to 0 items after removal");
  process.exit(1);
}
console.log("PASS: removing an item deletes its <li> and updates the count");
