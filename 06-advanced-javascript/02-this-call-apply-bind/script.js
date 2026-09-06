// script.js - 6.2 this, call/apply/bind

// ---------------------------------------------------------------------------
// The object whose method we are going to break, then fix two ways.
// ---------------------------------------------------------------------------
// The value of `this` inside a regular function is NOT decided by where the
// function is written - it is decided by HOW the function is called. Calling
// it as `user.greet()` (with `user.` right before the call) sets `this` to
// `user` for that call only.
var user = {
  name: "Amara",
  greet: function () {
    return "Hi, I'm " + this.name;
  },
};

// ---------------------------------------------------------------------------
// Part 1: the bug - losing `this`
// ---------------------------------------------------------------------------
// setTimeout does not call your function as a method. It stores whatever
// function you hand it, and later calls it on its own, with nothing before
// the call - like this: setTimeout(user.greet, 500). That is exactly the
// same problem as pulling the method out into a bare variable first, and
// then calling the bare variable, which is what this function does so the
// bug is easy to reproduce and test on its own:
function getBuggyGreeting() {
  var detachedGreet = user.greet; // only the FUNCTION travels, not `user`
  return detachedGreet(); // called with no receiver in front of it
}

// ---------------------------------------------------------------------------
// Part 2: fix #1 - Function.prototype.bind()
// ---------------------------------------------------------------------------
// .bind(user) does not call greet right away. It returns a BRAND NEW
// function that behaves like greet, except its `this` is permanently set to
// `user`, no matter how or where that new function is later called.
function getBoundGreeting() {
  var boundGreet = user.greet.bind(user);
  return boundGreet(); // this is locked to `user` forever
}

// ---------------------------------------------------------------------------
// Part 3: fix #2 - an arrow function
// ---------------------------------------------------------------------------
// Arrow functions never get their own `this`. Instead, they look `this` up
// lexically - from the nearest surrounding REGULAR function - at the moment
// they are defined. `greetLater` below is a regular function, so when it is
// called as `userWithArrowFix.greetLater()`, `this` inside it is
// `userWithArrowFix`. The arrow function defined inside it has no `this` of
// its own, so it simply reuses that one.
var userWithArrowFix = {
  name: "Amara",
  greetLater: function () {
    var arrowGreet = () => "Hi, I'm " + this.name;
    return arrowGreet();
  },
};
function getArrowFixedGreeting() {
  return userWithArrowFix.greetLater();
}

// ---------------------------------------------------------------------------
// Bonus: call() and apply() - setting `this` explicitly, immediately
// ---------------------------------------------------------------------------
// Unlike bind(), call() and apply() invoke the function right away with a
// `this` you choose as their first argument. The only difference between
// them is how any OTHER arguments are passed: call() takes them one by one,
// apply() takes them bundled into a single array.
function introduce(greeting, punctuation) {
  return greeting + ", I'm " + this.name + punctuation;
}
function getCallExample() {
  return introduce.call(user, "Hello", "!"); // arguments listed one by one
}
function getApplyExample() {
  return introduce.apply(user, ["Hello", "!"]); // arguments bundled into an array
}

// ---------------------------------------------------------------------------
// Wire the buttons on the page to these functions (skipped in Node, where
// this file is loaded by test.js and there is no `document`).
// ---------------------------------------------------------------------------
if (typeof document !== "undefined") {
  var showResult = function (elementId, label, value) {
    document.getElementById(elementId).textContent = label + ": " + value;
  };

  document.getElementById("bug-btn").addEventListener("click", function () {
    // setTimeout(fn, delay) calls fn later, on its own - the same detached
    // call that getBuggyGreeting() reproduces synchronously above.
    setTimeout(function () {
      showResult("bug-result", "Result", getBuggyGreeting());
    }, 0);
  });

  document.getElementById("bind-btn").addEventListener("click", function () {
    setTimeout(function () {
      showResult("bind-result", "Result", getBoundGreeting());
    }, 0);
  });

  document.getElementById("arrow-btn").addEventListener("click", function () {
    setTimeout(function () {
      showResult("arrow-result", "Result", getArrowFixedGreeting());
    }, 0);
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    getBuggyGreeting,
    getBoundGreeting,
    getArrowFixedGreeting,
    getCallExample,
    getApplyExample,
  };
}
