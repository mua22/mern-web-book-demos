# 5.7: Strings & Template Literals

**Difficulty:** Beginner+
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- Common built-in string methods: `.length`, `.slice`/`.substring`, `.toUpperCase`/`.toLowerCase`, `.includes`, `.split`, `.trim`, `.replace`
- How to write a template literal with `${}` interpolation
- How to write a multi-line string with a template literal
- Why template literals are usually clearer than old-style `+` concatenation

## Prerequisites
Topic 5.6: Objects

## Explanation
You've been using strings since Topic 5.2, but strings come with a large set of
built-in methods for reading and transforming text. A few of the most common:

- **`.length`** is a property (not a method -- no parentheses) giving the number of
  characters: `"hello".length` is `5`.
- **`.slice(start, end)`** returns the part of a string between two positions, not
  including `end`. `"hello".slice(0, 3)` is `"hel"`. `.substring()` works very
  similarly for positive indexes.
- **`.toUpperCase()`** / **`.toLowerCase()`** return a new string with the case
  changed. They don't modify the original -- strings in JavaScript are immutable,
  meaning a string method never changes the string it's called on; it always
  returns a brand new one.
- **`.includes(searchText)`** returns `true` or `false` depending on whether the
  search text appears anywhere in the string.
- **`.split(separator)`** breaks a string into an array of pieces wherever the
  separator occurs: `"a,b,c".split(",")` is `["a", "b", "c"]`.
- **`.trim()`** returns a copy of the string with whitespace removed from both ends.
- **`.replace(searchValue, newValue)`** returns a copy with the first match of
  `searchValue` swapped for `newValue`. Passing a regular expression with the `g`
  flag, like `/ /g`, replaces every match instead of just the first.

All of these methods return a **new** string rather than changing the original, so
you'll usually store the result in a new variable (or the same one, reassigned).

### Template Literals

Before template literals, building a string out of variables meant using `+`:

```js
const message = "Hello, " + name + "! You are " + age + " years old.";
```

A **template literal** uses backticks (`` ` ``) instead of quotes, and lets you
insert a variable or expression directly inside `${}`:

```js
const message = `Hello, ${name}! You are ${age} years old.`;
```

This reads more like the final sentence and avoids juggling `+` signs and spacing.
Template literals can also contain actual line breaks, producing a multi-line string
without any special escape character:

```js
const note = `Line one.
Line two.`;
```

Writing the same thing with regular quotes would require an explicit `\n` for every
line break.

## The Demo
`script.js` listens for both a button click and the `input` event (which fires every
time the text box's value changes), calling the same `analyze()` function either way.

Inside `analyze()`, the current input value is read, trimmed, and run through each of
the string methods listed above. The results are assembled into one block of HTML
using a single multi-line template literal with `${}` interpolation for every computed
value, then assigned to `output.innerHTML` in one step -- notice how much harder this
would be to read as a chain of `+` concatenations.

A separate multi-line template literal (`welcomeNote`) is logged to the console once on
page load, to show a multi-line string on its own, independent of the interactive part
of the demo.

## How to Run
Open `index.html` directly in your browser. No installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add one more row to the output using `.substring()` to show just the last five
characters of the trimmed text (hint: use `trimmed.length - 5` as the start position).

## Key Takeaways
- String methods like `.slice`, `.split`, and `.replace` always return a new string, leaving the original unchanged
- `.trim()`, `.includes()`, and `.length` are common tools for cleaning up and checking user input
- Template literals use backticks and `${}` to interpolate variables directly into a string
- Template literals support real multi-line strings without escape characters
- Prefer template literals over `+` concatenation once more than one or two values are involved
