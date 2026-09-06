// script.js - 6.1 Scope, Hoisting and Closures

// ---------------------------------------------------------------------------
// Part 1: scope - how var differs from let/const
// ---------------------------------------------------------------------------
// "Scope" is the region of code where a variable can be seen and used.
// - var is FUNCTION-scoped: it only cares about the nearest enclosing
//   function, and ignores blocks like if/for entirely.
// - let and const are BLOCK-scoped: they only exist inside the nearest { }
//   pair they were declared in, whether that block is a function, an if
//   statement, a loop, or just a bare { }.
function scopeDemo() {
  if (true) {
    var functionScoped = "I am function-scoped (var)";
    let blockScoped = "I am block-scoped (let)";
    console.log(functionScoped); // works: we are still inside the if-block
    console.log(blockScoped); // works: same reason
  }

  // We are now OUTSIDE the if-block, but still inside scopeDemo().
  console.log(functionScoped); // still works - var does not care about the if-block

  try {
    console.log(blockScoped); // blockScoped does not exist out here at all
  } catch (err) {
    console.log("blockScoped is not visible out here:", err.message);
  }
}
scopeDemo();

// ---------------------------------------------------------------------------
// Part 2: hoisting - function declarations vs. var vs. let/const
// ---------------------------------------------------------------------------
// "Hoisting" describes how JavaScript sets up a scope before running any of
// the code in it line by line. Different kinds of declarations are treated
// differently during this setup step.
function hoistingDemo() {
  // A function DECLARATION (function name() {...}) is hoisted completely -
  // both its name and its full body are moved to the top of the scope. That
  // is why calling sayHello() here, before its own line, still works.
  sayHello();
  function sayHello() {
    console.log("Hello from a hoisted function declaration!");
  }

  // var is also hoisted, but only the declaration itself, not the value
  // assigned to it. So the NAME hoistedVar exists from the top of the
  // function, but its value is `undefined` until the assignment line below
  // actually runs. Reading it early does not throw - it just prints
  // `undefined`, which can hide real bugs.
  console.log("hoistedVar before its assignment line runs:", hoistedVar);
  var hoistedVar = "assigned now";
  console.log("hoistedVar after its assignment line runs:", hoistedVar);

  // let and const are hoisted too, in the sense that JavaScript already
  // knows they exist - but they are placed in the "temporal dead zone"
  // (TDZ): a region where the variable exists but cannot be touched yet.
  // Reading a let/const before its declaration line throws a
  // ReferenceError instead of silently giving you `undefined`. This is
  // considered safer, because it turns a likely bug into an immediate,
  // obvious error.
  try {
    console.log(hoistedLet); // still in the TDZ here
  } catch (err) {
    console.log("Reading hoistedLet before its declaration throws:", err.message);
  }
  let hoistedLet = "assigned now too";
  console.log("hoistedLet after its declaration line runs:", hoistedLet);
}
hoistingDemo();

// ---------------------------------------------------------------------------
// Part 3: closures - a function that "remembers" its birth scope
// ---------------------------------------------------------------------------
// A closure happens whenever a function is defined inside another function
// and keeps access to that outer function's variables, even after the outer
// function has already finished running. createCounter() below returns
// THREE functions that all share the same private `count` variable - there
// is no other way to reach `count` from outside; it is not a property on
// anything, and it is not a global. Each call to createCounter() creates a
// brand-new, independent `count`.
function createCounter() {
  let count = 0; // private to this particular call of createCounter()

  return {
    increment: function () {
      count = count + 1;
      return count;
    },
    decrement: function () {
      count = count - 1;
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    },
  };
}

// ---------------------------------------------------------------------------
// Part 4: wire the counter up to the page
// ---------------------------------------------------------------------------
// This part touches `document`, so it is skipped when this file is loaded
// directly in Node (by test.js), where there is no `document` at all.
if (typeof document !== "undefined") {
  var counter = createCounter();
  var countDisplay = document.getElementById("count-display");

  var updateDisplay = function (value) {
    countDisplay.textContent = "Count: " + value;
  };

  document.getElementById("increment-btn").addEventListener("click", function () {
    updateDisplay(counter.increment());
  });
  document.getElementById("decrement-btn").addEventListener("click", function () {
    updateDisplay(counter.decrement());
  });
  document.getElementById("reset-btn").addEventListener("click", function () {
    updateDisplay(counter.reset());
  });
}

if (typeof module !== "undefined") {
  module.exports = { createCounter };
}
