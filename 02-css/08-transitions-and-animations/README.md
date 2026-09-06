# 2.8: Transitions and Animations

**Difficulty:** Intermediate
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- How the `transition` shorthand animates a property change smoothly
- What `transform` does, with `translate`, `scale`, and `rotate`
- How to define a reusable animation sequence with `@keyframes`
- How to run a `@keyframes` animation with the `animation` property
- Why `transform` is a common choice for things you want to animate

## Prerequisites
Topic 2.7: Responsive Design

## Explanation

By default, when a CSS property's value changes (say, because of a `:hover` state), the
browser applies the new value instantly. A **transition** tells the browser to animate
that change smoothly over time instead of snapping to it.

The `transition` shorthand takes, in order: which property to animate, how long the
animation should take (the duration), and a timing function describing how the speed
changes over that duration:

```css
.hover-button {
  transition: background-color 0.25s ease-in-out;
}
```

`ease-in-out` is one common timing function - it starts slow, speeds up, then slows down
again near the end, which tends to look more natural than a constant speed (`linear`).

Transitions only fire when a property's value actually changes, such as on `:hover`,
`:focus`, or a class being added/removed with JavaScript. They are not a way to make
something animate automatically and repeatedly on its own - for that, you need
`@keyframes`.

`transform` is a property that repositions, resizes, or rotates an element visually,
without changing its actual position in the page's layout. Three common transform
functions:

- `translate(x, y)` - moves the element by the given amount.
- `scale(n)` - resizes the element (`scale(1.1)` makes it 10% bigger).
- `rotate(deg)` - rotates the element by the given angle.

`transform` is a favorite property to animate because, unlike properties like `width` or
`margin`, changing it does not force the browser to recalculate the position of every
other element on the page - it tends to animate more smoothly, especially on slower
devices.

For an animation that plays automatically and can loop forever - not just in response to a
hover or a class change - use `@keyframes` together with the `animation` property.
`@keyframes` defines a named sequence of styles at different points in the animation
(from 0% to 100%, or using the `from` / `to` shorthand for just the start and end):

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

The `animation` shorthand here says: run the `spin` keyframes, take 1 second per cycle, use
a constant (`linear`) speed, and repeat forever (`infinite`).

## The Demo

`style.css` has three animated pieces:

- `.hover-button` uses the `transition` shorthand on `background-color` and `transform`, so
  hovering over it smoothly darkens its background and scales it up slightly
  (`transform: scale(1.08)`) instead of jumping straight to the hover state.
- `.spinner` is a circle (`border-radius: 50%`) with its top border colored differently
  from the rest. The `spin` `@keyframes` rotates it a full 360 degrees, and
  `animation: spin 1s linear infinite` plays that rotation forever at a constant speed,
  producing a classic loading spinner.
- `.badge` uses a `pulse` `@keyframes` that scales the badge up and slightly fades it at
  the midpoint (`50%`) before returning to normal, giving a breathing/pulsing effect that
  loops forever.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click -> Open With).
No installation or server needed.

## Try It Yourself

Add a `translate` to the button's hover transform, so it also shifts upward slightly on
hover, for example `transform: scale(1.08) translateY(-2px);`. Then create a new
`@keyframes` animation of your own - for example, a badge that shakes side to side - and
apply it to a new element.

## Key Takeaways
- `transition` smoothly animates a property change that happens in response to something,
  like `:hover`.
- `transform` (`translate`, `scale`, `rotate`) repositions or resizes an element visually
  without disturbing the layout of the rest of the page.
- `@keyframes` defines a named animation sequence with styles at different points in time.
- `animation` runs a `@keyframes` sequence, controlling its duration, speed curve, and
  whether/how many times it repeats (`infinite` for forever).
- Transforms are commonly preferred for animation because they tend to run more smoothly
  than animating layout-affecting properties.
