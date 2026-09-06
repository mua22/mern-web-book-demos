# 1.6: Lists

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- How to build an unordered list with `<ul>` and `<li>`
- How to build an ordered (numbered) list with `<ol>` and `<li>`
- How to nest one list inside another to show grouping
- How to build a description list with `<dl>`, `<dt>`, and `<dd>`
- When to reach for each list type

## Prerequisites
Topic 1.3: Text Formatting

## Explanation
Lists are one of the most common ways to structure content on a web page: navigation
menus, steps, ingredient lists, glossaries, and more are all lists under the hood.

An **unordered list** (`<ul>`) is for a group of items where the order doesn't matter,
like a set of groceries. Every item inside a `<ul>` goes in its own `<li>` (list item)
tag. The browser shows each `<li>` with a bullet point by default.

An **ordered list** (`<ol>`) works the same way, except the browser numbers the items
(1, 2, 3, ...) instead of using bullets. Use it whenever the sequence matters, such as
steps in a recipe or instructions that must be followed in order.

Lists can be **nested**: you can put a whole `<ul>` or `<ol>` inside a single `<li>` of
another list. This lets you group related items under a heading item, like sorting a
grocery list into "Dairy", "Produce", and "Bakery" sub-lists. Nesting just means one
list element is placed inside a list-item element of another list.

A **description list** (`<dl>`) is different from the other two: instead of a flat set
of items, it pairs a term with its definition. Each term is wrapped in a `<dt>`
(description term), immediately followed by one or more `<dd>` (description detail)
tags that explain it. This is the natural choice for a glossary, an FAQ, or any
name/value pairing, like a list of metadata (Author: ..., Published: ...).

## The Demo
Open `index.html` in a browser. The page has four sections:

- An unordered list of groceries, showing the basic `<ul>` / `<li>` pattern.
- An ordered list of recipe steps, showing `<ol>` / `<li>` and automatic numbering.
- A nested list, where the groceries are grouped by category. Notice how each category's
  `<li>` contains a full `<ul>` of its own inside it.
- A description list acting as a small glossary of HTML terms, using `<dl>`, `<dt>`, and
  `<dd>`.

A small `style.css` file is included to add spacing and make the description list's
terms bold, purely so the page is easier to read; none of it is required to understand
the HTML.

## How to Run
Open `index.html` directly in your browser (double-click it, or right-click → Open With).
No installation or server needed.

## Try It Yourself
Add a second nested list under one of the existing grocery categories (for example, split
"Dairy" further into "Refrigerated" and "Long-life"), so you end up with a list nested
three levels deep.

## Key Takeaways
- Use `<ul>` for unordered groups of items, `<ol>` for a numbered sequence.
- Every list item goes inside `<li>`, regardless of list type.
- Nest lists by placing a full `<ul>` or `<ol>` inside an `<li>`.
- Use `<dl>`/`<dt>`/`<dd>` for term/definition pairs, not bullet points.
