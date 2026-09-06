# 4.3: Flexbox & Grid Utilities

**Difficulty:** Intermediate
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- Tailwind's Flexbox utilities: `flex`, `flex-row`/`flex-col`, `justify-*`, `items-*`,
  `gap-*`
- Tailwind's Grid utilities: `grid`, `grid-cols-*`, `col-span-*`
- How to build a navbar (logo left, links right) with Flexbox utilities
- How to build a multi-column card grid with Grid utilities

## Prerequisites
Module 2: CSS (Flexbox and Grid), 4.1: Setup & the Utility-First Concept,
4.2: Core Utilities

## Explanation
In Module 2 you learned Flexbox and Grid as CSS properties you set inside a rule, such as
`display: flex; justify-content: space-between;`. Tailwind gives you a utility class for
each of those properties, so you apply the same layout system without leaving your HTML.

**Flexbox utilities** start with `flex`, which is the same as `display: flex` on an
element - it turns that element into a flex container and its direct children into flex
items. `flex-row` lays children out left-to-right (the default), and `flex-col` stacks
them top-to-bottom. `justify-*` controls alignment along the main axis (for example,
`justify-between` pushes the first and last child to opposite ends, with any children in
between spread out evenly), and `items-*` controls alignment along the cross axis (for
example, `items-center` vertically centers children in a row layout). `gap-*` adds space
between the flex items, using the same spacing scale from 4.2.

**Grid utilities** start with `grid`, the same as `display: grid`. `grid-cols-3` divides
the container into 3 equal-width columns, and every direct child is placed into the grid
automatically, one per cell, wrapping to a new row once the columns fill up. A single
child can be made to span more than one column with `col-span-*` - `col-span-2` makes
that one element take up the width of two columns instead of one.

The key difference between the two systems still holds from Module 2: Flexbox is best for
laying out items in a single row or column (like a navbar), while Grid is best when you
want a two-dimensional layout with defined columns (like a gallery of cards). Tailwind
does not change that decision - it only changes how you write it.

## The Demo
Open `index.html`. It has two sections.

The **navbar** is a `<nav>` with:

```html
<nav class="flex flex-row items-center justify-between p-4 bg-white border rounded-lg shadow-md mb-8">
  <p class="text-xl font-bold text-slate-800">MyLogo</p>
  <div class="flex flex-row gap-4">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

- `flex flex-row` turns the nav into a horizontal flex container
- `items-center` vertically centers the logo and the links relative to each other
- `justify-between` pushes the logo to the far left and the links group to the far right
- The inner `<div>` is itself `flex flex-row gap-4`, laying out the three links in a row
  with even spacing between them

The **card grid** is a `<div class="grid grid-cols-3 gap-4">` containing five card
`<div>`s. `grid-cols-3` arranges them three per row, wrapping the fourth and fifth cards
onto a second row, and `gap-4` spaces the cards apart both horizontally and vertically.
The fourth card additionally has `col-span-2`, so it visibly takes up two of the three
columns on its row instead of one.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Tailwind from the Play CDN - nothing needs to be installed.

## Try It Yourself
Change the card grid from `grid-cols-3` to `grid-cols-2`, reload the page, and see how
the cards reflow. Then change the navbar's `justify-between` to `justify-center` and
compare how the logo and links are positioned.

## Key Takeaways
- `flex` plus `flex-row`/`flex-col` sets up a one-dimensional layout, just like
  `display: flex` in plain CSS.
- `justify-*` aligns items along the main axis; `items-*` aligns them along the cross
  axis.
- `grid` plus `grid-cols-*` sets up a multi-column, two-dimensional layout, just like
  `display: grid`.
- `col-span-*` lets one grid item span more than one column.
- `gap-*` works the same way in both Flexbox and Grid containers to space children apart.
