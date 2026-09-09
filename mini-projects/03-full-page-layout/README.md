# Mini Project 3: Complete Page Layout with Float and Positioning

**Difficulty:** Intermediate
**Technologies:** HTML, CSS only - no JavaScript, no build step, no external assets.
**Combines topics from:** [Module 1: HTML](../../01-html/), [Module 2: CSS](../../02-css/)
(float, positioning), and the book's
[Complete Page Layout tutorial](https://mua22.github.io/mern-web-book/tutorials/full-page-layout/).

A full, realistic page combining `float` (for side-by-side layout) with `position`
(for pinning and precise placement) — the reference implementation for the book's
Complete Page Layout tutorial. One page, five techniques, zero JavaScript.

## What This Demonstrates

- **A sticky toolbar** (`position: sticky`) with a floated logo and a floated horizontal
  menu (`float: left` / `float: right`).
- **A notification badge** on a menu item, using `position: relative` on the `<li>` and
  `position: absolute` on the badge itself — the standard "badge in the corner" pattern.
- **A vertical sidebar menu** that needs *no* float at all — block-level `<li>` elements
  already stack vertically by default; only the *columns* around it need floating.
- **A floated three-column body** (sidebar, main content, widgets) and a **floated
  four-column footer**, both using the `overflow: hidden` clearfix technique.
- **A fixed "back to top" button** (`position: fixed`), pinned to the browser window
  itself regardless of scroll position.

## How to Run

Open `index.html` directly in your browser — no server, build step, or internet
connection needed. Scroll down to see the toolbar stay pinned to the top of the page
(`position: sticky`) and the orange "Top" button stay fixed in the bottom-right corner
of the window the entire time (`position: fixed`).

## Architecture

```
index.html   -- header (toolbar) + page-body (3 floated columns) + footer
                (4 floated columns) + a fixed back-to-top link
style.css    -- one block of CSS per section, in the same order as index.html
```

The technique used in each section, at a glance:

| Section | Technique | Why |
|---|---|---|
| `#toolbar` | `position: sticky` + `float` (logo/menu) | Pinned header, side-by-side logo and menu |
| `.badge` | `position: relative` (parent) + `position: absolute` (child) | Precise placement on one specific menu item |
| `.vertical-menu` | *(no float)* | Block-level `<li>` stacks vertically by default |
| `#page-body` columns | `float: left` + `overflow: hidden` clearfix | Three side-by-side columns |
| `.footer-columns` | `float: left` + `overflow: hidden` clearfix | Four side-by-side footer columns |
| `#back-to-top` | `position: fixed` | Anchored to the viewport, ignores scroll and document flow |

## Try It Yourself

1. Remove `overflow: hidden;` from `#page-body` and reload — watch the footer jump up
   and overlap the three columns (the classic collapsed-parent float bug), then restore
   it.
2. Remove `overflow-wrap: break-word;` from `.footer-col` and reload — watch the email
   address in the Contact column overflow into the Follow Us column, then restore it.
3. Add a fifth footer column and adjust the column widths so all five still fit.
4. Change `#back-to-top` from `right: 24px` to `left: 24px` to move it to the other
   corner.
