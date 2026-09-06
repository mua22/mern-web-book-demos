# 3.6: Project - A Full Responsive Page

**Difficulty:** Intermediate+
**Module:** [Module 3: Bootstrap](../README.md)

## What You'll Learn
- How to combine the grid, typography/utilities, components, and responsive utilities from
  Topics 3.1-3.4 into one real page
- How a typical landing page is structured: navbar, hero, features, secondary section,
  footer
- How to plan which sections need which Bootstrap building blocks before writing markup
- How multiple interactive components (a collapsing navbar and a modal) can coexist on one
  page
- How to read an unfamiliar page's markup and identify which classes are doing what

## Prerequisites
Module 1: HTML, Module 2: CSS, Topics 3.1-3.5

## Explanation
This topic doesn't introduce new Bootstrap classes. Instead, it puts together everything
from the rest of this module into a single, realistic landing page for a fictional product
called Brightline, the kind of page you'd build as a starting point for a real project.

Building a page like this is less about knowing more classes and more about **planning
sections and picking the right tool for each one**:

- The **navbar** at the top uses the same `navbar-expand-md` collapse pattern from Topic
  3.3/3.4, plus a button that opens a modal — so two different interactive JS-powered
  components (collapse and modal) exist on the same page and don't interfere with each
  other, because each has its own unique `id` and its own `data-bs-target`.
- The **hero section** right below it is a `bg-primary text-white text-center` block using
  typography classes (`display-5`, `lead`, `fw-bold`) and spacing utilities from Topic
  3.2 — no custom CSS, just classes.
- The **feature section** is a `.row` of three `.col-md-4` cards, combining the grid from
  Topic 3.1 with the card component from Topic 3.3.
- The **"Built for Teams" section** is a two-column row where the right-hand preview panel
  is hidden on mobile with `d-none d-md-block`, and the badges above it switch from a
  stacked column to a horizontal row with `flex-column flex-md-row` — both straight from
  Topic 3.4.
- The **contact section** uses an alert (Topic 3.3) and another button wired to the same
  modal as the navbar's button.
- The **footer** is a simple dark, centered block using color and text utilities.

Reading real-world Bootstrap markup like this is itself a skill: you'll often open a page
you didn't write and need to figure out, from the class names alone, which piece of the
module each part came from. Try doing that with this file before reading the walkthrough
below.

## The Demo
Open `index.html`. From top to bottom: a sticky, collapsing navbar with a "Get Started"
button that opens a signup modal; a full-width hero section; a row of three feature cards;
a two-column section where the right column disappears on narrow screens; a contact section
with an alert and another button that opens the same modal; and a footer. Resize the
browser window to see the navbar collapse into a hamburger, the right-hand preview panel
disappear below `md`, and the badge row switch from stacked to horizontal.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap's CSS and JS bundle from the CDN — nothing needs to be installed.

## Try It Yourself
Add a new section between the feature cards and the "Built for Teams" section: a row of
three testimonial cards (a quote and a name in each), reusing the same `row` / `col-md-4`
/ `card` pattern as the feature section above it.

## Key Takeaways
- A full page is built by choosing the right combination of grid, utilities, and
  components section by section, not by learning new classes.
- Multiple interactive components (collapse, modal) can coexist on one page as long as
  each trigger's `data-bs-target` points at a unique `id`.
- Hiding content on mobile with `d-none d-md-block` and reordering with flex direction
  utilities are common tools for adapting a dense desktop layout to a phone screen.
- Reusing the same row/column/card pattern for multiple sections (features, and this
  topic's suggested testimonials) keeps a page's markup consistent and predictable.
- A landing page is typically structured as navbar, hero, feature grid, one or more
  supporting sections, and a footer.
