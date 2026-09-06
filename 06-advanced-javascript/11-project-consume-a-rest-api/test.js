// test.js — run with: node test.js  (from inside this folder)
//
// This test never makes a real network request. It loads index.html into a
// jsdom document, requires script.js against that document, and calls
// renderCountries(...) directly with small hardcoded arrays shaped like the
// REST Countries API's real response - searchCountries() (the function that
// actually calls fetch()) is never invoked here, so no real HTTP request is
// made.
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only", url: "http://localhost/" });
global.document = dom.window.document;
// script.js reads localStorage as soon as the page's DOMContentLoaded event
// fires (which jsdom dispatches automatically once parsing finishes), so
// this needs to be set up before requiring script.js below, even though
// this test never calls searchCountries()/exercises that code path itself.
global.localStorage = dom.window.localStorage;

const { renderCountries } = require("./script.js");

const mockCountries = [
  {
    name: { common: "Canada" },
    capital: ["Ottawa"],
    region: "Americas",
    population: 38000000,
    flags: { png: "https://example.com/canada.png", alt: "The flag of Canada" },
  },
  {
    name: { common: "Candy Land" },
    capital: ["Sweetville"],
    region: "Fictional",
    population: 12345,
    flags: { png: "https://example.com/candyland.png", alt: "A made-up flag" },
  },
];

renderCountries(mockCountries);

const cards = document.querySelectorAll("#results .country-card");
if (cards.length !== 2) {
  console.error("FAIL: expected 2 rendered country cards, got " + cards.length);
  process.exit(1);
}
console.log("PASS: renderCountries renders one card per country");

const firstCardText = cards[0].textContent;
if (!firstCardText.includes("Canada") || !firstCardText.includes("Ottawa") || !firstCardText.includes("Americas")) {
  console.error("FAIL: the first card should contain the country's name, capital, and region");
  process.exit(1);
}
console.log("PASS: a rendered card contains the country's name, capital, and region");

if (!firstCardText.includes("38,000,000") && !firstCardText.includes("38000000")) {
  console.error("FAIL: the first card should contain the country's population");
  process.exit(1);
}
console.log("PASS: a rendered card contains the country's population");

const firstFlag = cards[0].querySelector("img.country-flag");
if (!firstFlag || firstFlag.src !== "https://example.com/canada.png") {
  console.error("FAIL: the first card should render the country's flag image with the correct src");
  process.exit(1);
}
console.log("PASS: a rendered card includes the flag image with the correct src");

// renderCountries should also clear out any previously rendered cards.
renderCountries([mockCountries[0]]);
const secondPass = document.querySelectorAll("#results .country-card");
if (secondPass.length !== 1) {
  console.error("FAIL: renderCountries should clear previous results, got " + secondPass.length + " cards");
  process.exit(1);
}
console.log("PASS: renderCountries clears previously rendered cards before rendering again");

// An empty array should show a clear "no results" message, not a blank page.
renderCountries([]);
const noResultsMessage = document.querySelector("#results .no-results");
if (!noResultsMessage || noResultsMessage.textContent.trim() === "") {
  console.error("FAIL: renderCountries([]) should show a visible, non-empty 'no results' message");
  process.exit(1);
}
if (document.querySelectorAll("#results .country-card").length !== 0) {
  console.error("FAIL: renderCountries([]) should not render any country cards");
  process.exit(1);
}
console.log("PASS: renderCountries shows a 'no results' message for an empty array and renders no cards");
