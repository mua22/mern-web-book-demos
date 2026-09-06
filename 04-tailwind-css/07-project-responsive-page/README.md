# 4.7: Project: A Full Responsive Page

**Difficulty:** Intermediate+
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- How to assemble a nav, hero, feature grid, and footer into one real page
- How to reuse a custom color from your own `tailwind.config.js` throughout a page
- How stock responsive utilities (`hidden md:flex`, `grid-cols-1 md:grid-cols-3`) combine
  to reflow a whole layout, not just single elements, between mobile and desktop
- How to set up and build a second, fully independent Tailwind CLI project

## Prerequisites
Topic 4.6 (customizing `tailwind.config.js`). This folder has its own complete setup and
does not reuse or reference 4.6's files in any way.

## Explanation

This topic doesn't introduce new Tailwind concepts &mdash; it's a project that combines
everything from 4.1 through 4.6 into one realistic page: a landing page for a small
(fictional) student planning app called "Plannr."

The build setup is identical in structure to 4.6's, but it is a **separate, self-contained
project**: its own `package.json`, its own `tailwind.config.js`, its own `input.css`, and
its own `node_modules` once installed. Nothing here depends on the `06-*` folder. This
mirrors real teams, where every project (or every package in a larger repo) has its own
Tailwind install and its own configuration, even if the configs look similar.

`tailwind.config.js` here defines one custom color, `brand`, with a `DEFAULT` and a `dark`
shade:

```js
colors: {
  brand: {
    DEFAULT: '#0f766e',
    dark: '#115e59',
  },
},
```

Giving a color an object with `DEFAULT` (instead of a single string) is what makes both
`bg-brand` (using `DEFAULT`) and `bg-brand-dark` available at the same time &mdash; a
common pattern once you have more than one shade of a brand color to manage.

The page itself is structured as four stacked sections:

- A **nav** with a logo, links that are hidden on small screens and shown from the `md:`
  breakpoint up (`hidden md:flex`), and a call-to-action button.
- A **hero** section that stacks vertically on mobile and switches to a two-column layout
  side by side at `md:` (`md:flex md:items-center`), using `md:w-1/2` on each half.
- A **feature grid** with three cards, using `grid-cols-1 md:grid-cols-3` so the cards
  stack in a single column on mobile and sit side by side on desktop.
- A **footer** with copyright text and links that stack on mobile and sit in a row on
  desktop (`flex-col md:flex-row`).

Throughout, `brand` and `brand-dark` are used for buttons, links, and small accents, mixed
freely with ordinary Tailwind utilities like `rounded-lg`, `border`, and `text-slate-600`.

## The Demo

Resize your browser (or open DevTools' device toolbar) while viewing `index.html` and
watch three things happen at the `md` breakpoint: the nav links appear, the hero switches
from stacked to side-by-side, and the feature grid goes from one column to three. All of
this comes from the same small set of responsive prefixes you learned in topic 4.4,
applied across a full page instead of a single element.

## How to Run

From inside this folder (`04-tailwind-css/07-project-responsive-page/`):

1. `npm install` &mdash; installs Tailwind into this folder's own `node_modules`.
2. `npm run build` &mdash; compiles `input.css` (using this folder's own
   `tailwind.config.js`) into `dist/output.css`.
3. Open `index.html` in your browser.

Use `npm run dev` instead of `npm run build` if you want changes to `index.html` or
`tailwind.config.js` to recompile automatically while you edit.

## Try It Yourself

Add a fourth feature card to the grid (copy one of the existing three and change its
number, title, and description), then change `grid-cols-1 md:grid-cols-3` to
`grid-cols-1 md:grid-cols-2 lg:grid-cols-4` on the grid container so all four cards fit
neatly at a wider breakpoint. Re-run the build and reload to check the new layout at
different window widths.

## Key Takeaways
- A full page is built from the same utilities you already know, just combined at a
  larger scale across multiple sections.
- Defining a color as `{ DEFAULT: '...', dark: '...' }` in `tailwind.config.js` gives you
  both `bg-brand` and `bg-brand-dark` automatically.
- Responsive prefixes (`md:`, `lg:`) can reflow an entire section's layout, not just
  tweak one property.
- Every real project should have its own independent Tailwind install and config, even
  across similarly-structured projects.
- `hidden md:flex` is a common pattern for content (like nav links) that only appears from
  a given breakpoint up.
