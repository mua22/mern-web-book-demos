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

const testValue = "  JavaScript is the best  ";
const trimmed = testValue.trim();

const input = document.getElementById("text-input");
input.value = testValue;
input.dispatchEvent(new window.Event("input", { bubbles: true }));

const outputText = document.getElementById("output").textContent;

if (!outputText.includes(trimmed.toUpperCase())) {
  console.error("FAIL: output did not include the uppercase version of the input");
  process.exit(1);
}
console.log("PASS: output includes the uppercase transformation");

if (!outputText.includes(`Length: ${trimmed.length}`)) {
  console.error("FAIL: output did not include the correct trimmed length");
  process.exit(1);
}
console.log("PASS: output includes the correct trimmed length");

const expectedWords = trimmed.split(" ").filter((w) => w !== "");
if (!outputText.includes(`${expectedWords.length} word(s)`)) {
  console.error("FAIL: output did not include the correct word count");
  process.exit(1);
}
console.log("PASS: output includes the correct word count from split()");

if (!outputText.includes("Contains \"the\" (case-insensitive): true")) {
  console.error("FAIL: output did not correctly report that the text includes \"the\"");
  process.exit(1);
}
console.log("PASS: output correctly reports includes() result");
