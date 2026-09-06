# 6.11: Project: Consume a Public REST API

**Difficulty:** Advanced
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- Combining `fetch`/`async`-`await`, DOM manipulation and events, and `localStorage` into
  one complete, small application
- Handling all four states a real app needs: idle, loading, results, and error
- Distinguishing "the request failed" from "the request succeeded, but found nothing" -
  and giving the user a different message for each
- Building search-box-plus-button-plus-Enter-key UX with a single `<form>`
- Structuring an app's render logic so it stays testable, without changing what the user sees

## Prerequisites
Topics 6.8 (Promises and `async`/`await`), 6.9 (the Fetch API), and 6.10 (browser storage).
This project is the capstone of Module 6: it is the most complete and polished demo in the
whole module, and does not reuse any code from 6.9 - its fetch and rendering logic are
written from scratch here, even though the overall pattern will look familiar.

## Explanation

### The app
This is a country search tool built on the free, key-free
[REST Countries API](https://restcountries.com/): typing a country name and searching
sends a request to `https://restcountries.com/v3.1/name/{name}`, which responds with an
array of matching countries (there can be more than one match - searching "korea" returns
both North and South Korea, for example).

### Four states, not two
A real, well-behaved app has more than just "worked" and "didn't work" - this demo
deliberately handles four distinct states:

- **Idle** - nothing has been searched yet.
- **Loading** - a request is in flight; `#status-message` shows "Loading..." so the user
  knows something is happening.
- **Results** - the request succeeded and matches were found; each is rendered as a card.
- **Error** - either the request truly failed (no connection, a server error), or it
  succeeded but found nothing. These are shown differently on purpose: a real error tells
  the user to check their connection, while "no results" tells them to check their
  spelling instead - conflating the two would be confusing.

### The REST Countries API's "no results" gotcha
Searching for a country name with no match doesn't return an empty array - the API
responds with an HTTP **404** status instead. Exactly like the Fetch gotcha covered in 6.9,
`fetch()` does not treat this as a failure on its own; `response.ok` is `false` for a 404,
same as for a real server error, so this app checks `response.status === 404`
**specifically** and shows a friendly "No countries found" message for that case, before
falling through to the generic error handling for anything else.

### Combining everything
`searchCountries(term)` ties all three earlier topics together in one function:
- It's `async` and uses `await fetch(...)`, exactly as taught in 6.8 and 6.9.
- It reads and writes DOM elements (`#status-message`, `#results`) directly, the same DOM
  APIs used throughout Module 5.
- It calls `localStorage.setItem(...)` to remember the search term (6.10), so it's there
  again, pre-filled, the next time the page loads - even after closing the browser
  entirely, which a plain JS variable could never do.

## The Demo
Open `script.js`:

- `renderCountries(countries)`, defined on its own, only knows how to turn an array of
  country objects into cards inside `#results` - one card per country, showing its flag
  (`country.flags.png`), name, capital, region, and population - or a visible "No results
  found" message if given an empty array. It has no idea whether that array came from a
  real API response or was typed in by hand, which is what makes it testable: this
  folder's `test.js` calls `renderCountries([...])` directly with hardcoded country data,
  without ever making a real network request.
- `searchCountries(term)` is the thin `async` wrapper: it saves the search term to
  `localStorage`, sets the loading state, `await`s `fetch(...)`, branches on a 404 versus
  any other non-`ok` status versus success, and either shows a message or calls
  `renderCountries(...)`.
- On page load, if a search term was saved from a previous visit, it pre-fills
  `#search-input` - try it: search for something, reload the page, and see your last
  search still sitting in the box.
- The form's `submit` event (which fires both on clicking Search and on pressing Enter
  inside the input, since the input is inside a `<form>`) calls `searchCountries` with the
  box's current value.
- All of the DOM- and `localStorage`-touching wiring code is wrapped in
  `if (typeof document !== "undefined") { ... }`, so `test.js` can `require()` this file in
  plain Node without triggering a real network request or erroring on a missing document.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to call the
REST Countries API. Try searching "canada", "korea" (multiple results), and something with
no matches like "atlantis" to see all three outcomes.

## How This Demo Is Tested
This topic has an automated test in `test.js` that does not require an internet connection
(it uses mock data instead of calling the real API). Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a "languages" line to each card, using the `country.languages` object from the real API
response (an object whose values are language names, e.g. `{ eng: "English" }` - use
`Object.values(country.languages).join(", ")` to turn it into a display string), and
confirm the demo still works by reloading `index.html` in your browser and searching for a
few different countries.

## Key Takeaways
- A complete app needs more than success/failure - idle, loading, results, and error are
  all distinct states a user should be able to see clearly
- An API can signal "no results" with an HTTP error status (like a 404) rather than an
  empty array - check for that case specifically, separately from a real failure
- `fetch`/`async`-`await`, DOM manipulation and events, and `localStorage` combine
  naturally: fetching data, showing it on the page, and remembering user input are all
  independent, composable pieces
- Keeping rendering logic in its own named function, separate from the `fetch()` call
  itself, makes even a multi-state app possible to test without a real network request
