// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const $ = require("jquery")(window);

// Load this topic's own script.js and run it inside the jsdom window.
const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

// jQuery's $(document).ready(...) resolves on the next event-loop tick in
// this JSDOM setup rather than synchronously, so we dispatch a
// DOMContentLoaded event and wait one tick before interacting with the page.
window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

setTimeout(() => {
  // Start empty.
  if ($("#item-list li").length !== 0) {
    console.error("FAIL: list should start empty");
    process.exit(1);
  }
  if ($("#empty-message").hasClass("hidden")) {
    console.error("FAIL: empty-message should be visible when the list is empty");
    process.exit(1);
  }
  console.log("PASS: list and empty-message start in the correct state");

  // Type a value and click Add.
  $("#item-input").val("Milk");
  $("#add-btn").trigger("click");

  if ($("#item-list li").length !== 1) {
    console.error("FAIL: clicking Add did not append a list item");
    process.exit(1);
  }
  console.log("PASS: clicking Add appends a new <li>");

  if ($("#item-input").val() !== "") {
    console.error("FAIL: the input should be cleared after adding an item");
    process.exit(1);
  }
  console.log("PASS: the input is cleared after adding an item");

  if ($("#item-list li").first().text().indexOf("Milk") === -1) {
    console.error("FAIL: the new <li> does not contain the typed text");
    process.exit(1);
  }
  console.log("PASS: the new <li> contains the typed text");

  if (!$("#empty-message").hasClass("hidden")) {
    console.error("FAIL: empty-message should be hidden once an item exists");
    process.exit(1);
  }
  console.log("PASS: empty-message is hidden once an item exists");

  if ($("#item-count").text() !== "Items: 1") {
    console.error("FAIL: item count was not updated after adding");
    process.exit(1);
  }
  console.log("PASS: item count text updated to 'Items: 1'");

  // Add a second item, then remove the first one using its own Remove button.
  $("#item-input").val("Eggs");
  $("#add-btn").trigger("click");

  if ($("#item-list li").length !== 2) {
    console.error("FAIL: a second Add click should result in 2 items");
    process.exit(1);
  }
  console.log("PASS: a second Add click results in 2 items");

  $("#item-list li").first().find(".remove-btn").trigger("click");

  if ($("#item-list li").length !== 1) {
    console.error("FAIL: clicking Remove did not remove exactly one item");
    process.exit(1);
  }
  if ($("#item-list li").first().text().indexOf("Eggs") === -1) {
    console.error("FAIL: the wrong item was removed");
    process.exit(1);
  }
  console.log("PASS: clicking an item's own Remove button removes just that item");

  // Toggle "done" by clicking the remaining item's text (not its button).
  const remaining = $("#item-list li").first();
  remaining.trigger("click");
  if (!remaining.hasClass("done")) {
    console.error("FAIL: clicking an item's text should toggle the 'done' class on");
    process.exit(1);
  }
  remaining.trigger("click");
  if (remaining.hasClass("done")) {
    console.error("FAIL: clicking an item's text again should toggle the 'done' class off");
    process.exit(1);
  }
  console.log("PASS: clicking an item's text toggles the 'done' class");

  // Remove the last item and confirm the empty state returns.
  remaining.find(".remove-btn").trigger("click");
  if ($("#item-list li").length !== 0 || $("#empty-message").hasClass("hidden")) {
    console.error("FAIL: removing the last item should restore the empty state");
    process.exit(1);
  }
  console.log("PASS: removing the last item restores the empty state");
}, 0);
