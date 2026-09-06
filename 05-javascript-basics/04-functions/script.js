// script.js - 5.4 Functions
//
// A function is a named (or unnamed) block of code that does not run the
// moment it is written - it only runs later, when something "calls" it,
// optionally handing it some values ("arguments") to work with. Functions
// let you package up a set of instructions once and reuse it as many times
// as you like, instead of repeating the same code everywhere you need it.
//
// JavaScript has three common ways to write one. Below, the same kind of
// operation (a two-number calculation) is written in each style, so you
// can compare them directly.

// ---------------------------------------------------------------------
// 1) Function declaration
// ---------------------------------------------------------------------
// Starts with the "function" keyword and a name. Declarations are
// "hoisted" - JavaScript makes them available to call even from code
// written earlier in the same file - though this course still writes them
// in the order they are used, for readability.
//
// "a" and "b" here are the function's PARAMETERS: named placeholders for
// the values it expects to receive. "return" sends a value back to
// wherever the function was called from, and immediately ends the
// function - any code after a return statement never runs.
function add(a, b) {
  return a + b;
}

// ---------------------------------------------------------------------
// 2) Function expression
// ---------------------------------------------------------------------
// An unnamed ("anonymous") function, created on the right-hand side of an
// assignment and stored in a variable. Unlike a declaration, a function
// expression is only available to call AFTER this line has run - it is not
// hoisted the same way.
const subtract = function (a, b) {
  return a - b;
};

// ---------------------------------------------------------------------
// 3) Arrow function
// ---------------------------------------------------------------------
// A shorter syntax introduced in modern JavaScript, using "=>" instead of
// the "function" keyword. When the whole body is a single expression, you
// can even drop the curly braces and the word "return" - the expression's
// value is returned automatically, as multiply() shows here.
//
// One important difference to know about now, in preview: arrow functions
// do not get their own "this" value the way the other two styles do. What
// "this" even means is explained fully in Topic 6.2 - for now, just know
// that this difference exists and is one reason to choose carefully
// between an arrow function and the other two styles in some situations.
const multiply = (a, b) => a * b;

// ---------------------------------------------------------------------
// 4) Arrow function with a default parameter value
// ---------------------------------------------------------------------
// A DEFAULT PARAMETER VALUE is used automatically when the caller does not
// supply that argument at all (or explicitly passes "undefined"). Here, if
// divide(10) is called with only one argument, "b" defaults to 1, so the
// function still returns a sensible number instead of NaN ("Not a
// Number") or an error.
const divide = (a, b = 1) => a / b;

// ---------------------------------------------------------------------
// Wiring the calculator buttons up to these functions
// ---------------------------------------------------------------------
// Guarded so this file can still be require()'d from plain Node (as
// test.js does) without a "document" to work with.
if (typeof document !== "undefined") {
  const inputA = document.getElementById("input-a");
  const inputB = document.getElementById("input-b");
  const result = document.getElementById("result");

  // showResult(label, value) is a small helper - itself another function,
  // this time one whose only job is to update the page - shared by every
  // button below so the display formatting only has to be written once.
  function showResult(label, value) {
    result.textContent = label + " = " + value;
  }

  // Number(...) converts the text an <input> holds into an actual number,
  // since every value read from an HTML input is text by default.
  document.getElementById("btn-add").addEventListener("click", function () {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    showResult(a + " + " + b, add(a, b));
  });

  document.getElementById("btn-subtract").addEventListener("click", function () {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    showResult(a + " - " + b, subtract(a, b));
  });

  document.getElementById("btn-multiply").addEventListener("click", function () {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    showResult(a + " * " + b, multiply(a, b));
  });

  document.getElementById("btn-divide").addEventListener("click", function () {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    showResult(a + " / " + b, divide(a, b));
  });
}

// Makes add, subtract, multiply, and divide importable from Node with
// require(...), for automated testing with no browser involved.
if (typeof module !== "undefined") {
  module.exports = { add, subtract, multiply, divide };
}
