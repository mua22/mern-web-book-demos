# Mini Project 2: Multilevel Navigation with Positioning

**Difficulty:** Intermediate
**Technologies:** HTML, CSS only - no JavaScript, no build step, no external assets.
**Combines topics from:** [Module 1: HTML](../../01-html/), [Module 2: CSS](../../02-css/)
(positioning, Flexbox), and the book's
[Multilevel Navigation tutorial](https://mua22.github.io/mern-web-book/tutorials/multilevel-navigation/).

A two-level dropdown navigation menu — the reference implementation for the book's
Multilevel Navigation tutorial. A single, standard CSS pattern (`position: relative` on
the parent, `position: absolute` on the child, revealed on `:hover`) does all the work,
with **no JavaScript at all**.

## What This Demonstrates

- **Level 1** — a horizontal menu bar built with `display: flex` on the `<ul>`.
- **Level 2** — hovering "Services" reveals a vertical dropdown, positioned with
  `position: absolute` relative to its parent `<li>` (which is given
  `position: relative` to become that positioning context).
- **Level 3 — left for you.** The CSS file ends with a comment scaffold instead of a
  finished third level. Extending "Web Development" with its own flyout submenu
  (opening to the *side* this time, not below) is the whole point of the tutorial this
  project comes from — work through it there, then come back and implement it here.

## How to Run

Open `index.html` directly in your browser — no server, build step, or internet
connection needed. Hover over **Services** in the navigation bar to see the dropdown.

## Architecture

```
index.html   -- <nav> with a two-level <ul>/<li> structure
style.css    -- level 1 (flex row) + level 2 (relative/absolute dropdown) + a
                commented scaffold marking where a level-3 flyout would go
```

The key relationship to understand is in `style.css`:

```css
.nav-level-1 > li {
  position: relative;   /* (1) positioning context for the dropdown */
}

.nav-level-2 {
  position: absolute;   /* (2) positioned relative to (1), not the page */
  top: 100%;             /* (3) snap to just below the positioning context */
  left: 0;
  display: none;         /* (4) hidden until... */
}

.has-submenu:hover .nav-level-2 {
  display: block;        /* ...the parent <li> is hovered */
}
```

Every dropdown menu you've ever used on the web is some variation of this same four-step
pattern — including a third level, fourth level, or a mega-menu with multiple columns.

## Try It Yourself

1. Implement the level-3 flyout described in the CSS comment — see the
   [tutorial](https://mua22.github.io/mern-web-book/tutorials/multilevel-navigation/)
   for guiding questions if you get stuck.
2. Add a short `transition` on `.nav-level-2`'s `opacity` so it fades in instead of
   appearing instantly.
3. Add a text arrow after "Services" (for example `&#9662;`) to hint that it opens a
   submenu.
