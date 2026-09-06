# 3.2: Typography and Utilities

**Difficulty:** Beginner
**Module:** [Module 3: Bootstrap](../README.md)

## What You'll Learn
- How Bootstrap restyles basic HTML text elements before you add any classes
- How to control margin and padding with spacing utility classes (`m-*`, `p-*`)
- How directional and breakpoint variants of spacing classes work
- How to align, weight, and transform text with text utilities
- How to apply text and background colors with color utilities

## Prerequisites
Module 1: HTML, Module 2: CSS, Topic 3.1: Setup and the Grid System

## Explanation
Once Bootstrap's stylesheet is loaded, it changes how ordinary HTML elements look even
before you add a single class: paragraphs get more readable line spacing, headings get
consistent sizing and weight, and `<blockquote>` gets a larger font. This is Bootstrap's
**typography baseline** — a more polished starting point than the browser default.

On top of that baseline, Bootstrap ships hundreds of small, single-purpose **utility
classes**. Instead of writing `.my-box { margin: 1rem; padding: 0.5rem; }` in a stylesheet,
you add `m-3 p-2` directly to the element in your HTML.

**Spacing utilities** follow the pattern `{property}{sides}-{size}`:

- `property` is `m` for margin or `p` for padding.
- `sides` is optional: `t` (top), `b` (bottom), `s` (start, i.e. left in a left-to-right
  language), `e` (end, i.e. right), `x` (left and right), `y` (top and bottom), or nothing
  for all four sides.
- `size` is a number from `0` to `5` (roughly 0 to 3rem), or `auto` for margins.

So `mt-3` means "margin-top, size 3," and `px-4` means "padding-left and padding-right,
size 4." Any spacing class can also take a breakpoint in the middle, like `mt-md-5`, which
only applies the rule from the `md` breakpoint upward — letting you add breathing room on
larger screens without affecting mobile layouts.

**Text utilities** change how text reads: `text-center` / `text-start` / `text-end` for
alignment, `fw-bold` / `fw-normal` for font weight, `fst-italic` for italics,
`text-uppercase` / `text-lowercase` / `text-capitalize` for casing, and `text-muted` for a
lower-emphasis gray often used for captions or secondary text.

**Color utilities** apply Bootstrap's theme colors (`primary`, `secondary`, `success`,
`danger`, `warning`, `info`, `light`, `dark`) to either text (`text-primary`) or background
(`bg-primary`). Combine a background color with `text-white` or `text-dark` to keep
readable contrast.

## The Demo
Open `index.html`. It has five sections: typography defaults shown on plain tags, a
spacing utilities section showing `m-*`/`p-*` at different sizes plus directional and
breakpoint variants, a text utilities section, a color utilities section, and a final
"hero" section that combines spacing, text, and color utilities into one styled block —
built entirely from the classes covered above, with no custom CSS file anywhere in this
topic.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap from the CDN — nothing needs to be installed.

## Try It Yourself
Build your own small "card" out of a plain `<div>` using only utility classes: give it a
`bg-*` color, `text-white` if needed, `p-4` padding, `rounded` corners, `text-center`
alignment, and a bold uppercase heading inside it.

## Key Takeaways
- Bootstrap restyles basic HTML elements (headings, paragraphs, blockquotes) automatically.
- Spacing utilities follow `{m|p}{side}-{size}`, e.g. `mt-3`, `px-4`, `py-md-5`.
- A missing side letter means all four sides; `x`/`y` mean horizontal/vertical pairs.
- Text utilities cover alignment, weight, style, and casing without any custom CSS.
- Color utilities like `text-primary` and `bg-light` apply Bootstrap's theme colors
  directly through classes.
