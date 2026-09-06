// script.js - 5.1 Embedding Scripts and the Browser
//
// console.log(...) prints a message to the browser's DevTools Console. It
// does not appear on the page itself - it is a tool for developers, used
// while building and debugging a page, not something visitors ever see.
// Open DevTools (F12, or right-click the page and choose "Inspect", then
// click the "Console" tab) before or after loading this page to see these
// messages appear.
console.log("script.js has started running.");
console.log("Because this <script> tag uses the defer attribute, this code only runs after the browser finished parsing the whole HTML document.");

// document is a special object every JavaScript file running in a browser
// can use. It represents the DOM (Document Object Model) - the browser's
// in-memory model of the page's structure, built while it parses the HTML.
// document.getElementById(...) searches that structure for one element with
// a matching id attribute and gives back a reference to it, or null if no
// such element exists.
const messageElement = document.getElementById("message");

// Why this line is safe here, but would NOT be safe without "defer":
//
// This <script> tag is in the <head>, which the browser reaches and starts
// reading before it has parsed any of the <body> - including the <p
// id="message"> element below. If this script had no "defer" (and no
// "async" either), the browser would download AND run script.js immediately,
// blocking all further HTML parsing until it finished. At that moment,
// #message would not exist yet, so document.getElementById("message") would
// return null, and the next line would throw an error trying to use a
// property of null.
//
// "defer" delays running this code until after the entire document has been
// parsed, so #message is guaranteed to exist by the time we get here.
if (messageElement) {
  // .textContent is a property every element has, holding its visible text.
  // Setting it replaces whatever text was there before - this is JavaScript
  // changing something the user actually sees on the page, not just logging
  // to the console.
  messageElement.textContent = "This text was changed by script.js, running after the page finished parsing (thanks to defer).";
  console.log("Updated #message on the page.");
} else {
  // This branch should never run in this demo, but it is good practice to
  // check that an element was actually found before using it.
  console.log("Could not find #message on the page.");
}

// --- A quick note on the two other options, for comparison ---
//
// <script src="script.js"></script>            (neither defer nor async)
//   Blocks HTML parsing completely: the browser stops, downloads the file,
//   runs it top to bottom, and only then resumes parsing the rest of the
//   page. This is why, for years, developers placed <script> tags at the
//   very end of <body> instead of in <head>: by the time the parser reached
//   the bottom, everything above had already been parsed, so blocking there
//   caused no problems and the script could safely find every element.
//
// <script src="script.js" async></script>
//   Downloads in the background like defer, but runs the INSTANT it finishes
//   downloading - which could be before the HTML parsing is done, and the
//   order between multiple async scripts is not guaranteed. Good for
//   independent scripts (like analytics) that do not touch the DOM and do
//   not depend on other scripts. Not a good fit for this demo, since we need
//   the DOM to be ready and predictable.
//
// <script src="script.js" defer></script>       (what this demo uses)
//   Downloads in the background AND always waits to run until parsing is
//   completely finished, in the order the defer scripts appear in the HTML.
//   That predictability is why this course uses defer, in the <head>, as the
//   default way to link a script from here on.
