# 3.4: Responsive Utilities

**Difficulty:** Intermediate
**Module:** [Module 3: Bootstrap](../README.md)

## What You'll Learn
- How to hide or show elements at specific breakpoints with display utilities
- How to build a sidebar that disappears on mobile instead of being squeezed
- How to switch a flex layout's direction responsively (`flex-column` / `flex-md-row`)
- How Bootstrap's built-in navbar collapse behavior works and why it needs the JS bundle
- How to manually test responsive behavior by resizing the browser window

## Prerequisites
Module 1: HTML, Module 2: CSS, Topics 3.1-3.3

## Explanation
You've already used responsive column classes like `col-md-4` to change how wide something
is at different screen sizes. This topic covers two more categories of responsive
utilities: **display** and **flex**.

**Display utilities** control whether an element is shown at all, and how. `d-none` sets
`display: none`, hiding the element entirely (it isn't just invisible, it takes up no
space). Every display utility can be prefixed with a breakpoint: `d-md-block` sets
`display: block`, but only starting at the `md` breakpoint (768px) and wider. Combine two
display classes to flip behavior at a breakpoint, for example `d-none d-md-block`: hidden
by default, shown as a block from `md` upward. This is the standard pattern for content
that should only appear once there's enough screen space, like a sidebar.

**Flex utilities** work the same way but control flexbox behavior. `d-flex` makes an
element a flex container. `flex-column` stacks its children vertically; `flex-row` places
them in a horizontal row. Prefixing with a breakpoint, as in `flex-md-row`, means "use this
direction starting at `md` and up." Writing `flex-column flex-md-row` together gives you a
layout that stacks on mobile and becomes a horizontal row on larger screens, without a
single line of custom CSS or a single media query written by hand.

Bootstrap's navbar has this responsive behavior built in already, through a component
called the **collapse**. A `navbar-expand-md` navbar shows its links in a row at `md` and
above, and swaps to a `navbar-toggler` (hamburger) button below `md` that expands and
collapses the menu when clicked. That collapsing/expanding is powered by Bootstrap's
JavaScript bundle, connected through `data-bs-toggle="collapse"` and `data-bs-target`
pointing at the collapsible menu's `id` — the same trigger pattern used by the modal in
Topic 3.3.

None of this can be seen in a screenshot or a fixed-width preview — you have to actually
resize the browser window to watch elements appear, disappear, or change layout direction
live.

## The Demo
Open `index.html`. At the top, a `navbar-expand-md` navbar collapses into a hamburger menu
below 768px wide — click the hamburger icon to expand it. Below that: two alert boxes that
swap visibility around the `md` breakpoint using `d-none`/`d-md-block`; a sidebar layout
where the sidebar column is fully removed on mobile with `d-none d-md-block` so the main
content takes the full width instead of being squeezed; and a flex row that stacks
vertically on mobile and becomes a horizontal row at `md` and above using
`flex-column flex-md-row`.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap's CSS and JS bundle from the CDN — nothing needs to be installed. To see the
responsive behavior, drag the edge of your browser window to make it narrower and wider
(or open your browser's device toolbar / responsive design mode and pick a phone-sized
screen), and watch the navbar, the info boxes, the sidebar, and the flex row all change as
you cross 768px wide.

## Try It Yourself
Add a fourth flex item to the bottom section, and add a second sidebar-style column on the
right side of the main content that is visible only on large screens and up, using
`d-none d-lg-block` instead of `d-md-block`.

## Key Takeaways
- `d-none` fully removes an element from layout; pairing it with a breakpoint class like
  `d-md-block` reveals it starting at that width.
- Hiding an unusable sidebar on mobile (rather than shrinking it) is a common, effective
  responsive pattern.
- `d-flex` plus direction classes (`flex-column`, `flex-md-row`) build a responsive layout
  without any custom CSS or media queries.
- Bootstrap's navbar collapse behavior is built on the same `data-bs-toggle` /
  `data-bs-target` pattern as the modal, and needs the JS bundle to function.
- Responsive behavior must be tested by actually resizing the browser, not by looking at a
  single fixed-width screenshot.
