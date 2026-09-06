# 6.9: The Fetch API & Calling a Real API

**Difficulty:** Intermediate+
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- Making an HTTP request from the browser with `fetch(url)`
- Why `fetch()` does not reject on HTTP error statuses like 404 or 500, and how to check
  `response.ok` yourself
- Parsing a JSON response body with `.json()`
- The difference between a GET request and a POST request with `fetch()`
- Showing loading and error states in the UI, and why rendering logic belongs in its own
  testable function

## Prerequisites
Topic 6.8 (Promises and `async`/`await`) - `fetch()` returns a Promise, and this topic
consumes it exactly the way 6.8 taught, with `async`/`await` and `try/catch`.

## Explanation

### `fetch(url)`
`fetch(url)` asks the browser to make an HTTP request to `url` and returns a Promise. Once
the server responds - as soon as the headers arrive, not the full body yet - that Promise
fulfills with a `Response` object describing the result.

### The classic Fetch gotcha
This is the single most important thing to know about `fetch()`: **it does not reject just
because the server responded with an error status code**, like `404 Not Found` or
`500 Internal Server Error`. As far as `fetch()` is concerned, the request "succeeded" the
moment it got any HTTP response at all - it only rejects for something like a lost network
connection, where no response arrives at all.

That means it's entirely up to you to check whether the response actually represents
success. Every `Response` object has an `.ok` property, `true` only for status codes in the
200-299 range. The correct pattern is always to check it and throw your own error if it's
`false`:

```js
const response = await fetch(url);
if (!response.ok) {
  throw new Error("Request failed with status " + response.status);
}
```

Skipping this check is a very common bug: without it, a 404 page would be silently treated
as a success, and your code would try to parse an error page as if it were real data.

### Parsing the response body
A `Response` does not hand you usable data directly - its body has to be read and parsed
first, and that step is asynchronous too, so it also needs `await`:

```js
const data = await response.json();
```

`.json()` reads the full response body and parses it from JSON text into a plain
JavaScript value (an array or object), exactly like `JSON.parse()` from 6.7 - `.json()` is
really just a convenience wrapper around reading the body and doing that parse for you.

### GET vs. POST
Calling `fetch(url)` with just a URL sends a `GET` request (the default). To send a `POST`
request with a JSON body instead, pass a second argument:

```js
fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
```

### Loading and error states
Because a request takes an unknown amount of time and can fail, a real UI needs to show the
user what's happening: a "Loading..." message while the request is in flight, and a clear,
visible error message if it fails - never just silence. This demo's `loadPosts()` shows
both, using `try/catch/finally` (from 6.5 and 6.8) to guarantee the loading message is
hidden again no matter how the request turns out.

## The Demo
This demo calls the free [JSONPlaceholder](https://jsonplaceholder.typicode.com/) test API
and lists post titles. Open `script.js`:

- `renderPosts(posts)`, defined on its own outside `loadPosts()`, only knows how to turn an
  array of post objects into `<li>` elements inside `#post-list`. It has no idea whether
  that array came from a real fetch or was typed in by hand - which is exactly what makes
  it testable: this folder's `test.js` calls `renderPosts([...])` directly with a small
  hardcoded array, without ever making a real network request.
- `loadPosts()` is a thin `async` wrapper: it resets the UI to a loading state, `await`s
  `fetch(...)`, checks `response.ok` and throws if it's false, `await`s `.json()`, and
  passes the first 10 posts to `renderPosts(...)`. Any error - a bad status or a network
  failure - is caught in one `catch` block and shown in `#error-message`; `finally` always
  hides the loading message.
- The button click listener, and everything else that touches `document`, is wrapped in
  `if (typeof document !== "undefined") { ... }` so that `test.js` can `require()` this
  file in plain Node without triggering a real network request or erroring on a missing
  `document`.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to call the
JSONPlaceholder API.

## How This Demo Is Tested
This topic has an automated test in `test.js` that does not require an internet connection
(it uses mock data instead of calling the real API). Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Change `renderPosts` to also show each post's `body` text (already present in the real
API's response) below its title, and confirm the demo still works by reloading `index.html`
in your browser. Then try changing the URL to something that returns a 404, like
`https://jsonplaceholder.typicode.com/posts/999999999`, and confirm the error message
appears instead of a blank or broken page.

## Key Takeaways
- `fetch(url)` returns a Promise that fulfills with a `Response` as soon as headers arrive
- `fetch()` does NOT reject on HTTP error statuses - always check `response.ok` and throw
  if it's false
- `.json()` is also asynchronous and needs to be awaited to get usable data
- A POST request passes `{ method, headers, body: JSON.stringify(data) }` as a second
  argument to `fetch()`
- Keeping rendering logic in its own named function, separate from the `fetch()` call
  itself, makes it possible to test without a real network request
