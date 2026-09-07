# Variant 2: Basic CSS

**Difficulty:** Beginner
**Technologies:** HTML + basic CSS only.
**Deliberately does NOT use:** `display: flex`/`grid`, `position` (other than the default
`static`), `float`, `transition`/`animation`, or `@media` queries - those are all saved
for [Variant 3](../03-modern-css/).

The same resume content as [Variant 1](../01-plain-html/), now with the kind of CSS you'd
write right after learning selectors, colors, fonts, and the box model - and nothing more
advanced than that. This is the second of [three variants](../README.md); see that page
for the full comparison.

## What You'll Learn

- How far you can get with only colors, fonts, spacing (`margin`/`padding`), and `border`
- That a page can look clean and organized without any layout system more advanced than
  normal document flow (everything just stacks top to bottom, the way HTML naturally
  flows)
- What's still missing without Flexbox/Grid/positioning: no side-by-side columns, no
  sticky sidebar, nothing wraps around anything, and nothing responds to screen size

## The Demo

`index.html` has the same content as Variant 1, with a handful of `class` attributes
added purely as CSS hooks (`.resume`, `.section`, `.entry`, and so on) and a linked
`style.css`. Every rule in `style.css` falls into one of these categories:

- **Color and typography** - `color`, `background-color`, `font-family`, `font-size`,
  `font-weight`, `font-style`
- **The box model** - `margin`, `padding`, `border`, `max-width`
- **Basic text formatting** - `text-align`, `list-style-type`

There is intentionally no `display: flex`, no `position: relative/absolute/sticky`, no
`float`, no `transition` or `@keyframes`, and no `@media` query anywhere in this file.
Everything still stacks vertically in normal document flow, the same way it did in
Variant 1 - CSS here is only changing *appearance*, not *layout*.

## How to Run

Open `index.html` directly in your browser. No installation, server, or internet
connection needed.

## Try It Yourself

- Try to make the Skills and Languages sections sit side by side using only the
  properties listed above (color/box-model/text). You'll find it's genuinely difficult -
  that's the point, and exactly the problem Flexbox and Grid (Variant 3) were invented to
  solve.
- Shrink your browser window as narrow as it goes - nothing about the layout adapts,
  because there is no responsive design here at all (no `@media` queries).
- Add a new `.entry` block to the Projects section using only the CSS classes already
  defined in `style.css`, to prove they're reusable.

## Key Takeaways

- Colors, fonts, spacing, and borders alone can make a page look tidy and readable.
- Layout (arranging boxes relative to each other, wrapping content responsively) is a
  fundamentally different problem from appearance, and needs different CSS tools
  (Flexbox, Grid, positioning) - covered in [Variant 3](../03-modern-css/).
