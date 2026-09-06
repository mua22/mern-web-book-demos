# 5.1: Embedding Scripts and the Browser

**Difficulty:** Beginner
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- Where a `<script>` tag can go in an HTML file, and why that used to matter a lot
- What the `defer` and `async` attributes do, and how they differ from each other and from
  writing neither
- How to link an external JavaScript file with `<script src="...">` instead of writing
  JavaScript inline
- How to open the browser's DevTools Console and read `console.log(...)` output

## Prerequisites
Module 1: HTML and Module 2: CSS. No prior JavaScript experience is assumed - this is the
first topic in the JavaScript module.

## Explanation

### What a `<script>` tag does
A `<script>` tag tells the browser "there is JavaScript code here, either written directly
inside this tag or in a separate file pointed to by the `src` attribute." From this topic
onward, every demo in this course uses an external file - `<script src="script.js">` - kept
in the same folder as its `index.html`, rather than writing the code inline between
`<script>` and `</script>`. Keeping JavaScript in its own `.js` file keeps HTML focused on
structure and makes the code easier to read, reuse, and test on its own (as `test.js` in
this repo does for every demo).

### Parsing, and why script placement used to matter
When a browser loads a page, it reads the HTML file from top to bottom and builds the DOM
(Document Object Model) as it goes - the browser's in-memory model of every element on the
page. This process is called **parsing**.

A plain `<script src="script.js"></script>`, with no extra attributes, **blocks** parsing:
the moment the browser's parser reaches that tag, it stops everything, downloads the file
(if it is not already downloaded), runs it top to bottom, and only then continues parsing
the rest of the HTML. Two consequences follow directly from this:

1. If that script tries to find an element that appears **later** in the HTML (for example,
   with `document.getElementById(...)`), it will not find it, because the parser has not
   reached that part of the page yet - `getElementById` will return `null`.
2. A slow-downloading script tag placed early in the page (for example, in `<head>`) delays
   the user from seeing anything at all, since parsing - and so rendering - is paused until
   it finishes.

For years, the standard workaround was to place `<script>` tags at the very end of
`<body>`, just before the closing `</body>` tag. By the time the parser reached that point,
every element above had already been parsed, so blocking there caused no visible delay and
the script could safely find and use any element on the page.

### `defer` and `async`: two better options
Modern HTML gives `<script>` two attributes that solve this without needing to move the
tag to the bottom of the page:

- **`defer`** - the browser downloads the script in the background, in parallel with
  continued HTML parsing, and only **runs** it after the entire document has finished
  being parsed. Multiple deferred scripts also run in the order they appear in the HTML.
  This is the option used in this demo (and every demo from here on): it gives the
  predictability of "the whole DOM already exists" without ever blocking parsing.
- **`async`** - the browser also downloads the script in the background, but runs it the
  **instant** it finishes downloading, whenever that happens to be - possibly before
  parsing has finished, possibly interrupting it. If a page has more than one `async`
  script, there is no guarantee about which one runs first. This makes `async` a poor fit
  for scripts that need the DOM to be ready, but a reasonable fit for independent code
  (such as an analytics snippet) that does not touch the page and does not depend on
  anything else.
- **Neither attribute** - the original, blocking behavior described above.

Because this course's scripts need the DOM to already exist, every demo from now on uses
`<script src="script.js" defer></script>`, placed in `<head>`.

### The DevTools Console
Every modern browser ships with a set of developer tools. The **Console** tab is where
`console.log(...)` messages appear - a way for code to print information that helps whoever
is building the page understand what is happening, without showing anything to a normal
visitor. To open it:

- Press `F12`, or
- Right-click anywhere on the page and choose "Inspect" (or "Inspect Element"), then click
  the "Console" tab.

`console.log(...)` accepts any value - text, numbers, objects - and prints it. You will use
it constantly while learning and debugging JavaScript.

## The Demo
Open `index.html`, then `script.js`.

- `index.html` links `script.js` from the `<head>` with the `defer` attribute, and a code
  comment there explains exactly why that is safe.
- `script.js` starts with two `console.log(...)` calls, visible only in DevTools.
- It then calls `document.getElementById("message")` to find the `<p id="message">`
  element defined further down in `index.html`, and sets its `.textContent` to a new
  string - a real, visible change to the page, not just a console message.
- Extensive comments in `script.js` walk through why `defer` is what makes that
  `getElementById` call reliable, and summarize how a plain `<script>` and an `async`
  script would behave differently in the same spot.

## How to Run
Open `index.html` directly in your browser (open DevTools Console too, where noted). No
installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a second element to `index.html`, such as `<p id="footer">Not yet updated.</p>`, and in
`script.js` select it with `document.getElementById("footer")` and change its
`.textContent` too - proving to yourself that a deferred script can safely reach any
element in the page, no matter where in the HTML it appears.

## Key Takeaways
- Parsing is the browser reading an HTML file top to bottom and building the DOM as it goes
- A plain `<script>` blocks parsing, which is why scripts used to be placed at the end of
  `<body>` - by then, everything above had already been parsed
- `defer` downloads in the background and only runs after parsing finishes, in document
  order - the default choice when a script needs the DOM
- `async` downloads in the background but runs as soon as it is ready, with no ordering
  guarantee - suited to independent scripts that do not touch the DOM
- `console.log(...)`, viewed in the browser's DevTools Console, is the standard way to see
  what your code is doing while you build and debug it
