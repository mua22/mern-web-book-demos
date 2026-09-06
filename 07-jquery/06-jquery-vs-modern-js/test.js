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

// The vanilla-JS button is bound immediately (no $(document).ready needed —
// see script.js), but the jQuery button is bound inside $(document).ready,
// which resolves on the next tick in this JSDOM setup, so we dispatch
// DOMContentLoaded and wait a tick before testing either button.
window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

setTimeout(() => {
  if ($("#panel-jquery").hasClass("open") || $("#panel-vanilla").hasClass("open")) {
    console.error("FAIL: both panels should start closed");
    process.exit(1);
  }
  console.log("PASS: both panels start closed");

  $("#btn-jquery").trigger("click");
  if (!$("#panel-jquery").hasClass("open")) {
    console.error("FAIL: clicking the jQuery button should open the jQuery panel");
    process.exit(1);
  }
  console.log("PASS: the jQuery button toggles its panel's 'open' class on");

  $("#btn-jquery").trigger("click");
  if ($("#panel-jquery").hasClass("open")) {
    console.error("FAIL: clicking the jQuery button again should close the jQuery panel");
    process.exit(1);
  }
  console.log("PASS: the jQuery button toggles its panel's 'open' class off again");

  $("#btn-vanilla").trigger("click");
  if (!$("#panel-vanilla").hasClass("open")) {
    console.error("FAIL: clicking the vanilla button should open the vanilla panel");
    process.exit(1);
  }
  console.log("PASS: the vanilla JS button toggles its panel's 'open' class on");

  $("#btn-vanilla").trigger("click");
  if ($("#panel-vanilla").hasClass("open")) {
    console.error("FAIL: clicking the vanilla button again should close the vanilla panel");
    process.exit(1);
  }
  console.log("PASS: the vanilla JS button toggles its panel's 'open' class off again");

  console.log("PASS: both buttons produce the same open/close behavior via two different approaches");
}, 0);
