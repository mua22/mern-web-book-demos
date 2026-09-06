# 2.5: Flexbox

**Difficulty:** Beginner+
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- What a flex container and a flex item are
- How `display: flex` changes the layout of an element's direct children
- The difference between the main axis and the cross axis
- `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, and `gap`
- A brief introduction to `flex-grow`, `flex-shrink`, and `flex-basis`

## Prerequisites
Topic 2.4: Display & Positioning

## Explanation

Flexbox is a layout system built for arranging a row or column of elements,
with much more control over spacing, alignment, and sizing than you get with
plain block or inline elements.

Flexbox always involves two roles:

- A **flex container** — the parent element you give `display: flex`.
- **Flex items** — the container's direct children, which the container
  then arranges.

Once an element is a flex container, its items line up along the
**main axis**, whose direction is set by `flex-direction` (`row` by default,
meaning left to right; `column` makes it top to bottom). The
**cross axis** runs perpendicular to the main axis — vertical when the main
axis is a row, horizontal when the main axis is a column.

Two properties control alignment along each axis:

- `justify-content` positions items along the **main axis** — common values
  include `flex-start`, `center`, `space-between` (first item at the start,
  last at the end, space distributed between the rest), and `space-around`.
- `align-items` positions items along the **cross axis** — common values
  include `flex-start`, `center`, and `stretch` (the default, which makes
  every item fill the full cross-axis size of the tallest/widest item).

A few more properties round out the basics:

- `flex-wrap: wrap` allows items to drop onto additional rows (or columns)
  instead of squeezing onto one line or overflowing when there isn't enough
  room.
- `gap` adds consistent spacing between flex items, without needing manual
  margins on each one.
- `flex-grow`, `flex-shrink`, and `flex-basis` (often combined into the
  shorthand `flex: grow shrink basis`) control how an individual item
  resizes: `flex-basis` is its starting size, `flex-grow` lets it expand to
  fill leftover space, and `flex-shrink` lets it shrink when space is
  tight.

## The Demo

`style.css` covers three scenarios in `index.html`:

1. A responsive navigation bar (`.navbar`): `display: flex` with
   `justify-content: space-between` pushes the logo to the left and the nav
   links to the right, while `align-items: center` keeps them vertically
   aligned. The `<ul>` of links is itself a flex container with `gap` and
   `flex-wrap: wrap`, so the links can drop to a second line on a narrow
   screen instead of overflowing.
2. A row of feature cards (`.card-row`): each card uses
   `flex: 1 1 200px`, and the row uses `flex-wrap: wrap`, so cards sit in
   one row on a wide screen and wrap onto multiple rows on a narrow one.
   Because `align-items` defaults to `stretch`, every card in the same row
   is automatically the same height, even with differing amounts of text.
3. An isolated main-axis-vs-cross-axis example (`.axis-demo`), using
   `justify-content: center` (main axis) and `align-items: flex-end`
   (cross axis) on three numbered boxes, so you can watch each property
   affect a different direction.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed. Resize your browser window
narrower to see the nav links and the feature cards wrap.

## Try It Yourself

In `style.css`, find `.axis-demo` and change `justify-content: center` to
`justify-content: space-between`, and `align-items: flex-end` to
`align-items: center`. Reload the page and watch the three numbered boxes
spread out along the main axis (left to right) while centering along the
cross axis (top to bottom), instead of clustering in the middle and sitting
at the bottom.

## Key Takeaways
- `display: flex` turns an element into a flex container and its direct
  children into flex items.
- The main axis is set by `flex-direction`; `justify-content` aligns along
  it, and `align-items` aligns along the cross axis instead.
- `flex-wrap: wrap` and `gap` are what make flex layouts like nav bars and
  card grids responsive without extra media queries.
- `align-items: stretch` (the default) is why flex items in the same row
  often end up the same height automatically.
- `flex-grow`, `flex-shrink`, and `flex-basis` fine-tune how individual
  items resize as the container's space changes.
