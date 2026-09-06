// script.js - 6.8 Async JavaScript: Promises and async/await
//
// This topic has no real network call in it at all - everything here is
// simulated with setTimeout(), so we can focus purely on ORDER: what runs
// immediately, what runs later, and how to write code that reacts to
// something that finishes later without freezing the rest of the page.

// --- wait(ms): a hand-written Promise ---
//
// A Promise is a placeholder for a value that isn't ready yet. It always
// starts in the "pending" state, and settles into exactly one of two final
// states, exactly once:
//   - "fulfilled" - the operation succeeded, and the Promise now holds a
//     result value (delivered to whatever is waiting via resolve(value))
//   - "rejected" - the operation failed (delivered via reject(error))
//
// wait(ms) returns a Promise that starts a real timer with setTimeout, and
// calls resolve(...) - fulfilling the Promise - once that timer fires. Until
// then, the Promise just sits there, pending.
function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Waited " + ms + "ms");
    }, ms);
  });
}

// waitAndFail(ms) is the same idea, but always calls reject(...) instead of
// resolve(...) once the timer fires - simulating an operation that fails
// (a network error, a bad response, and so on) rather than one that
// succeeds. It exists purely so demo 5 has something to catch.
function waitAndFail(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("Something went wrong after " + ms + "ms"));
    }, ms);
  });
}

// --- Demo 1: synchronous vs. asynchronous order ---
//
// This is the single most important thing to understand about JavaScript
// before writing any async code. JavaScript runs one line at a time, top to
// bottom, and never pauses to "wait" for something in the background -
// instead, work that takes time (like a timer, or a network request) is
// handed off, and the rest of your code keeps running immediately. Only once
// everything else currently running has finished does JavaScript come back
// and run the callback for the thing that was handed off.
function runOrderDemo(logToPage) {
  console.log("1. Before setTimeout (runs first, immediately)");
  logToPage("1. Before setTimeout (runs first, immediately)");

  setTimeout(function () {
    // Even with a delay of 0ms, this callback still runs AFTER every line
    // of synchronous code below it, because it has to wait for the current
    // script to finish running first.
    console.log("3. Inside setTimeout (runs last, even with 0ms delay)");
    logToPage("3. Inside setTimeout (runs last, even with 0ms delay)");
  }, 0);

  console.log("2. After setTimeout (runs second, immediately)");
  logToPage("2. After setTimeout (runs second, immediately)");
}

// --- Demo 2: consuming wait() with .then()/.catch()/.finally() ---
//
// .then(onFulfilled) registers a function to run once the Promise is
// fulfilled, receiving its result value. .catch(onRejected) registers a
// function to run instead if the Promise is rejected. .finally(fn) runs
// either way, once the Promise has settled - a good place for cleanup, like
// hiding a loading message, that should happen no matter what.
function runThenDemo(setStatus) {
  setStatus("Loading...");

  wait(1500)
    .then(function (result) {
      setStatus("Done! (" + result + ")");
    })
    .catch(function (error) {
      setStatus("Error: " + error.message);
    })
    .finally(function () {
      console.log(".then() demo settled (fulfilled or rejected)");
    });
}

// --- Demo 3: consuming the exact same wait() with async/await ---
//
// async/await is not a different way of doing async work - it's syntax
// sugar over Promises that lets asynchronous code read almost like ordinary,
// top-to-bottom synchronous code. Marking a function async means it always
// returns a Promise, and lets you use await inside it. await pauses that
// function (and only that function - the rest of the page keeps working)
// until the Promise on its right settles, then hands back the fulfilled
// value directly, or throws if it was rejected.
async function runAwaitDemo(setStatus) {
  setStatus("Loading...");

  try {
    var result = await wait(1500);
    setStatus("Done! (" + result + ")");
  } catch (error) {
    setStatus("Error: " + error.message);
  } finally {
    console.log("async/await demo settled (fulfilled or rejected)");
  }
}

// --- Demo 4: Promise.all() ---
//
// Promise.all(arrayOfPromises) takes several Promises that are already
// running at the same time and returns one new Promise that fulfills once
// EVERY one of them has fulfilled, with an array of their results in the
// same order. If any one of them rejects, the whole thing rejects
// immediately. Because all three waits below start at (roughly) the same
// moment instead of one after another, the total time is close to the
// longest individual wait (2000ms), not the sum of all three (1000 + 1500 +
// 2000 = 4500ms).
async function runAllDemo(setStatus) {
  setStatus("Loading...");
  var start = Date.now();

  try {
    var results = await Promise.all([wait(1000), wait(1500), wait(2000)]);
    var elapsed = Date.now() - start;
    setStatus("Done! All three finished in about " + elapsed + "ms: " + results.join(", "));
  } catch (error) {
    setStatus("Error: " + error.message);
  }
}

// --- Demo 5: error handling with try/catch ---
async function runErrorDemo(setStatus) {
  setStatus("Loading...");

  try {
    var result = await waitAndFail(1200);
    // This line never runs, because waitAndFail always rejects.
    setStatus("Done! (" + result + ")");
  } catch (error) {
    setStatus("Caught an error: " + error.message);
  }
}

// --- Wiring the demos up to the page ---
//
// Everything below is guarded so it only runs in a browser (where `document`
// exists), not when this file is loaded with require() by test.js in
// plain Node - that lets the test import wait() and waitAndFail() on their
// own, without a browser, and without triggering any real timers tied to
// page elements that don't exist there.
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    var orderLog = document.getElementById("order-log");
    document.getElementById("order-btn").addEventListener("click", function () {
      orderLog.innerHTML = "";
      runOrderDemo(function (line) {
        var item = document.createElement("li");
        item.textContent = line;
        orderLog.appendChild(item);
      });
    });

    var thenStatus = document.getElementById("then-status");
    document.getElementById("then-btn").addEventListener("click", function () {
      runThenDemo(function (text) {
        thenStatus.textContent = text;
      });
    });

    var awaitStatus = document.getElementById("await-status");
    document.getElementById("await-btn").addEventListener("click", function () {
      runAwaitDemo(function (text) {
        awaitStatus.textContent = text;
      });
    });

    var allStatus = document.getElementById("all-status");
    document.getElementById("all-btn").addEventListener("click", function () {
      runAllDemo(function (text) {
        allStatus.textContent = text;
      });
    });

    var errorStatus = document.getElementById("error-status");
    document.getElementById("error-btn").addEventListener("click", function () {
      runErrorDemo(function (text) {
        errorStatus.textContent = text;
      });
    });
  });
}

// Exported so test.js can require() this file and test wait()/waitAndFail()
// directly, without a browser.
if (typeof module !== "undefined") {
  module.exports = { wait: wait, waitAndFail: waitAndFail };
}
