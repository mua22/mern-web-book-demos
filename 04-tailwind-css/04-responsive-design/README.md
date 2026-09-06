# 4.4: Responsive Design

**Difficulty:** Intermediate
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- Tailwind's mobile-first responsive prefixes: `sm:`, `md:`, `lg:`
- How a prefix changes a utility class so it only applies at that breakpoint and above
- How to combine layout utilities (from 4.3) with responsive prefixes to change a layout
  at different screen widths
- How to build a card grid that goes from 1 column to 3 columns as the screen gets wider

## Prerequisites
Module 2: CSS (responsive design / media queries), 4.1: Setup & the Utility-First
Concept, 4.2: Core Utilities, 4.3: Flexbox & Grid Utilities

## Explanation
In Module 2, responsive design meant writing a media query yourself, such as
`@media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }`.
Tailwind gives you the same idea as a class prefix instead: put a breakpoint name and a
colon in front of any utility class, and that utility only takes effect once the screen
is at least that wide.

Tailwind's most common breakpoint prefixes are:

- `sm:` - applies at 640px and wider
- `md:` - applies at 768px and wider
- `lg:` - applies at 1024px and wider

Tailwind is **mobile-first**: a plain utility class with no prefix (like `grid-cols-1`)
applies to every screen size, including the smallest phones. Adding a prefixed class,
like `md:grid-cols-3`, does not replace the base class below 768px - it only overrides it
once the screen reaches 768px or wider. So `grid-cols-1 md:grid-cols-3` reads as: "use 1
column normally, but switch to 3 columns from the `md` breakpoint upward."

This works with any utility, not just `grid-cols-*`. You could write
`text-sm md:text-lg lg:text-xl` to make text bigger in two steps as the screen widens, or
`flex-col md:flex-row` to stack items on a phone but lay them out in a row on a larger
screen. The prefix is the only new syntax here - every utility class you already know from
4.1 through 4.3 can take one.

## The Demo
Open `index.html`. The main example is the same card grid pattern from 4.3, with
responsive prefixes added to the container:

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
```

- `grid-cols-1` is the base, mobile-first layout: one column, so the three cards stack
  vertically on a narrow screen.
- `md:grid-cols-3` overrides that to three columns, but only once the browser window is
  768px wide or more.

A second example applies the same idea to text size:

```html
<p class="text-sm md:text-lg lg:text-xl ...">
```

This paragraph is small by default, grows to `text-lg` at the `md` breakpoint (768px),
and grows again to `text-xl` at the `lg` breakpoint (1024px) - three sizes controlled
entirely by prefixes on one element.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Tailwind from the Play CDN - nothing needs to be installed.

Resize your browser window past 768px wide to see the layout respond.

## Try It Yourself
Add a fourth card to the grid, then change `md:grid-cols-3` to `md:grid-cols-2` and add
`lg:grid-cols-4`, so the grid goes: 1 column on small screens, 2 columns at `md`, and 4
columns at `lg`. Resize the window to confirm all three states.

## Key Takeaways
- Responsive prefixes (`sm:`, `md:`, `lg:`) apply a utility class only at that breakpoint
  and wider.
- Tailwind is mobile-first: an unprefixed class is the base style for all screen sizes,
  and prefixed classes override it starting at their breakpoint.
- Any utility class can take a responsive prefix, not just layout classes like
  `grid-cols-*`.
- Combining plain utilities with responsive prefixes on the same element
  (`grid-cols-1 md:grid-cols-3`) replaces the need for hand-written media queries.
