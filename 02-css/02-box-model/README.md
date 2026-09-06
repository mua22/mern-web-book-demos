# 2.2: The Box Model

**Difficulty:** Beginner
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- The four layers of the CSS box model: content, padding, border, margin
- How `box-sizing: content-box` and `border-box` change what `width` measures
- Why two boxes with the same `width` can render at different sizes
- What margin collapsing is and when it happens

## Prerequisites
Topic 2.1: Syntax & Selectors

## Explanation

Every single element on a web page, whether it is a paragraph, a `div`, or a
button, is rendered by the browser as a rectangular **box**. That box is made
of four layers, from the inside out:

1. **Content** — the actual text, image, or child elements.
2. **Padding** — empty space between the content and the border. Padding is
   still "inside" the element; if the element has a background color, the
   padding area shows that color too.
3. **Border** — a line drawn around the padding, set with the `border`
   property (for example `border: 2px solid black;`).
4. **Margin** — empty space *outside* the border. Margin is transparent and
   used to create distance between this box and the elements around it.

By default, the CSS `width` and `height` properties only set the size of the
**content** box. Padding and border are then added *on top of* that width,
which means the element's final rendered size ends up bigger than the
`width` you wrote. This default behavior is called `box-sizing: content-box`.

Most developers instead prefer `box-sizing: border-box`, which changes what
`width` means: it now sets the width of content + padding + border combined.
The browser shrinks the content area internally to make everything fit, so
the box you see on screen never exceeds the `width` you specified. This
makes layouts far more predictable, especially once padding and borders are
involved.

One more behavior worth knowing about: **margin collapsing**. When two
block-level elements are stacked vertically and both have a margin between
them (for example, one's `margin-bottom` and the next one's `margin-top`),
the browser does not add the two margins together. Instead, it collapses
them into a single margin equal to whichever one is larger. This only
happens with vertical margins between certain elements in normal document
flow — it does not happen with horizontal margins, and it does not apply to
padding.

## The Demo

`style.css` is organized into three sections that match the three sections
of `index.html`:

1. A single box (`.box-demo`) with a yellow padding area and a thick blue
   border, wrapped in a dashed outline (`.labelled-box`) so the margin
   region is visible as the gap between the dashed line and the blue border.
2. Two boxes with identical `width: 300px`, `padding`, and `border`, but one
   uses `box-sizing: content-box` and the other `box-sizing: border-box`.
   The comments in the CSS work out the exact final width of each.
3. Two sibling boxes (`.sibling-box`) that both have `margin: 30px 0`. Even
   though that is 30px on the bottom of the first box and 30px on the top of
   the second, the visible gap between them is 30px, not 60px, because of
   margin collapsing.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

## Try It Yourself

In `style.css`, find `.content-box` and change its `box-sizing` from
`content-box` to `border-box`. Reload the page. Notice that its rendered
width now matches the `border-box` example next to it exactly, even though
you did not touch its `width`, `padding`, or `border` at all.

## Key Takeaways
- Every element's box has four layers: content, padding, border, margin.
- `box-sizing: content-box` (the default) makes `width` apply to content
  only, so padding and border add to the final size.
- `box-sizing: border-box` makes `width` apply to the whole box, keeping the
  final rendered size predictable.
- Padding is inside the border and shows the element's background; margin is
  outside the border and is always transparent.
- Vertical margins between sibling elements can collapse into a single,
  larger margin instead of adding together.
