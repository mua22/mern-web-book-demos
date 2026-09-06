# 6.6: Regular Expressions

**Difficulty:** Intermediate+
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- Regex literal syntax: `/pattern/flags`
- The core building blocks: character classes (`\d`, `\w`, `\s`), quantifiers (`*`, `+`,
  `?`, `{n,m}`), and anchors (`^`, `$`)
- How to test a string against a pattern with `.test()`
- How to pull matches out of a string with `.match()`
- How to find-and-replace with `.replace()` using a regex instead of a fixed string

## Prerequisites
Module 5: JavaScript Basics (especially strings and functions)

## Explanation

A **regular expression** (regex, for short) is a pattern that describes text. Instead of
writing code that manually checks each character of a string, you describe the *shape* the
text should have, and JavaScript's regex engine checks whether a given string matches that
shape. Regex looks intimidating at first because a lot of meaning is packed into a few
symbols — this section builds a real pattern piece by piece so nothing appears without an
explanation.

### Regex literal syntax

A regex in JavaScript is usually written as a **literal**: text between two slashes, with
optional **flags** after the closing slash.

```js
/hello/i
```

This matches the text `hello` — and because of the `i` flag ("ignore case"), it also
matches `Hello`, `HELLO`, and so on. The `g` flag ("global") means "find every match in the
string," instead of stopping at the first one — you'll see why that matters below.

### Character classes

A character class matches one character from a set, without you having to list every
possible letter or digit.

| Pattern | Matches |
|---|---|
| `\d` | any digit, `0`-`9` |
| `\w` | any "word" character: letters, digits, or underscore |
| `\s` | any whitespace character (space, tab, newline) |
| `[abc]` | any one of the literal characters `a`, `b`, or `c` |
| `[a-z]` | any lowercase letter (a range) |

For example, `/\d/` matches a single digit anywhere in a string.

### Quantifiers

A quantifier says *how many times* the thing right before it can repeat.

| Pattern | Means |
|---|---|
| `*` | zero or more times |
| `+` | one or more times |
| `?` | zero or one time (optional) |
| `{n,m}` | between `n` and `m` times |

So `\d+` means "one or more digits in a row," and `[a-zA-Z]{2,}` means "two or more letters,
with no upper limit."

### Anchors

`^` matches the start of the string and `$` matches the end. Without them, a pattern can
match *anywhere inside* a string, which is usually not what you want when validating an
entire field.

### Building a real pattern: a simple email check

Put these pieces together one at a time to validate a basic email format:

1. Start anchored: `^`
2. One or more characters allowed in the part before the `@` — letters, digits, dots, plus
   signs, or hyphens: `[\w.+-]+`
3. A literal `@`: `@`
4. One or more characters for the domain name: `[\w-]+`
5. A literal dot. Note the backslash — a plain `.` in regex means "any character," so to
   match a literal dot you must escape it: `\.`
6. Two or more letters for the top-level domain (`com`, `edu`, `org`, ...): `[a-zA-Z]{2,}`
7. End anchored: `$`

Put together: `/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/`. This is a simplified check — real email
validation is far more permissive and complicated — but it is good enough to catch obvious
typos like a missing `@` or a missing domain suffix.

### The three methods you'll use most

- **`regex.test(str)`** — returns `true` or `false`: does `str` match the pattern anywhere
  (or fully, if anchored)?
- **`str.match(regex)`** — returns an array of matches (or `null` if there are none). With
  the `g` flag, it returns every match found in the string.
- **`str.replace(regex, replacement)`** — finds text matching the pattern and replaces it.
  The replacement can be a fixed string, or a function that gets called for every match and
  returns what to put in its place.

## The Demo

Open `script.js`. There are two independent examples:

1. **Live email format check.** `EMAIL_PATTERN` is the regex built up above.
   `isValidEmail(email)` calls `EMAIL_PATTERN.test(email)`. An `input` event listener on the
   email field re-runs this check on every keystroke and updates the page with the plain
   text `"Valid format"` or `"Not a valid format"`.
2. **Redacting digits with `.replace()`.** `redactDigits(input)` first uses
   `input.match(/\d/g)` to count how many digits are in the string, then calls
   `input.replace(/\d/g, ...)` with a replacer function. For each digit found, the function
   decides whether it's one of the last 4 digits (in which case it's kept) or an earlier one
   (in which case it becomes `"*"`). Everything that isn't a digit — dashes, spaces — is left
   untouched by the regex and passes through unchanged. `"555-123-4567"` becomes
   `"***-***-4567"`.

## How to Run
Open `index.html` directly in your browser.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Modify `EMAIL_PATTERN` to also reject an email whose domain is a single letter followed by
`.com` (e.g. `a@b.com` should become invalid, but `a@bc.com` should stay valid). Hint: change
the quantifier on `[\w-]+` for the domain part to a `{n,}` form.

## Key Takeaways
- A regex describes the *shape* of text using character classes, quantifiers, and anchors
- `\d`, `\w`, and `\s` cover the most common groups of characters; `*`, `+`, `?`, and
  `{n,m}` control repetition; `^` and `$` pin a match to the start/end of the string
- `.test()` answers yes/no, `.match()` returns the actual matches, `.replace()` finds and
  replaces — often with a function for cases where the replacement isn't a fixed string
- Build a complex pattern piece by piece rather than writing it all at once — it's much
  easier to get right and to debug
