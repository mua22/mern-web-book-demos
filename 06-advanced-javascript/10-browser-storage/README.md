# 6.10: Browser Storage

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- Why a normal JavaScript variable disappears on reload, and what survives it instead
- The differences between `localStorage`, `sessionStorage`, and cookies
- Reading and writing values with `localStorage.setItem`/`.getItem`/`.removeItem`
- Storing structured data (like an array) in `localStorage` using `JSON.stringify`/
  `JSON.parse`
- Building a small list that saves itself on every change and reloads itself on page load

## Prerequisites
Topic 6.7 (JSON) - `localStorage` can only store strings, so storing anything more
structured than a single piece of text always goes through `JSON.stringify`/`JSON.parse`
first.

## Explanation

### Storage disappears... unless you use the right kind
A normal JavaScript variable (`let notes = []`) lives only in the browser's memory for as
long as the page is open. Reload the page, and it's gone - JavaScript starts over from
scratch. The browser gives you a few different ways to keep data around longer:

| | Persists across... | Typical size limit | Sent with every request? |
|---|---|---|---|
| A normal JS variable | nothing (gone on reload) | limited only by memory | no |
| `sessionStorage` | reloads, but not closing the tab | about 5-10MB | no |
| `localStorage` | reloads, closing the tab, even restarting the browser | about 5-10MB | no |
| Cookies | reloads, closing the tab, and can expire on a schedule | about 4KB | yes, automatically, on every request to that domain |

Cookies were designed for the server to read (they're attached to every HTTP request
automatically), which also makes them expensive for anything but small values.
`localStorage` and `sessionStorage` are purely client-side - the server never sees them
unless your JavaScript explicitly sends them - and hold far more data. This topic focuses
on `localStorage`, since "survive a reload" is exactly what this demo needs.

### The `localStorage` API
```js
localStorage.setItem("username", "ada");   // save a value under a key
localStorage.getItem("username");          // "ada" (or null if never set)
localStorage.removeItem("username");       // delete that key
```

Every key and value is always a **string**. `getItem` on a key that was never set returns
`null`, not an error - always check for that before assuming a value exists.

### Storing structured data
Because `localStorage` only holds strings, saving something like an array of notes means
converting it to a string first, and parsing it back afterward - exactly the
`JSON.stringify`/`JSON.parse` pair from 6.7:

```js
localStorage.setItem("notes", JSON.stringify(["Buy milk", "Walk the dog"]));

var raw = localStorage.getItem("notes");
var notes = raw ? JSON.parse(raw) : [];
```

Trying to store an array or object directly (`localStorage.setItem("notes", notes)`
without `JSON.stringify`) does not throw an error - it silently converts the array to the
useless string `"Buy milk,Walk the dog"` using `.toString()`, which cannot be parsed back
into a real array. Always stringify structured data explicitly.

### Storage survives a reload - a variable doesn't
This is the entire point of the demo below: reload `index.html` after adding a note, and
the note is still there, because it was read back out of `localStorage` when the page
loaded again - not because any JavaScript variable "remembered" it. A plain in-memory
array would have reset to empty on that same reload.

## The Demo
`script.js` builds a small notes list:

- `loadNotes()` reads the `"advanced-js-notes"` key from `localStorage`, parses it with
  `JSON.parse`, and returns an empty array if nothing has been saved yet (or if the stored
  value is somehow corrupted).
- `saveNotes(notes)` writes the given array back with `JSON.stringify`.
- `renderNotes(notes)`, kept separate from the storage logic, only knows how to turn an
  array of note strings into `<li>` elements (each with a Remove button) - this is what
  `test.js` calls directly with hardcoded arrays to test the rendering logic on its own.
- `addNote(notes, text)` and `removeNote(notes, index)` each update the in-memory array,
  call `saveNotes(...)` to persist the change immediately, and return the new array.

On page load, `loadNotes()` runs immediately and the result is passed straight to
`renderNotes(...)`, which is what makes existing notes reappear after a reload. The form's
`submit` event calls `addNote`, and each note's Remove button (handled with one click
listener on the list, checking which button was actually clicked) calls `removeNote` -
both immediately re-render and re-save.

## How to Run
Open `index.html` directly in your browser. Add a note, then reload the page - it will
still be there, because it was saved to `localStorage`, not just held in a variable.

## How This Demo Is Tested
This topic has an automated test in `test.js` that does not require an internet connection
(it uses mock data instead of calling the real API). Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a "Clear All Notes" button that calls `localStorage.removeItem("advanced-js-notes")`
and re-renders an empty list, and confirm that after clicking it and reloading the page,
the notes really are gone for good.

## Key Takeaways
- A normal JS variable is gone on reload; `localStorage` and `sessionStorage` survive it,
  and cookies are sent with every request to the server
- `localStorage.setItem`/`.getItem`/`.removeItem` read and write string values by key
- Structured data (arrays, objects) must be converted with `JSON.stringify` before saving,
  and parsed back with `JSON.parse` after loading
- Loading saved data as soon as the page starts, and saving on every change, is what makes
  a page's state survive a reload
