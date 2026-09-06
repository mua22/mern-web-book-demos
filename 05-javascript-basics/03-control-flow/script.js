// script.js - 5.3 Control Flow
//
// "Control flow" means the order your code's statements actually run in.
// By default JavaScript runs statements top to bottom, one after another.
// The tools on this page let you change that: run something only under a
// condition (if/else, switch), or run something repeatedly (for, while,
// do...while).

// ---------------------------------------------------------------------
// fizzBuzzValue(n): if / else if / else
// ---------------------------------------------------------------------
// "if" runs a block of code only when its condition is true. "else if"
// checks another condition, only if every earlier condition was false.
// A final plain "else" (no condition) catches everything else. JavaScript
// checks these top to bottom and stops at the first true condition - so
// order matters: checking "n % 3 === 0" alone would never catch the
// FizzBuzz case (divisible by both 3 and 5), which is why that check must
// come first, checking both conditions together.
function fizzBuzzValue(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  } else {
    return String(n); // String(n) converts the number n into text
  }
}

// ---------------------------------------------------------------------
// getDayName(dayNumber): switch
// ---------------------------------------------------------------------
// "switch" compares one value against a list of possible matches ("case"s).
// It is often clearer than a long chain of "else if" statements when you
// are comparing a single value against many exact possibilities, like a
// day number here. Each "case" needs a "break" statement, or JavaScript
// will keep running the cases below it too ("falling through") - almost
// always not what you want. "default" runs when nothing else matched,
// similar to a final "else".
function getDayName(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return "Invalid day";
  }
}

// ---------------------------------------------------------------------
// Loop demonstrations (console-only): for, while, do...while,
// break, continue
// ---------------------------------------------------------------------
function logLoopDemos() {
  // "for" loops are used when you know how many times you want to repeat
  // something. The three parts, separated by semicolons, are: a starting
  // point (let i = 1), a condition checked before each run (i <= 5), and
  // an update that runs after each pass (i++, short for i = i + 1).
  console.log("for loop counting 1 to 5:");
  for (let i = 1; i <= 5; i++) {
    console.log(i);
  }

  // "while" loops are used when you don't necessarily know the number of
  // repetitions in advance - they just keep running as long as their
  // condition stays true. This example halves a number until it drops to
  // 1 or below.
  console.log("while loop halving 20 until it drops to 1 or below:");
  let value = 20;
  while (value > 1) {
    console.log(value);
    value = value / 2;
  }

  // "do...while" is like "while", but it checks its condition AFTER
  // running the block once, so the block always runs at least one time -
  // even if the condition is already false. Here the condition (10 < 5)
  // is false from the very start, but "runs once" still logs.
  console.log("do...while always runs its block at least once:");
  let attempts = 0;
  do {
    attempts++;
    console.log("attempt " + attempts + " (this always logs at least once)");
  } while (attempts < 0); // never true, but the first run already happened

  // "continue" skips the rest of the current pass and jumps straight to
  // the next one. Here it skips logging even numbers.
  console.log("for loop with continue, logging only odd numbers 1 to 10:");
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      continue; // skip the rest of this pass for even numbers
    }
    console.log(i);
  }

  // "break" exits a loop completely and immediately, without finishing the
  // remaining passes. Here it stops as soon as it finds a number divisible
  // by 7, instead of continuing all the way to 100.
  console.log("for loop with break, stopping at the first multiple of 7:");
  for (let i = 1; i <= 100; i++) {
    if (i % 7 === 0) {
      console.log("found " + i + ", stopping here");
      break;
    }
    console.log(i);
  }
}

// ---------------------------------------------------------------------
// Rendering into the page
// ---------------------------------------------------------------------
// Guarded so that requiring this file from plain Node (as test.js does for
// fizzBuzzValue and getDayName) never tries to touch a "document" that
// does not exist outside a browser.
function renderFizzBuzzList() {
  const list = document.getElementById("fizzbuzz-list");
  if (!list) return;
  list.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const item = document.createElement("li");
    item.textContent = i + " -> " + fizzBuzzValue(i);
    list.appendChild(item);
  }
}

function renderDayNameList() {
  const list = document.getElementById("day-name-list");
  if (!list) return;
  list.innerHTML = "";

  for (let day = 1; day <= 7; day++) {
    const item = document.createElement("li");
    item.textContent = "Day " + day + " -> " + getDayName(day);
    list.appendChild(item);
  }
}

if (typeof document !== "undefined") {
  logLoopDemos();
  renderFizzBuzzList();
  renderDayNameList();
}

if (typeof module !== "undefined") {
  module.exports = { fizzBuzzValue, getDayName };
}
