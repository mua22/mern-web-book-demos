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

// JSDOM (built from a static HTML string, with no real browser page-load
// pipeline behind it) never fires a real "DOMContentLoaded" event on its
// own, so the $(document).ready(...) callback registered by script.js would
// otherwise wait forever. We dispatch that event ourselves. jQuery then
// resolves its internal "ready" state on the next tick of the event loop
// (not synchronously), so we also wait one tick with a real setTimeout
// before asserting on the DOM.
window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

setTimeout(() => {
  if ($("#greeting").text() !== "Hello from jQuery!") {
    console.error("FAIL: #greeting text was not updated by jQuery");
    process.exit(1);
  }
  console.log("PASS: #greeting text was updated to 'Hello from jQuery!'");

  if (!$("#greeting").is("[style*='color']")) {
    console.error("FAIL: #greeting did not get an inline color style");
    process.exit(1);
  }
  console.log("PASS: #greeting received a color style");

  const notes = $(".note");
  if (notes.length !== 2 || notes.filter(".highlighted").length !== 2) {
    console.error("FAIL: both .note paragraphs should have gained the .highlighted class");
    process.exit(1);
  }
  console.log("PASS: both .note paragraphs gained the .highlighted class");

  if ($("#selector-result").text().indexOf("3 list items") === -1) {
    console.error("FAIL: #selector-result did not report the correct <li> count");
    process.exit(1);
  }
  console.log("PASS: #selector-result correctly reports 3 list items found");
}, 0);
