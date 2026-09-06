# 2.6: CSS Grid

**Difficulty:** Intermediate
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- How to turn an element into a grid container with `display: grid`
- How to define columns and rows with `grid-template-columns` and `grid-template-rows`
- What the `fr` unit means and why it is useful for grids
- How to control spacing between grid cells with `gap`
- How to place items using named grid areas with `grid-template-areas`

## Prerequisites
Topic 2.5: Flexbox

## Explanation

Flexbox (topic 2.5) is great at laying things out along a single line - a row or a column.
CSS Grid is built for a different job: laying things out in two dimensions, rows and
columns at the same time. That makes it the natural tool for whole-page layouts, like the
classic header / sidebar / main content / footer arrangement you have probably seen on
countless websites.

To turn an element into a grid, give it `display: grid`. That element becomes the **grid
container**, and its direct children become **grid items**. On its own, `display: grid`
does not do much - you still need to describe the columns and rows you want.

`grid-template-columns` and `grid-template-rows` define the size of each column and row.
For example:

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
}
```

This creates three columns: a fixed 200px column, then two columns that split the
remaining space evenly. That `1fr` is the **fr unit** ("fraction"), and it means "one share
of the leftover space after fixed-size columns are accounted for." `grid-template-columns:
1fr 2fr` would give the second column twice as much space as the first.

`gap` sets spacing between grid cells (both rows and columns at once, or set `row-gap` and
`column-gap` separately), without needing margins on individual items.

You can place items in a grid two ways. The first is by **line numbers**: a grid with 3
columns has 4 vertical grid lines (numbered 1 to 4), and you can tell an item exactly which
lines to start and end at using `grid-column: 1 / 3` (start at line 1, end at line 3,
spanning two columns). The same idea applies to `grid-row`. This is precise, but it means
memorizing line numbers, which gets harder to read as a layout grows.

The second way - and the one used in this demo - is **named grid areas**. You give each
region of your layout a name, draw the layout as a grid of names using
`grid-template-areas`, and then each child just says which named area it belongs to:

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

Each quoted string in `grid-template-areas` is one row of the layout, and each word inside
it is one column of that row. Repeating a name (like `header` appearing twice in the first
row) makes that area span multiple columns. This reads almost like a diagram of the page,
which makes it easier to understand at a glance than a pile of line numbers.

## The Demo

`style.css` defines a `.page-grid` container with `display: grid` and a
`grid-template-areas` that spells out three rows: a full-width header, a sidebar next to
the main content, and a full-width footer. `grid-template-columns: 200px 1fr` gives the
sidebar a fixed width and lets the main content take up the rest using the `fr` unit.
`gap: 1rem` adds consistent spacing between every cell without any margins on the children.

Each child element (`.page-grid__header`, `.page-grid__sidebar`, `.page-grid__main`,
`.page-grid__footer`) is assigned to its named area with a single `grid-area` declaration -
no line-number math required.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click -> Open With).
No installation or server needed.

## Try It Yourself

Add a second sidebar-like area on the right side of the main content (call it, say,
`aside`). You will need to: add a third column to `grid-template-columns`, add `aside` to
the area names in each row of `grid-template-areas` where it should appear, add a new
element in the HTML, and give it `grid-area: aside` in the CSS.

## Key Takeaways
- `display: grid` turns an element into a two-dimensional layout container.
- `grid-template-columns` / `grid-template-rows` define the size of each column and row.
- The `fr` unit distributes leftover space proportionally between columns or rows.
- `gap` adds spacing between grid cells without extra margins.
- Named grid areas (`grid-template-areas` plus `grid-area`) let you describe a layout by
  name instead of by counting grid lines.
