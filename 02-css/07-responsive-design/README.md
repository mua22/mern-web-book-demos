# 2.7: Responsive Design

**Difficulty:** Intermediate
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- What `@media` queries are and how to write one
- The difference between mobile-first and desktop-first approaches
- Why the viewport meta tag is required for responsive pages to work on phones
- Fluid units (`%`, `rem`, `vw`/`vh`) versus fixed pixel values
- How to combine media queries with Flexbox or Grid to reflow a layout

## Prerequisites
Topic 2.6: CSS Grid

## Explanation

**Responsive design** means a page adjusts its layout depending on the size of the screen
it is being viewed on, instead of looking broken or tiny on a phone and cramped on a
desktop monitor.

The main tool for this is the **media query**, written with `@media`. A media query wraps
a block of CSS rules that only apply when a condition is true - most commonly, a condition
about the browser window's width:

```css
@media (min-width: 768px) {
  .cards {
    flex-direction: row;
  }
}
```

This rule only takes effect once the viewport (the visible browser area) is at least 768
pixels wide. The specific width where a layout changes, like `768px` here, is called a
**breakpoint**.

There are two common ways to organize media queries:

- **Mobile-first**: write your base CSS (with no media query) for the smallest screens,
  then use `min-width` queries to add or change styles as the screen gets bigger. This is
  the approach used in this demo, and it is generally recommended, since it forces you to
  design a working layout for small screens rather than treating them as an afterthought.
- **Desktop-first**: write your base CSS for large screens, then use `max-width` queries to
  override styles as the screen gets smaller.

Both work, but mixing the two styles in the same project tends to get confusing, so pick
one approach and stick with it.

None of this works correctly on an actual phone without the **viewport meta tag** in your
HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without it, mobile browsers assume your page was built for a wide desktop screen and
"zoom out" to fit it all in, which makes media queries behave as if the screen were much
wider than it really is. You saw this tag back in Module 1 - it is worth remembering why
it matters now that media queries depend on it.

Responsive design also favors **fluid units** over fixed pixel values, since fluid units
scale instead of staying locked to one exact size:

- `%` - a percentage of the parent element's size.
- `rem` - a multiple of the root (`<html>`) element's font size, so it scales if a user
  changes their browser's default text size.
- `vw` / `vh` - a percentage of the viewport's width or height (`1vw` = 1% of the current
  viewport width).

## The Demo

`index.html` has three `.card` elements inside a `.cards` container. In `style.css`, the
base (mobile-first) rule sets `.cards` to `flex-direction: column`, so the cards stack
vertically by default - this is what phones see. Inside the `@media (min-width: 768px)`
block, `.cards` switches to `flex-direction: row` and each `.card` gets `flex: 1 1 33%`, so
on wider screens the three cards sit side by side and share the row roughly evenly.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click -> Open With).
No installation or server needed.

Resize your browser window narrower than 768px, or use your browser's device toolbar, to
see the layout respond.

## Try It Yourself

Add a second breakpoint at `1100px` that increases the gap between cards and gives the page
more side padding on very wide screens, using another `@media (min-width: 1100px)` block.

## Key Takeaways
- `@media` queries apply CSS only when a condition, usually about screen width, is true.
- Mobile-first means starting with small-screen styles and adding `min-width` overrides for
  larger screens; desktop-first is the reverse with `max-width`.
- The viewport meta tag is required for media queries to behave correctly on real phones.
- Fluid units (`%`, `rem`, `vw`/`vh`) scale with their context; fixed pixels do not.
- Combining a media query with Flexbox or Grid is the standard way to reflow a layout
  between screen sizes.
