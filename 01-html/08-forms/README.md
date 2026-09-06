# 1.8: Forms

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- How to build a form with `<form>`, `<label>`, and different `<input>` types
- Why every input needs a properly paired `<label>`
- How to use `<select>`, `<textarea>`, and `<button>`
- How to group related fields with `<fieldset>` and `<legend>`
- How to use built-in validation attributes like `required`, `min`/`max`, and `pattern`

## Prerequisites
Topic 1.7: Tables

## Explanation
A form is how a web page collects input from a user, such as a sign-up form or a search
box. Everything belongs inside a `<form>` tag.

Every input needs a **label**: a `<label>` element describing what the field is for. A
label is connected to its input by matching the label's `for` attribute to the input's
`id` attribute, for example `<label for="email">Email</label>` paired with
`<input id="email">`. This matters for two reasons: a screen reader announces the label
when the user focuses the input, and clicking the label text itself focuses (or checks)
the input, which makes small controls like checkboxes much easier to click. A form with
inputs but no proper labels is confusing or unusable for anyone relying on assistive
technology.

The `type` attribute on `<input>` controls what kind of value is collected and what
control the browser draws: `text` for plain text, `email` for an email address (the
browser checks it looks like one), `password` for a masked field, `number` for numeric
input with optional `min`/`max`, `date` for a date picker, `checkbox` for a yes/no toggle,
`radio` for choosing one option out of a group (radios sharing the same `name` become
mutually exclusive), and `file` for uploading a file.

Beyond plain inputs, `<select>` with nested `<option>` tags gives a dropdown list,
`<textarea>` gives a multi-line text box, and `<button>` (usually `type="submit"`)
triggers the form's submission. `<fieldset>` groups related fields together visually and
semantically, with a `<legend>` acting as that group's caption, for example grouping
"Account Details" separately from "Preferences".

Finally, HTML can validate input without any JavaScript. `required` means the field must
be filled in before the form can submit. `min` and `max` restrict a number or date to a
range. `pattern` takes a regular expression the value must match, useful for enforcing a
custom text format like "must contain at least one digit". If a required field is empty
or a pattern doesn't match, the browser blocks submission and shows a built-in message
pointing at the problem field.

## The Demo
Open `index.html` in a browser. It is a sign-up form organized into three `<fieldset>`
groups: Account Details, Personal Info, and Preferences. It uses text, email, password,
number, date, checkbox, radio, and file inputs, plus a `<select>` and a `<textarea>`.
Validation attributes are used throughout: `required` on the name, email, password, age,
date of birth, country, and the terms checkbox; `minlength` on the name and password;
`min`/`max` on age; and a `pattern` on the password requiring at least one digit.

Because there is no backend for this demo, the form's `action` is `"#"` and a short
`<script>` at the bottom listens for the form's `submit` event, calls
`event.preventDefault()` to stop the browser from actually navigating anywhere, and
writes a "Form submitted (demo only)" message into the page instead.

## How to Run
Open `index.html` directly in your browser (double-click it, or right-click → Open With).
Try leaving required fields empty and clicking "Sign Up" to see the browser's built-in
validation messages before the demo message appears.

## Try It Yourself
Add a new field to the "Personal Info" fieldset for a phone number, using
`<input type="tel">`, with its own properly paired `<label>` and a `pattern` that requires
exactly 11 digits.

## Key Takeaways
- Always pair every input with a `<label for="...">` matching its `id`.
- Choose the `input` type that matches the data you're collecting; the browser adapts
  its UI and built-in validation accordingly.
- `<fieldset>`/`<legend>` groups related fields for both sighted users and screen readers.
- `required`, `min`/`max`, and `pattern` provide free, no-JavaScript validation.
- `event.preventDefault()` in a submit handler stops the browser's default page
  navigation, which is essential for a form with no real backend yet.
