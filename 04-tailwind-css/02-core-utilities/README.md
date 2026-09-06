# 4.2: Core Utilities

**Difficulty:** Beginner+
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- The spacing scale (`p-*`, `m-*`, `gap-*`) and how its numbers map to rem values
- Sizing utilities (`w-*`, `h-*`), including `w-full` and fractional widths like `w-1/2`
- Typography utilities: `text-sm`/`text-lg`/`text-xl`, `font-medium`/`font-bold`, and
  `text-center`
- Color utilities and Tailwind's color scale, such as `bg-slate-100` and `text-slate-800`
- Border and shadow utilities: `border`, `rounded-lg`, `shadow-md`

## Prerequisites
Module 1: HTML, Module 2: CSS, 4.1: Setup & the Utility-First Concept

## Explanation
Topic 4.1 showed you five utility classes. Tailwind actually organizes its utilities into
consistent families that all follow the same naming pattern, so once you understand one
family, you can guess most of the others.

**Spacing** utilities cover padding (`p-*`), margin (`m-*`), and the gap between flex or
grid children (`gap-*`). The number after the dash is not a pixel count - it is a step on
Tailwind's spacing scale, where each step is `0.25rem` (4px at the default browser font
size). So `p-1` is `0.25rem`, `p-2` is `0.5rem`, `p-4` is `1rem`, and `p-8` is `2rem`. You
can also target one side or axis: `pt-4` (padding-top), `px-4` (padding left and right),
`mb-2` (margin-bottom), and so on.

**Sizing** utilities set width and height. `w-full` makes an element take 100% of its
parent's width, and `w-1/2` makes it take exactly half - the fraction in the class name
becomes a percentage. `h-*` works the same way for height. These read much like the CSS
you'd otherwise write by hand (`width: 100%`), just as a class instead of a rule.

**Typography** utilities control text size and weight. `text-sm`, `text-lg`, and
`text-xl` step the font size up or down from the default. `font-medium` and `font-bold`
control font weight (`font-bold` is heavier than `font-medium`). `text-center` centers
text horizontally, the same as `text-align: center`.

**Color** utilities like `bg-slate-100` and `text-slate-800` follow the pattern
`{property}-{color}-{shade}`. Tailwind ships each color as a scale from `50` (very
light) to `900` (very dark), so `bg-slate-100` is a very light gray background, while
`text-slate-800` is a dark gray, readable text color. Using shades from the same color
family (here, `slate`) keeps a design visually consistent.

**Borders and shadows** finish off a component: `border` adds a thin 1px border on all
sides, `rounded-lg` rounds the corners more than the plain `rounded` you saw in 4.1, and
`shadow-md` adds a medium drop shadow so the element looks like it sits above the page.

## The Demo
Open `index.html`. The main example is a profile card built with nothing but these
utilities:

```html
<div class="w-1/2 p-4 bg-white border rounded-lg shadow-md">
  <p class="text-xl font-bold text-slate-800">Aisha Khan</p>
  <p class="text-sm text-slate-800 mb-2">5th Semester, BSCS</p>
  ...
</div>
```

- `w-1/2` - the card takes up half the width of its parent (the `<body>`)
- `p-4` - padding on all sides of the card
- `bg-white` and `border` - a white background with a thin border
- `rounded-lg` - noticeably rounded corners
- `shadow-md` - a soft shadow that lifts the card visually off the page
- `text-xl font-bold` on the name - larger, bold text for the heading
- `text-sm` on the subtitle - smaller text than the body default
- `mb-2` - a small gap below the subtitle before the next line
- `text-center` on the closing line centers that text inside the card

Below the card, a small "Spacing Scale Reference" section places three boxes side by side
with `p-2`, `p-4`, and `p-8` so you can see the spacing scale grow, using `gap-4` on the
container to space the boxes apart from each other.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Tailwind from the Play CDN - nothing needs to be installed.

## Try It Yourself
Duplicate the profile card, change its text content, and give it `bg-slate-800` with
`text-white` instead of `bg-white` with `text-slate-800`, so you have one light card and
one dark card side by side. Try changing its width from `w-1/2` to `w-full` and compare.

## Key Takeaways
- The spacing scale is consistent: each step is `0.25rem`, and the same numbers work for
  `p-*`, `m-*`, and `gap-*`.
- `w-full` and fractional widths like `w-1/2` size elements relative to their parent.
- Typography utilities (`text-*`, `font-*`) control size, weight, and alignment
  independently of each other.
- Tailwind's color utilities use a `{property}-{color}-{shade}` pattern, with shades
  running from light (`50`) to dark (`900`).
- `border`, `rounded-lg`, and `shadow-md` are commonly combined to make a flat element
  look like a distinct card.
