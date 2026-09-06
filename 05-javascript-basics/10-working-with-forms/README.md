# 5.10: Working with Forms

**Difficulty:** Intermediate
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to read the current values out of form fields in JavaScript
- Why and how to call `event.preventDefault()` on a form's `submit` event
- How to write basic custom validation (required fields, a simple pattern check) that runs instead of relying only on native HTML validation
- How to dynamically show and hide error messages based on validation results

## Prerequisites
Topic 5.9: Events & Event Handling

## Explanation
HTML gives forms some validation for free -- attributes like `required` and
`type="email"` will stop a form from submitting and show a built-in browser message if
they fail. That's useful, but it's also limited: the messages look different in every
browser, you can't easily style them, and you can't express a rule like "these two
fields must match." This topic covers doing validation yourself, in JavaScript.

**Reading field values.** Every form control's current value is available through its
`.value` property -- the exact same property from Topics 5.8 and 5.9, now applied to
form fields specifically: `document.getElementById("email").value`.

**Handling submission.** A `<form>` fires a `submit` event when the user clicks its
submit button or presses Enter in one of its fields. Listen for it with
`addEventListener("submit", ...)`, same as any other event. By default, submitting a
form reloads the page (or navigates to whatever URL the form's `action` points to) --
almost never what you want when JavaScript is handling everything. Calling
`event.preventDefault()` as the very first line of the handler stops that default
behavior, so the rest of your code decides what happens next.

**Custom validation.** With the default behavior out of the way, you're free to check
each field however you like: is it empty (`value.trim() === ""`)? does it match a
simple pattern, like containing an `@` and a `.` somewhere for an email address? does
it meet a length requirement? A **regular expression** (a compact pattern-matching
tool, written between slashes like `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) is one common way to
check a pattern; full regular-expression syntax is covered later, but simple ones like
this are readable even before then: it just checks for "something, then @, then
something, then a dot, then something," with no spaces allowed.

This demo also sets `novalidate` on the `<form>` tag, which turns off the browser's own
built-in validation entirely so it doesn't interfere with (or duplicate) the custom
messages this code shows. The `type="email"` attribute is left in place anyway, since
it still improves the on-screen keyboard on mobile devices even with native validation
disabled.

**Showing and hiding errors dynamically.** Rather than using `alert()` (which blocks
the whole page and looks the same for every kind of error), this demo keeps one empty
`<p class="error">` under each field in the HTML, and toggles a `visible` CSS class on
it with `.classList.add`/`.remove` -- the same class-manipulation tool from Topic 5.8 --
whenever that field's validation passes or fails, along with setting its `.textContent`
to a specific message.

## The Demo
`script.js` attaches one `submit` listener to `#signup-form`. The handler immediately
calls `event.preventDefault()`, then checks each of the three fields in turn: name must
not be empty, email must not be empty and must pass `isValidEmail()`'s pattern check,
and password must be at least 8 characters. `showError()` sets a field's error message
and marks both the error text and the input itself as invalid (for styling);
`clearError()` reverses that when a field is fine.

An `isValid` flag starts `true` and is set to `false` the moment any single field
fails, but every field is still checked regardless -- so a user seeing multiple invalid
fields gets all the relevant messages at once, not just the first one found. If
`isValid` is still `true` after checking every field, a success message is shown and
`form.reset()` clears the form back to empty.

## How to Run
Open `index.html` directly in your browser. No installation or server needed. No
backend is involved -- this validates entirely in the browser and doesn't send data
anywhere.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a fourth field, "Confirm Password," with its own error message paragraph. In the
submit handler, add a check that it matches the "Password" field exactly, showing an
error like "Passwords do not match" if it doesn't.

## Key Takeaways
- `.value` reads a form field's current content, the same property used for any input element
- `event.preventDefault()` on a form's `submit` event stops the page from reloading, so your own JavaScript can take over
- Custom validation can check anything native HTML validation can't, like matching a specific pattern or comparing two fields
- `novalidate` on the `<form>` tag turns off native validation so it doesn't conflict with your own messages
- Toggling a CSS class (rather than using `alert()`) lets you show and hide error messages per-field, styled however you like
