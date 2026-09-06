// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const $ = require("jquery")(window);

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

function addItem(text) {
  $("#item-input").val(text);
  $("#add-btn").trigger("click");
}

setTimeout(() => {
  // Add an item AFTER script.js already ran, then remove it using the
  // delegated handler — this is the whole point of delegation: the <li> and
  // its Remove link did not exist when $('#item-list').on('click', ...) was
  // called, yet the delegated handler still catches the click.
  addItem("Milk");
  if ($("#item-list li").length !== 1) {
    console.error("FAIL: adding an item should append exactly one <li>");
    process.exit(1);
  }
  console.log("PASS: adding an item appends a new <li>");

  // Click the nested <span> inside the Remove link, not the <a> itself, to
  // prove the delegated handler matches an ancestor even when the click
  // event's target is a descendant of it.
  $("#item-list li").first().find(".remove-link span").trigger("click");
  if ($("#item-list li").length !== 0) {
    console.error("FAIL: clicking the nested span inside Remove should still remove the item (event delegation)");
    process.exit(1);
  }
  console.log("PASS: clicking a nested element inside Remove still removes the item via delegation");

  // Turn the delegated handler off and confirm Remove stops working.
  addItem("Eggs");
  $("#toggle-delegation-btn").trigger("click");
  if ($("#delegation-status").text() !== "Delegated click handling is: OFF") {
    console.error("FAIL: delegation-status did not update after turning delegation off");
    process.exit(1);
  }
  $("#item-list li").first().find(".remove-link").trigger("click");
  if ($("#item-list li").length !== 1) {
    console.error("FAIL: Remove should do nothing once the delegated handler has been turned off with .off()");
    process.exit(1);
  }
  console.log("PASS: .off() correctly disables the delegated Remove handler");

  // Turn it back on and confirm Remove works again.
  $("#toggle-delegation-btn").trigger("click");
  if ($("#delegation-status").text() !== "Delegated click handling is: ON") {
    console.error("FAIL: delegation-status did not update after turning delegation back on");
    process.exit(1);
  }
  $("#item-list li").first().find(".remove-link").trigger("click");
  if ($("#item-list li").length !== 0) {
    console.error("FAIL: Remove should work again after re-registering the delegated handler");
    process.exit(1);
  }
  console.log("PASS: re-registering the delegated handler restores Remove behavior");
}, 0);
