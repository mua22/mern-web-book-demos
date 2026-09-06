// script.js - 5.2 Variables, Data Types and Operators

// ---------------------------------------------------------------------
// Variables: var, let, const
// ---------------------------------------------------------------------
// A "variable" is a named storage location for a value. JavaScript has
// three keywords for declaring one. This is only a quick preview of the
// differences between them - the full rules about *scope* (which parts of
// your code can see a given variable) are covered properly in Module 6.

// "var" is the original way to declare a variable, from the very first
// version of JavaScript. It still works, but modern code avoids it because
// of confusing scoping rules (again, Module 6). You will mostly see it only
// in old code or older tutorials.
var oldStyleGreeting = "Hello (declared with var)";

// "let" declares a variable that CAN be reassigned later.
let score = 10;
score = score + 5; // reassigning is allowed - score is now 15

// "const" declares a variable that CANNOT be reassigned after it is first
// given a value. Trying to assign a new value to a const, like
// `pi = 3;` below, would throw a TypeError - that is why the line is
// commented out.
const pi = 3.14159;
// pi = 3; // <- uncommenting this line would crash the script

// Rule of thumb used throughout this course: prefer "const" by default: use
// "let" only for a variable you know needs to change later, and avoid "var"
// entirely in new code.

// ---------------------------------------------------------------------
// buildExamples(): a list of "label -> value" pairs demonstrating types
// and operators. This function does no DOM work at all - it just computes
// plain JavaScript values - which is what makes it easy to test directly
// from Node with no browser involved (see test.js).
// ---------------------------------------------------------------------
function buildExamples() {
  return [
    // --- Primitive types and typeof ---
    // "typeof" is an operator (not a function, even though it is often
    // written with parentheses) that returns a string naming the type of
    // whatever follows it.
    { label: 'typeof "hello"', value: typeof "hello" }, // "string"
    { label: "typeof 42", value: typeof 42 },            // "number"
    { label: "typeof true", value: typeof true },        // "boolean"
    { label: "typeof undefined", value: typeof undefined }, // "undefined"
    // A variable that has been declared but never given a value
    // automatically holds the special value "undefined".
    { label: "typeof null", value: typeof null },
    // Famous, long-standing quirk: typeof null returns "object", even
    // though null is really its own primitive type meaning "no value, on
    // purpose" (as opposed to undefined, which usually means "no value yet,
    // because nobody has assigned one"). This is a historical bug in
    // JavaScript's very first version that can never be fixed now without
    // breaking the entire web, so it just has to be memorized.

    // JavaScript also has two more primitive types you should recognize by
    // name, even though this course does not use them directly:
    // "bigint" (for whole numbers larger than "number" can represent
    // safely, written like 123n) and "symbol" (a unique, unforgeable value
    // often used as a special kind of object key).

    // --- Arithmetic operators ---
    { label: "5 + 3", value: 5 + 3 },
    { label: "10 - 4", value: 10 - 4 },
    { label: "6 * 7", value: 6 * 7 },
    { label: "20 / 4", value: 20 / 4 },
    { label: "10 % 3", value: 10 % 3 }, // % is the remainder operator
    { label: "2 ** 3", value: 2 ** 3 }, // ** raises to a power (2 cubed)

    // --- Comparison operators, and == vs === ---
    // "==" (loose equality) converts the two values to a common type before
    // comparing them - this is called "type coercion", and it can produce
    // surprising results, as the next line shows.
    { label: '5 == "5"', value: 5 == "5" }, // true - "5" is coerced to 5
    // "===" (strict equality) never coerces: it only returns true if both
    // the value AND the type already match. This is why this course, like
    // most modern JavaScript style guides, says: always prefer "===" (and
    // its opposite, "!=="), so comparisons behave exactly as they look.
    { label: '5 === "5"', value: 5 === "5" }, // false - different types
    { label: "5 === 5", value: 5 === 5 },     // true - same value, same type
    { label: '5 != "5"', value: 5 != "5" },   // false (loose, coerces)
    { label: '5 !== "5"', value: 5 !== "5" }, // true (strict, no coercion)
    { label: "7 > 3", value: 7 > 3 },
    { label: "7 <= 3", value: 7 <= 3 },

    // --- Logical operators ---
    { label: "true && false", value: true && false }, // AND: both must be true
    { label: "true || false", value: true || false },  // OR: at least one true
    { label: "!true", value: !true },                  // NOT: flips the value
  ];
}

// formatExample() takes one { label, value } pair and turns it into the
// "expression -> result" string shown both on the page and in the console.
// Also a plain function with no DOM involvement, so it is just as easy to
// test on its own.
function formatExample(example) {
  return example.label + " -> " + example.value;
}

// renderExamples() is the only part of this file that touches the page.
// It is guarded below so that requiring this file from plain Node (as
// test.js does, with no browser and no "document") never tries to run it.
function renderExamples() {
  const list = document.getElementById("output");
  if (!list) return;

  list.innerHTML = ""; // clear the placeholder "(Waiting...)" item

  const examples = buildExamples();
  examples.forEach(function (example) {
    const text = formatExample(example);
    console.log(text);

    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
}

// Because this script is loaded with defer, the whole page (including
// <ul id="output">) already exists by the time this line runs, so we can
// call renderExamples() immediately - no need to wait for any extra event.
if (typeof document !== "undefined") {
  renderExamples();
}

// This guard makes buildExamples and formatExample importable from Node
// with require(...), for automated testing, without needing a browser or
// jsdom at all - see test.js. In an actual browser, "module" does not
// exist, so this whole block is simply skipped.
if (typeof module !== "undefined") {
  module.exports = { buildExamples, formatExample };
}
