// script.js - 7.6 jQuery vs. Modern JavaScript
//
// Both buttons on this page do exactly the same thing - toggle an "open"
// class on their own panel - so you can compare the jQuery way and the
// plain ("vanilla", meaning no library at all) modern JavaScript way,
// side by side, doing identical work.

// updateStatus() is a plain function, shared by both buttons below, that
// reads the current state of both panels and writes a summary into the page.
function updateStatus() {
  // jQuery's .hasClass('open') returns true or false depending on whether
  // the selected element currently has that class.
  var jqueryOpen = $('#panel-jquery').hasClass('open');

  // Vanilla JavaScript's equivalent of a jQuery class check is the
  // classList property, available on every element: .classList.contains(
  // 'open') asks the same true/false question, with no library needed.
  var vanillaOpen = document.getElementById('panel-vanilla').classList.contains('open');

  document.getElementById('status').textContent =
    'jQuery panel: ' + (jqueryOpen ? 'open' : 'closed') +
    ' | Vanilla panel: ' + (vanillaOpen ? 'open' : 'closed');
}

// --- The jQuery version ---
$(document).ready(function () {
  $('#btn-jquery').on('click', function () {
    // .toggleClass('open'), covered in 7.2, adds the class if it's missing
    // and removes it if it's present - exactly the on/off behavior this
    // panel needs.
    $('#panel-jquery').toggleClass('open');
    updateStatus();
  });
});

// --- The vanilla JavaScript version ---
//
// Notice this code is NOT wrapped in anything like $(document).ready(...).
// That wrapper exists to guarantee elements exist before you select them
// (see 7.1) - but this <script> tag sits at the very end of index.html's
// <body>, after every element above it has already been parsed by the
// browser, so by the time this line runs, #btn-vanilla already exists.
// Modern JavaScript doesn't need its own version of $(document).ready(...)
// for this reason: placing your script tag last in the body has the same
// effect, without a library.
//
// document.getElementById('id') is the vanilla equivalent of jQuery's
// $('#id') - both find the one element with that id. .addEventListener(
// 'click', fn) is the vanilla equivalent of jQuery's .on('click', fn) -
// both run fn every time the element is clicked.
//
// The function passed here, () => { ... }, is an "arrow function" - a
// shorter way to write an anonymous function, popularized by modern
// JavaScript. () => { ... } means the same thing as function () { ... }
// used everywhere else in this module; arrow functions are simply newer,
// more compact syntax for the same idea (a callback with no name of its
// own), with a few small differences in more advanced code that are beyond
// what this demo needs.
document.getElementById('btn-vanilla').addEventListener('click', () => {
  // classList.toggle('open') is the vanilla equivalent of jQuery's
  // .toggleClass('open') - both add the class if it's missing and remove
  // it if it's present.
  document.getElementById('panel-vanilla').classList.toggle('open');
  updateStatus();
});
