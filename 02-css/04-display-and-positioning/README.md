# 2.4: Display & Positioning

**Difficulty:** Beginner+
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- The difference between `display: block`, `inline`, `inline-block`, and `none`
- The five `position` values: `static`, `relative`, `absolute`, `fixed`, `sticky`
- What a "positioning context" is and which ancestor an absolutely positioned element anchors to
- How `top`/`right`/`bottom`/`left` offsets work with each position value
- How `z-index` controls which overlapping element draws on top

## Prerequisites
Topic 2.3: Colors, Typography & Backgrounds

## Explanation

The `display` property controls how an element behaves in the layout, next
to its neighbors:

- `display: block` — the element starts on its own new line and stretches
  to fill the available width. `<div>`, `<p>`, and `<h1>` are block by
  default.
- `display: inline` — the element flows in line with surrounding text or
  elements, only as wide as its content requires. It ignores `width`,
  `height`, and top/bottom margin. `<span>` and `<a>` are inline by default.
- `display: inline-block` — a hybrid: it sits in line with neighbors like
  `inline`, but accepts `width`, `height`, and vertical margin/padding like
  `block`.
- `display: none` — removes the element entirely. It is not just invisible;
  it takes up no space at all, as if it were deleted from the page.

The `position` property controls *where* an element is placed and whether it
can be offset from that spot using `top`, `right`, `bottom`, and `left`:

- `position: static` is the default for every element. It sits exactly
  where normal document flow puts it, and `top`/`left`/`right`/`bottom` have
  no effect.
- `position: relative` shifts the element visually, offset from where it
  would normally sit, using `top`/`left`/`right`/`bottom`. The space it
  originally occupied is preserved, so nothing else moves to fill the gap.
  Just as importantly, giving an element `position: relative` turns it into
  a **positioning context** for any descendant that uses
  `position: absolute`.
- `position: absolute` removes the element from normal document flow
  completely (other elements act as if it isn't there) and positions it
  using offsets measured from its nearest ancestor that has a `position`
  other than `static`. If no ancestor qualifies, it is positioned relative
  to the whole page instead.
- `position: fixed` also leaves normal flow, but anchors to the browser
  viewport itself rather than any ancestor, so it stays in the same screen
  position even while the page scrolls.
- `position: sticky` behaves like `static` until the page scrolls to the
  offset you gave it (for example `top: 0`), then it "sticks" there — but
  only while its containing element is still on screen. Once that container
  scrolls past, the sticky element scrolls away with it.

When positioned elements overlap, `z-index` decides which one draws on top.
A higher `z-index` wins, regardless of the order elements appear in the
HTML. `z-index` only has an effect on elements that are positioned (any
value other than `static`).

## The Demo

`style.css` is split into four parts that match `index.html`:

1. One example each of `display: block`, `inline`, `inline-block`, and
   `none`, with comments explaining what changes.
2. One example each of `position: static`, `relative`, `absolute` (nested
   inside a `relative` parent), `fixed`, and `sticky`.
3. Three overlapping absolutely positioned boxes whose stacking order is
   controlled entirely by `z-index`, not HTML order.
4. The classic "badge on a card corner" pattern: `.card` has
   `position: relative`, and `.badge` inside it has `position: absolute`
   with `top`/`right` offsets, pinning it to the card's top-right corner.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed. Try scrolling the page to
see the `fixed` box stay put, and scroll the small box in the sticky example
to see that heading stick and then release.

## Try It Yourself

In `style.css`, find `.badge` and change `top: -10px; right: 16px;` to
`bottom: -10px; left: 16px;`. Reload the page and notice the badge now pins
to the card's *bottom-left* corner instead — the same `position: relative`
parent still anchors it, only the offsets changed.

## Key Takeaways
- `display` controls how a box lays out next to its neighbors: block starts
  a new line and fills width, inline flows with content, inline-block does
  both, and none removes the element entirely.
- `position: static` is the default and ignores offsets; every other
  position value can be moved with `top`/`right`/`bottom`/`left`.
- `position: relative` on a parent creates the anchor point that
  `position: absolute` children are offset from.
- `position: fixed` anchors to the viewport; `position: sticky` toggles
  between normal flow and fixed-like behavior based on scroll position.
- `z-index` breaks ties between overlapping positioned elements; higher
  values draw on top.
