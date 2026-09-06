# 5.3: Control Flow

**Difficulty:** Beginner
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- Branching with `if`, `else if`, and `else`
- Choosing between several exact values with `switch`
- Repeating code with `for`, `while`, and `do...while` loops
- Exiting or skipping part of a loop early with `break` and `continue`

## Prerequisites
Topic 5.2: Variables, Data Types and Operators

## Explanation

### `if`, `else if`, `else`
**Control flow** means the order your code's statements actually run in. Left alone,
JavaScript just runs statements top to bottom - control flow tools let you change that.

```js
if (condition) {
  // runs only if condition is true
} else if (anotherCondition) {
  // runs only if condition was false AND anotherCondition is true
} else {
  // runs if none of the above conditions were true
}
```

JavaScript checks these top to bottom and runs the block belonging to the **first** true
condition, then skips the rest entirely - even if a later condition would also have been
true. Order matters: this is exactly why, in this topic's FizzBuzz demo, the check for
"divisible by both 3 and 5" has to come before the separate checks for "divisible by 3" and
"divisible by 5" alone - otherwise the combined case would never be reached.

### `switch`
`switch` compares one value against a list of exact possibilities, which is often clearer
than a long `if`/`else if` chain when you are matching a single value against many specific
options:

```js
switch (dayNumber) {
  case 1:
    return "Sunday";
  case 2:
    return "Monday";
  default:
    return "Invalid day";
}
```

Each `case` needs its own `break` (or, as in this demo's functions, a `return`, which exits
the function immediately and has the same effect) - otherwise JavaScript keeps running the
cases below it too, a behavior called "falling through" that is almost never what you want.
`default` runs when nothing else matched, similar to a final `else`.

### `for` loops
Use a `for` loop when you know roughly how many times you want to repeat something:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

The three parts inside the parentheses, separated by semicolons, are: a starting point
(`let i = 1`), a condition checked before every pass (`i <= 5`), and an update that runs
after every pass (`i++`, shorthand for `i = i + 1`).

### `while` and `do...while` loops
Use a `while` loop when you don't know the exact number of repetitions in advance - it just
keeps running as long as its condition stays true:

```js
while (condition) {
  // repeats for as long as condition is true
}
```

`do...while` is nearly identical, but it checks its condition **after** running the block,
so the block is guaranteed to run **at least once**, even if the condition was already
false to begin with:

```js
do {
  // this always runs at least once
} while (condition);
```

### `break` and `continue`
Both change a loop's normal path early:

- **`break`** exits the loop completely, right away - none of the remaining passes happen.
- **`continue`** skips only the rest of the *current* pass and jumps straight to the next
  one - the loop keeps going.

## The Demo
Open `script.js`.

- `fizzBuzzValue(n)` uses `if`/`else if`/`else` to return `"Fizz"`, `"Buzz"`,
  `"FizzBuzz"`, or the number itself as text, for a given number `n`.
- `getDayName(dayNumber)` uses a `switch` statement to map a number 1-7 to a day name, with
  a `default` case for anything else.
- `logLoopDemos()` runs small, console-only examples of a `for` loop, a `while` loop, a
  `do...while` loop, a `continue` example (skipping even numbers), and a `break` example
  (stopping at the first multiple of 7) - open DevTools Console to see all of these.
- `renderFizzBuzzList()` loops from 1 to 20 with a `for` loop, calls `fizzBuzzValue` for
  each number, and appends the result as an `<li>` into `<ul id="fizzbuzz-list">`.
- `renderDayNameList()` similarly renders all seven `getDayName` results into
  `<ul id="day-name-list">`.

## How to Run
Open `index.html` directly in your browser (open DevTools Console too, where noted). No
installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a `case 8` (or higher) to `getDayName` in `script.js` that returns something playful
like `"Someday"`, then update `renderDayNameList`'s loop to go up to that number and reload
`index.html` to see your new case rendered.

## Key Takeaways
- `if`/`else if`/`else` runs the block belonging to the first true condition, top to bottom
- `switch` compares one value against a list of exact cases; remember `break` (or `return`)
  in each case to avoid falling through
- `for` suits a known number of repetitions; `while` suits an unknown number, checked
  before each pass; `do...while` always runs its block at least once
- `break` exits a loop completely; `continue` skips only the rest of the current pass
