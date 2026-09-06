// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const document = window.document;

// JSDOM has already parsed the whole HTML string above before we get here,
// so the document is complete in the same way it would be once a real
// browser finishes parsing and a deferred script starts running. Evaluating
// script.js now, directly, mirrors what "defer" guarantees in a real
// browser: by the time this code runs, every element in the HTML exists.
const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

const message = document.getElementById("message");

if (!message) {
  console.error("FAIL: #message element not found in index.html");
  process.exit(1);
}

if (message.textContent.indexOf("changed by script.js") === -1) {
  console.error("FAIL: #message text was not updated by script.js");
  process.exit(1);
}

console.log("PASS: #message text was updated by script.js");
