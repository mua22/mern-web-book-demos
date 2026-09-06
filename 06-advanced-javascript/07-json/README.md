# 6.7: JSON

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- What JSON is, and why it's the standard format for exchanging data between a browser and
  a server
- How to convert a JavaScript value into a JSON string with `JSON.stringify()`, including
  the pretty-print form using an indent argument
- How to convert a JSON string back into a JavaScript value with `JSON.parse()`
- How to handle malformed JSON safely with `try/catch`

## Prerequisites
Module 5: JavaScript Basics (objects and arrays especially)

## Explanation

**JSON** stands for JavaScript Object Notation. It is a plain-text format for representing
structured data — objects, arrays, strings, numbers, booleans, and `null`. A small JSON
document looks like this:

```json
{
  "name": "Aliza Khan",
  "semester": 5,
  "enrolled": true
}
```

That looks almost exactly like a JavaScript object literal, and that's on purpose — JSON's
syntax was designed to be a subset of JavaScript's. But JSON is *stricter* than a JS object
literal: property names must always be in double quotes, strings must use double quotes
(not single), and JSON has no way to represent a function, a `Date` object, `undefined`, or
`NaN` — only the handful of data types listed above.

### Why JSON matters for the browser and the server

A web page and a server are separate programs, usually written in different languages, that
need to send data back and forth — for example, a browser submitting a new student record,
or asking a server for a list of courses. Neither side can just hand the other a live
JavaScript object; they need to agree on a shared, language-independent format for the data
*as text*. JSON became that standard, because it's simple to read, simple to generate, and
every mainstream programming language has a library for reading and writing it. When you
get to Module 6.9 (the Fetch API) and later modules working with a real backend, this is
exactly the format your requests and responses will use.

### Converting an object to JSON: `JSON.stringify()`

```js
const student = { name: "Aliza Khan", semester: 5, enrolled: true };
JSON.stringify(student);
// '{"name":"Aliza Khan","semester":5,"enrolled":true}'
```

The result is a single-line string with no spaces, which is efficient to send over a
network but hard for a human to read. `JSON.stringify()` accepts a third argument — the
number of spaces to indent by — that pretty-prints the output instead:

```js
JSON.stringify(student, null, 2);
// '{\n  "name": "Aliza Khan",\n  "semester": 5,\n  "enrolled": true\n}'
```

(The second argument, here `null`, is a separate feature for filtering which properties get
included — not something we need for this demo.)

### Converting JSON back to an object: `JSON.parse()`

```js
const jsonString = '{"name":"Aliza Khan","semester":5,"enrolled":true}';
const parsed = JSON.parse(jsonString);
parsed.name; // "Aliza Khan"
```

`JSON.parse()` is the exact reverse of `JSON.stringify()`: text in, a real JavaScript value
out. Doing `stringify` then `parse` and getting back an equivalent object is called a
**round trip**, and it's a useful way to sanity-check that no data was lost in the process.

### Handling malformed JSON

`JSON.parse()` is strict: if the text it's given isn't valid JSON — a missing brace, a
trailing comma, an unquoted key — it throws a `SyntaxError` instead of silently returning
something wrong. Any time you parse JSON that came from somewhere you don't fully control
(a network response, text a user pasted in, a file read from disk), wrap the call in
`try/catch` (covered in 6.5 Error Handling) so a bad response doesn't crash your program:

```js
try {
  const data = JSON.parse(someText);
  // use data
} catch (error) {
  console.error("That wasn't valid JSON:", error.message);
}
```

## The Demo

Open `script.js`. There are two parts:

1. **The round trip.** `toPrettyJSON(value)` calls `JSON.stringify(value, null, 2)`. The
   form's submit handler builds a plain `student` object from the input fields, converts it
   with `toPrettyJSON`, then immediately calls `JSON.parse()` on that string and displays
   all three stages on the page: the original object, the pretty-printed JSON string, and
   the object parsed back out of it — so you can see that the same data survived the whole
   trip.
2. **Malformed JSON.** The page has a deliberately broken JSON string (missing its closing
   brace) sitting in the page as plain text. It's parsed inside a `try/catch`, and the
   caught error's `.message` is displayed instead of letting the exception crash the script.
   `safeParseJSON(text)` in `script.js` demonstrates the same idea as a small reusable
   function: it returns the parsed value on success, or `null` if the text couldn't be
   parsed.

## How to Run
Open `index.html` directly in your browser.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a new field to the form (for example, a "major" text input), include it in the
`student` object built in the submit handler, and confirm it shows up correctly in all
three output stages after clicking Convert.

## Key Takeaways
- JSON is a plain-text, language-independent format for structured data — it's how a
  browser and a server exchange information
- `JSON.stringify(value, null, indent)` converts a JavaScript value to a JSON string; the
  indent argument pretty-prints it
- `JSON.parse(text)` converts a JSON string back into a JavaScript value
- `JSON.parse()` throws on invalid JSON — always wrap it in `try/catch` when the text isn't
  guaranteed to be well-formed
