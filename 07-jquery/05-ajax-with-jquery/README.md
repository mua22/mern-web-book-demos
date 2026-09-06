# 7.5: AJAX with jQuery

**Difficulty:** Intermediate+
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- What AJAX is and why it lets a page load data without reloading
- Making a request with `$.ajax()` and its shortcut, `$.get()`
- Handling both the success case and the failure case of a network request
- Working with a real JSON response from a public API
- Why keeping rendering logic in its own function makes it possible to test

## Prerequisites
Topic 7.4: Effects and Animations. This is the biggest jump in difficulty in this module —
it's the first topic where your code has to wait for something (a network response) and
handle it succeeding or failing, instead of everything happening immediately, in order, on
the next line.

## Explanation

### What is AJAX?
AJAX stands for **A**synchronous **J**avaScript **A**nd **X**ML (in practice today, almost
everyone sends JSON instead of XML, but the name stuck). It means asking the browser to
fetch data from a server, or send data to one, in the background — without reloading the
whole page. "Asynchronous" is the key word: your code starts the request and then keeps
running immediately, without freezing to wait; the response, when it eventually arrives
(successfully or not), is handled by a separate function you provide, run later.

This is different from everything earlier in this module. In 7.1 through 7.4, every
line of your code finished before the next one started. Here, `$.get(...)` returns
immediately, but the code that reacts to the actual result runs at some unpredictable
moment afterward — maybe 50 milliseconds later, maybe 3 seconds later, maybe never, if the
request fails.

### Making a request
`$.ajax()` is jQuery's general-purpose method for making an AJAX request, and it's highly
configurable — you can set the URL, the HTTP method, headers, data to send, and more.
`$.get(url)` is a shortcut for the common case of a simple `GET` request:

```js
$.get('https://jsonplaceholder.typicode.com/users')
  .done(function (users) { /* success */ })
  .fail(function () { /* failure */ })
  .always(function () { /* either way */ });
```

The equivalent written with `$.ajax()` directly looks like this instead:

```js
$.ajax({
  url: 'https://jsonplaceholder.typicode.com/users',
  method: 'GET',
  success: function (users) { /* success */ },
  error: function () { /* failure */ }
});
```

Both return a jQuery object (a "promise") with `.done()`, `.fail()`, and `.always()`
methods, which let you register functions to run once the request finishes, depending on
the outcome — instead of a single callback that has to check for errors itself.

### Handling success and failure
A network request can fail for reasons that have nothing to do with your code — no internet
connection, a slow or down server, and so on. Because of this, every AJAX call in real code
needs both:

- A **success** handler (`.done(...)`, or `success` in `$.ajax()`), which receives the
  response data — already parsed from JSON text into a normal JavaScript array of objects,
  ready to use directly.
- A **failure** handler (`.fail(...)`, or `error` in `$.ajax()`), which runs instead, if
  anything goes wrong. This demo shows a plain error message on the page when this happens.

`.always(...)` runs in both cases, which is a convenient place to hide a loading indicator
regardless of whether the request succeeded — exactly how this demo uses it.

### Arrays and `.forEach()` (if you haven't seen them yet)
An **array** is a JavaScript value that holds an ordered list of items — here, a list of
user objects returned by the API, each with a `name` and `email` (among other fields we
don't use). Arrays have a built-in `.forEach(function (item) { ... })` method: it runs the
function you give it once for every item in the array, in order, automatically — so you
never have to write your own counter-based loop to go through a list.

### Why `renderUsers` is a separate function
`script.js` deliberately defines `renderUsers(users)` on its own, outside the AJAX call
entirely, instead of building the list directly inside the `.done(...)` success handler.
`renderUsers` only knows how to turn an array of user objects into list items on the page —
it has no idea, and doesn't care, whether that array came from a real network response or
was typed in by hand. This separation is what makes this topic testable at all: this
folder's `test.js` calls `renderUsers([...some made-up users...])` directly and checks the
result, without ever making a real network request (which would make the test slow, flaky,
and dependent on being online).

## The Demo
Open `script.js`:

- `renderUsers(users)`, defined at the top of the file, loops over the given array with
  `.forEach(...)` and builds one `<li>` per user containing their name and email, then sets
  `#user-list`'s content with `.html(...)`.
- `loadUsers()`, defined inside `$(document).ready(...)`, is a thin wrapper: it resets the
  page to a clean loading state, shows the `#loading-message`, and calls `$.get(...)`.
  On success it calls `renderUsers(users)`; on failure it shows `#error-message`; either way,
  `.always(...)` hides the loading message again.
- `$('#load-users-btn').on('click', loadUsers);` wires the button to trigger all of this.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
jQuery from the CDN (and, for 7.5, to call the JSONPlaceholder API).

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with:
```
node test.js
```
from inside this folder (or run every topic's tests at once from the repo root with
`npm test`).

The test never contacts the real API: it calls `renderUsers(...)` directly with a small
hardcoded array, and separately replaces `$.get` with a fake version it controls (using a
jQuery Deferred) so it can also verify the loading and error states without any real
network access.

## Try It Yourself
Change `renderUsers` to also display each user's `website` property (already present in the
real API's response, alongside `name` and `email`) as a link, and confirm the demo still
works by reloading `index.html` in your browser.

## Key Takeaways
- AJAX lets a page fetch or send data in the background, without a full page reload
- `$.get(url)` is a shortcut for a simple `$.ajax()` `GET` request
- `.done()` / `.fail()` / `.always()` handle a request's success, failure, and completion
  separately — always plan for the failure case, not just the success case
- A JSON API response arrives already parsed into plain JavaScript arrays and objects
- Keeping rendering logic in its own named function, separate from the AJAX call itself,
  makes it possible to test without a real network request
