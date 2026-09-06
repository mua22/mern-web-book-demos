# 2.1: Syntax & Selectors

**Difficulty:** Beginner
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- The anatomy of a CSS rule: selector, declaration block, property, and value
- The three ways to attach CSS to a page, and why external CSS is preferred
- How to select elements by tag, class, id, and attribute
- How to group several selectors together with a comma
- The difference between a descendant selector (space) and a child selector (`>`)

## Prerequisites
Module 1: HTML

## Explanation

HTML gives a page structure. CSS (Cascading Style Sheets) gives it appearance:
colors, spacing, fonts, layout. A CSS **rule** always has the same shape:

```
selector {
  property: value;
}
```

The **selector** picks which element(s) the rule applies to. Inside the curly
braces is a **declaration block**, made of one or more **declarations**. Each
declaration is a **property** (what you want to change, like `color`) and a
**value** (what you want to change it to, like `red`), separated by a colon
and ended with a semicolon.

There are three ways to add CSS to an HTML page:

1. **Inline** — a `style` attribute directly on one element, like
   `<p style="color: red;">`. This only affects that one element and is hard
   to maintain, so it is rarely used for real styling.
2. **Internal** — a `<style>` block inside the `<head>` of the HTML document.
   This keeps CSS in the same file as the HTML, which is fine for a single
   quick page but does not scale to a multi-page site.
3. **External** — a separate `.css` file, linked from the HTML with
   `<link rel="stylesheet" href="style.css">`. This is the standard approach:
   one stylesheet can be reused across many pages, and HTML and CSS stay
   cleanly separated. This demo uses an external stylesheet.

Once CSS is attached, **selectors** decide what gets styled:

- An **element selector** (also called a type selector) matches a tag by
  name, like `p` or `h1`. It affects every element of that type.
- A **class selector** starts with a dot, like `.tagline`, and matches any
  element with `class="tagline"`. The same class can be reused on many
  elements, and one element can have several classes at once.
- An **id selector** starts with `#`, like `#site-header`, and should match
  exactly one element, since an `id` is meant to be unique on the page.
- An **attribute selector**, like `input[type="email"]`, matches elements
  based on the presence or exact value of an attribute.

You can also combine selectors:

- **Grouping** several selectors with a comma, like `h1, h2, h3 { ... }`,
  applies the same declarations to all of them without repeating the block.
- A **descendant combinator** — just a space, like `.box p` — matches any
  `<p>` nested anywhere inside `.box`, no matter how many levels deep.
- A **child combinator** — a `>`, like `.box > p` — matches only a `<p>`
  that is a *direct* child of `.box`, one level down.

Finally, CSS comments look like `/* this is a comment */`. They are ignored
by the browser and are useful for explaining *why* a rule exists.

## The Demo

`style.css` styles a small cafe page (`index.html`) using every selector type
above, with a comment above each new kind of selector explaining what it is.
A few things to look for:

- `body`, `header`, `nav` are element selectors.
- `#site-header h1` is an id selector combined with a descendant element
  selector.
- `.tagline`, `.menu-item`, `.card` are class selectors.
- `.menu-item.new` (no space) matches an element that has *both* classes,
  while `.box p` (with a space) is a descendant selector.
- `input[type="email"]` and `a[target="_blank"]` are attribute selectors.
- `h1, h2, h3 { ... }` is a grouped selector.
- `.box p` vs. `.box > p` near the bottom of the file show the descendant
  vs. child difference directly: open the page and notice that only the
  first paragraph inside `.box` gets a green left border, because it is a
  direct child, while the nested one does not.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

## Try It Yourself

In `style.css`, find the `.box > p` rule and change the `>` to a space, so it
reads `.box p` (matching the existing descendant rule right above it, just
with the green border declarations). Reload the page and notice that now
*both* paragraphs inside `.box` get the green left border, including the one
nested inside `.inner`. That is the practical difference between "direct
child only" and "any descendant."

## Key Takeaways
- A CSS rule is a selector plus a declaration block of property-value pairs.
- External stylesheets (linked with `<link>`) are the standard way to attach
  CSS; inline and internal styles exist but do not scale well.
- Element, class, id, and attribute selectors each target elements in a
  different way, and can be combined.
- A comma groups selectors; a space is a descendant combinator; `>` is a
  child combinator that only matches one level down.
- Comments (`/* ... */`) document intent in a stylesheet and are ignored by
  the browser.
