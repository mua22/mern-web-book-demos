# 3.3: Core Components

**Difficulty:** Beginner+
**Module:** [Module 3: Bootstrap](../README.md)

## What You'll Learn
- How to build a responsive navbar with `navbar`, `navbar-brand`, and `navbar-nav`
- How to style buttons with `btn` plus a color modifier class
- How to show status messages with `alert`
- How to group content into `card` components
- How to open an interactive modal dialog using Bootstrap's JavaScript bundle

## Prerequisites
Module 1: HTML, Module 2: CSS, Topics 3.1-3.2

## Explanation
Bootstrap's real value shows up in its **components**: pre-styled, pre-structured pieces
of UI that you assemble with specific class names on specific HTML structures.

A **navbar** starts with the `navbar` class on a `<nav>` element, plus a color scheme like
`navbar-dark bg-dark` (dark background, light text). Inside it, `navbar-brand` marks the
site name or logo, and a `<ul class="navbar-nav">` holds the links, each wrapped in
`nav-item` / `nav-link`. `navbar-expand-md` means the links display in a horizontal row
starting at the `md` breakpoint; below that, they collapse behind a hamburger button (more
on this collapsing behavior in Topic 3.4).

A **button** just needs the `btn` class plus one color modifier, such as `btn-primary` or
`btn-outline-danger` (an outlined version using that color).

An **alert** is a colored, padded box for a status message: `alert alert-success`,
`alert alert-warning`, `alert alert-danger`, and so on, each using the matching theme
color.

A **card** is a bordered container for grouping content and actions. The outer `card`
class holds a `card-body`, which typically contains a `card-title`, some `card-text`, and
maybe a button or link.

The **modal** is the first component on this page that needs actual JavaScript to work,
not just CSS classes — opening and closing it involves adding and removing classes,
managing focus, and handling a backdrop, which Bootstrap's JS bundle does for you. You
connect a trigger button to a modal using two data attributes:

```html
<button data-bs-toggle="modal" data-bs-target="#demoModal">Open Modal</button>
```

`data-bs-target` must match the `id` of the modal element you want to open. Because this
depends on JavaScript, the page must also load the Bootstrap JS bundle
(`bootstrap.bundle.min.js`), placed right before the closing `</body>` tag so it runs after
the page's HTML has loaded.

## The Demo
Open `index.html`. From top to bottom: a responsive navbar (try narrowing the browser to
see it collapse into a hamburger icon, which needs the JS bundle to open), a row of
buttons in different styles, three alerts, a row of three cards, and a button that opens a
modal dialog using `data-bs-toggle` / `data-bs-target`.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap's CSS and JS bundle from the CDN — nothing needs to be installed.

## Try It Yourself
Add a fourth card to the row with its own title and text, and add a second button beneath
the alerts that opens a new modal of your own (give it a different `id` and point a new
button's `data-bs-target` at it).

## Key Takeaways
- Components are built from specific class names on specific HTML structures — check the
  exact structure Bootstrap expects rather than guessing.
- `btn` + a color modifier styles any button; `alert` + a color modifier styles a message
  box.
- A card's content usually lives inside a nested `card-body`.
- Interactive components like modals need Bootstrap's JavaScript bundle, connected through
  `data-bs-toggle` and `data-bs-target` attributes, not custom JavaScript.
- Load `bootstrap.bundle.min.js` near the end of `<body>` so the page content is ready
  before the script runs.
