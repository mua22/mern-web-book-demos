// test.js — run with: node test.js  (from inside this folder)
//
// This test never makes a real network request. It loads index.html into a
// jsdom document, requires script.js against that document, and calls
// renderPosts(...) directly with a small hardcoded array to test the
// rendering logic in isolation. loadPosts() (the function that actually
// calls fetch()) is never invoked here, so no real HTTP request is made.
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
global.document = dom.window.document;

const { renderPosts } = require("./script.js");

renderPosts([
  { id: 1, title: "Hello World" },
  { id: 2, title: "Second Post" },
]);

const items = document.querySelectorAll("#post-list li");

if (items.length !== 2) {
  console.error("FAIL: expected 2 rendered posts, got " + items.length);
  process.exit(1);
}
console.log("PASS: renderPosts renders one <li> per post");

if (!items[0].textContent.includes("Hello World")) {
  console.error("FAIL: first post title missing");
  process.exit(1);
}
if (!items[1].textContent.includes("Second Post")) {
  console.error("FAIL: second post title missing");
  process.exit(1);
}
console.log("PASS: renderPosts renders the given posts' titles correctly");

// renderPosts should also clear out any previously rendered posts before
// rendering the new list, rather than appending to it forever.
renderPosts([{ id: 3, title: "Only Post" }]);
const secondPass = document.querySelectorAll("#post-list li");
if (secondPass.length !== 1) {
  console.error("FAIL: renderPosts should clear previous results, got " + secondPass.length + " items");
  process.exit(1);
}
console.log("PASS: renderPosts clears previously rendered posts before rendering again");
