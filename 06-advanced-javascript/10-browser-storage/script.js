// script.js - 6.10 Browser Storage
//
// A normal JavaScript variable lives only in memory - it disappears the
// moment the page is reloaded or closed. localStorage is a small, simple
// key/value store built into the browser that survives a reload, and even
// closing and reopening the browser entirely, until something explicitly
// clears it.

var STORAGE_KEY = "advanced-js-notes";

// --- loadNotes / saveNotes: talking to localStorage ---
//
// localStorage can only store STRINGS - both the key and the value passed
// to setItem() are always converted to text. To store something structured
// like an array of notes, we combine it with JSON.stringify()/JSON.parse()
// (from 6.7): stringify the array into JSON text to save it, and parse that
// text back into a real array when loading it again.
function loadNotes() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    // If the stored value is ever corrupted or not valid JSON, fail safe
    // with an empty list rather than crashing the page.
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// --- renderNotes: a separate, named function ---
//
// renderNotes(notes) only knows how to turn an array of note strings into
// <li> elements on the page - it doesn't know or care whether that array
// came from localStorage or was typed in by hand. That separation is what
// makes it testable: this folder's test.js calls renderNotes([...]) with a
// hardcoded array and checks the result directly.
function renderNotes(notes) {
  var list = document.getElementById("note-list");
  var emptyMessage = document.getElementById("empty-message");
  list.innerHTML = "";

  if (notes.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  notes.forEach(function (note, index) {
    var item = document.createElement("li");

    var text = document.createElement("span");
    text.textContent = note;
    item.appendChild(text);

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.dataset.index = String(index);
    item.appendChild(removeBtn);

    list.appendChild(item);
  });
}

// --- addNote / removeNote: update the data, save it, then re-render ---
function addNote(notes, text) {
  var trimmed = text.trim();
  if (trimmed === "") {
    return notes;
  }
  var updated = notes.concat([trimmed]);
  saveNotes(updated);
  return updated;
}

function removeNote(notes, index) {
  var updated = notes.filter(function (_note, i) {
    return i !== index;
  });
  saveNotes(updated);
  return updated;
}

// Guarded so requiring this file from test.js (in plain Node, with no real
// form to submit) never wires up event listeners that assume a document.
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    // Notes are loaded from localStorage as soon as the page loads, which is
    // what makes them survive a reload - this line is the whole reason the
    // notes are still there after refreshing the page.
    var notes = loadNotes();
    renderNotes(notes);

    document.getElementById("note-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("note-input");
      notes = addNote(notes, input.value);
      renderNotes(notes);
      input.value = "";
    });

    document.getElementById("note-list").addEventListener("click", function (event) {
      if (!event.target.classList.contains("remove-btn")) {
        return;
      }
      var index = Number(event.target.dataset.index);
      notes = removeNote(notes, index);
      renderNotes(notes);
    });
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    loadNotes: loadNotes,
    saveNotes: saveNotes,
    renderNotes: renderNotes,
    addNote: addNote,
    removeNote: removeNote,
  };
}
