// test.js — run with: node test.js  (from inside this folder)
//
// This test never touches a real browser. It loads index.html into a jsdom
// document (jsdom provides a real, in-memory localStorage implementation),
// then exercises loadNotes/saveNotes/renderNotes/addNote/removeNote
// directly - both the storage round-trip and the rendering logic.
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only", url: "http://localhost/" });
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;

const { loadNotes, saveNotes, renderNotes, addNote, removeNote } = require("./script.js");

// --- localStorage + JSON round-trip ---
if (loadNotes().length !== 0) {
  console.error("FAIL: loadNotes() should start empty");
  process.exit(1);
}
console.log("PASS: loadNotes() returns an empty array when nothing is stored yet");

saveNotes(["Buy milk", "Walk the dog"]);
const reloaded = loadNotes();
if (reloaded.length !== 2 || reloaded[0] !== "Buy milk" || reloaded[1] !== "Walk the dog") {
  console.error("FAIL: saveNotes()/loadNotes() should round-trip an array via JSON, got: " + JSON.stringify(reloaded));
  process.exit(1);
}
console.log("PASS: saveNotes() and loadNotes() round-trip an array through localStorage using JSON");

// --- renderNotes ---
renderNotes(["First note", "Second note"]);
const items = document.querySelectorAll("#note-list li");
if (items.length !== 2) {
  console.error("FAIL: expected 2 rendered notes, got " + items.length);
  process.exit(1);
}
if (!items[0].textContent.includes("First note")) {
  console.error("FAIL: first note text missing");
  process.exit(1);
}
console.log("PASS: renderNotes renders one <li> per note");

if (!document.getElementById("empty-message").classList.contains("hidden")) {
  console.error("FAIL: the empty message should be hidden when there are notes");
  process.exit(1);
}
console.log("PASS: renderNotes hides the empty message when there are notes");

renderNotes([]);
if (document.getElementById("empty-message").classList.contains("hidden")) {
  console.error("FAIL: the empty message should be visible when there are no notes");
  process.exit(1);
}
console.log("PASS: renderNotes shows the empty message when the list is empty");

// --- addNote / removeNote ---
let notes = [];
notes = addNote(notes, "  Learn JSON  ");
if (notes.length !== 1 || notes[0] !== "Learn JSON") {
  console.error("FAIL: addNote should add a trimmed note, got: " + JSON.stringify(notes));
  process.exit(1);
}
console.log("PASS: addNote adds a trimmed note and saves it");

notes = addNote(notes, "   ");
if (notes.length !== 1) {
  console.error("FAIL: addNote should ignore a blank/whitespace-only note");
  process.exit(1);
}
console.log("PASS: addNote ignores a blank note");

notes = addNote(notes, "Second note");
notes = removeNote(notes, 0);
if (notes.length !== 1 || notes[0] !== "Second note") {
  console.error("FAIL: removeNote should remove the note at the given index, got: " + JSON.stringify(notes));
  process.exit(1);
}
console.log("PASS: removeNote removes the note at the given index and saves the result");

const persisted = loadNotes();
if (persisted.length !== 1 || persisted[0] !== "Second note") {
  console.error("FAIL: removeNote's result should be persisted to localStorage");
  process.exit(1);
}
console.log("PASS: addNote/removeNote persist changes to localStorage");
