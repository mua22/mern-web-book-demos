// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// --- Part 1: pure array-method functions, tested directly from plain Node ---
const {
  products,
  demoArrayBasics,
  filterByCategory,
  getProductNames,
  getTotalPrice,
  findProductByName,
} = require("./script.js");

const basicsResult = demoArrayBasics();
if (JSON.stringify(basicsResult) !== JSON.stringify(["Bread", "Eggs"])) {
  console.error("FAIL: demoArrayBasics should end with ['Bread', 'Eggs'] after push/unshift/pop/shift");
  process.exit(1);
}
console.log("PASS: push/unshift/pop/shift leave the shopping list as expected");

const electronics = filterByCategory(products, "electronics");
if (electronics.length !== 3) {
  console.error("FAIL: expected 3 electronics products, found " + electronics.length);
  process.exit(1);
}
console.log("PASS: filterByCategory finds 3 electronics products");

const names = getProductNames(electronics);
if (names.indexOf("Wireless Mouse") === -1 || names.indexOf("Headphones") === -1) {
  console.error("FAIL: getProductNames should include 'Wireless Mouse' and 'Headphones'");
  process.exit(1);
}
console.log("PASS: getProductNames maps products to their names");

const total = getTotalPrice(electronics);
if (total !== 130) {
  console.error("FAIL: getTotalPrice(electronics) should be 130, got " + total);
  process.exit(1);
}
console.log("PASS: getTotalPrice reduces the electronics prices to 130");

const found = findProductByName(products, "Coffee Mug");
if (!found || found.price !== 8) {
  console.error("FAIL: findProductByName should find the Coffee Mug at price 8");
  process.exit(1);
}
console.log("PASS: findProductByName finds the Coffee Mug");

// --- Part 2: rendered output, checked with jsdom ---
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const document = window.document;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);
document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));

const items = document.querySelectorAll("#product-list li");
if (items.length !== 3) {
  console.error("FAIL: expected 3 rendered product list items, found " + items.length);
  process.exit(1);
}
console.log("PASS: product list rendered 3 electronics items");

const totalText = document.getElementById("total-price").textContent;
if (totalText.indexOf("130") === -1) {
  console.error("FAIL: #total-price should mention the total 130, got: " + totalText);
  process.exit(1);
}
console.log("PASS: #total-price displays the correct running total");
