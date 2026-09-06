# 3.1: Setup and the Grid System

**Difficulty:** Beginner
**Module:** [Module 3: Bootstrap](../README.md)

## What You'll Learn
- What a CSS framework is and why you'd use one instead of writing everything from scratch
- How to add Bootstrap to a page with a CDN link, with no build tools required
- The difference between `container` and `container-fluid`
- How Bootstrap's 12-column grid (`row` and `col`) works
- How to make columns respond to screen size with classes like `col-md-4`

## Prerequisites
Module 1: HTML, Module 2: CSS

## Explanation
So far you have written every style rule yourself: box models, colors, Flexbox, Grid. A
**CSS framework** like Bootstrap is a library of pre-written CSS (and, for some
components, JavaScript) that gives you ready-made building blocks — a grid system,
typography defaults, buttons, cards, navbars, and more — so you don't have to reinvent
them for every project. You still write HTML and add classes; Bootstrap supplies the
styling behind those classes.

The fastest way to try Bootstrap is a **CDN** (Content Delivery Network): a link tag and a
script tag that load Bootstrap's compiled CSS and JS from a public server, instead of you
downloading and hosting the files yourself.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

The stylesheet goes in `<head>`; the script (which powers interactive components like
modals and dropdowns) is usually placed just before the closing `</body>` tag, or in
`<head>` with the `defer` attribute. This module pins version 5.3.3 everywhere so every
demo behaves identically.

Almost every Bootstrap page starts with a `.container`, which centers your content
horizontally and adds side padding that adjusts at each screen size. `.container-fluid`
is the alternative: it always stretches to 100% of the browser width, with no max-width.

Inside a container, Bootstrap's **grid system** divides horizontal space into 12 equal
columns. You create a `.row`, and inside it place one or more `.col-*` elements. A column
class like `col-4` means "take up 4 of the 12 columns." Three `col-4` elements side by
side fill an entire row (4 + 4 + 4 = 12).

The real power comes from **responsive column classes**, which apply only starting at a
given breakpoint: `col-md-4` means "take up 4 columns once the screen is at least `md`
width (768px) or wider." Below that width, if you also gave the element a plain `col-12`
(or just `col`), it falls back to that instead — which is exactly how a 3-column layout on
desktop turns into a stacked, full-width layout on a phone.

## The Demo
Open `index.html`. It walks through, top to bottom:

- A `.container` wrapping the whole page, next to a `.container-fluid` box shown for
  comparison so you can see the width difference.
- A basic 3-column row using `col-md-4` on each column, filling the 12-column grid evenly.
- A responsive 3-column row using `col-12 col-md-4` on each column — the main demo for this
  topic. Resize the browser (or view on a narrow screen) to watch the three boxes stack
  into a single column below the `md` breakpoint, then snap into three side-by-side
  columns above it.
- An uneven two-column row (`col-md-8` next to `col-md-4`) showing that columns don't have
  to be equal, as long as they add up to 12 or less.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap from the CDN — nothing needs to be installed.

## Try It Yourself
Add a fourth box to the responsive 3-column row and change all four columns to
`col-6 col-md-3` (so the page shows a 2x2 grid on mobile and a single row of 4 on desktop).

## Key Takeaways
- A CSS framework provides ready-made, class-based building blocks instead of custom CSS.
- Bootstrap can be added with just a CDN `<link>` and `<script>` tag, no installation needed.
- `.container` centers content with a max-width; `.container-fluid` always spans 100%.
- The grid is 12 columns wide: `.row` holds columns, and their `col-*` numbers should add
  up to 12 or less.
- Prefixing a column size with a breakpoint (`col-md-4`) makes it apply only at that width
  and above, which is how responsive stacking layouts are built.
