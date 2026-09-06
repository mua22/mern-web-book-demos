# 2.9: CSS Variables and Modern Features

**Difficulty:** Intermediate
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- How to define custom properties (CSS variables) on `:root` and read them with `var()`
- How to build a light/dark theme toggle using custom properties and one class on `<body>`
- How `clamp()` produces fluid typography without extra media queries
- How `aspect-ratio` keeps an element's proportions correct at any width
- Why changing a handful of variables can restyle an entire page

## Prerequisites
Topic 2.8: Transitions and Animations

## Explanation

A **custom property**, more commonly called a **CSS variable**, is a value you name once
and reuse anywhere in your stylesheet. You define one with two dashes at the start of the
name, typically on the `:root` selector (which targets the `<html>` element and makes the
variable available to the entire document):

```css
:root {
  --color-accent: #2980b9;
}
```

You read it back anywhere with `var()`:

```css
.button {
  background-color: var(--color-accent);
}
```

The payoff is that if `--color-accent` is used in twenty places across a stylesheet,
changing its value in one spot updates all twenty. This is exactly the mechanism behind a
**light/dark theme toggle**. Instead of writing two entirely separate stylesheets, you
define one set of color variables for light mode on `:root`, then define an overriding set
of the *same* variable names, scoped to a class such as `.dark-theme`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #222222;
}

body.dark-theme {
  --color-bg: #1c1c1c;
  --color-text: #f0f0f0;
}
```

Every rule elsewhere in the stylesheet keeps using `var(--color-bg)` and `var(--color-text)`
without ever knowing which theme is active. All that is needed to flip themes is adding or
removing the `dark-theme` class on `<body>` - a small job for a few lines of JavaScript:

```js
document.body.classList.toggle("dark-theme");
```

`classList.toggle()` adds the class if it is missing and removes it if it is present, which
is exactly what a toggle button needs.

Two more modern CSS features round out this topic:

`clamp(minimum, preferred, maximum)` picks a value that stays between a minimum and a
maximum, while scaling fluidly according to the "preferred" value in between. It is
commonly used for **fluid typography**:

```css
h1 {
  font-size: clamp(1.75rem, 5vw, 3rem);
}
```

This heading's font size will never shrink below `1.75rem` or grow past `3rem`, and in
between those limits it scales smoothly with the viewport width (`5vw`), instead of
snapping between fixed sizes at specific breakpoints.

`aspect-ratio` sets a fixed ratio between an element's width and height, so the browser
computes one dimension from the other. `aspect-ratio: 16 / 9` keeps a box in the common
widescreen ratio at any width, which is especially useful for image or video placeholders
that need to reserve the correct amount of space before the actual media loads.

## The Demo

`style.css` defines a full set of color variables on `:root` for light mode, then redefines
the same variable names inside a `body.dark-theme` rule for dark mode. Every colored
element on the page - the background, text, the info box, the button - reads its colors
through `var(--color-...)`, so none of those rules need to know which theme is active.

`script.js` is a handful of lines: it grabs the toggle button, and on each click, calls
`document.body.classList.toggle("dark-theme")` and updates the button's own label. That one
class toggle is the entire mechanism driving the theme switch.

`index.html`'s heading uses `font-size: clamp(1.75rem, 5vw, 3rem)`, so try resizing the
window to see it scale smoothly. The `.photo-box` element uses `aspect-ratio: 16 / 9` to
stay in a fixed widescreen shape regardless of the page's width.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click -> Open With).
No installation or server needed.

## Try It Yourself

Add a third theme, such as a high-contrast one, by adding a `body.high-contrast` rule with
its own set of variable overrides, plus a second button that toggles that class. Notice
that you do not need to touch any of the existing color rules to add it.

## Key Takeaways
- Custom properties are defined with `--name: value` (commonly on `:root`) and read with
  `var(--name)`.
- A theme toggle can be as simple as one class on `<body>` that overrides a shared set of
  variable names.
- `classList.toggle()` is the standard way to add/remove a class in response to a click.
- `clamp(min, preferred, max)` gives fluid values, like font sizes, that scale smoothly
  between two limits.
- `aspect-ratio` keeps an element's proportions consistent without a fixed pixel height.
