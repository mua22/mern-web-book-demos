# 7.4: Effects and Animations

**Difficulty:** Intermediate
**Module:** [Module 7: jQuery](../README.md)

## What You'll Learn
- Instantly showing or hiding elements with `.hide()` / `.show()`
- Animating opacity with `.fadeIn()`, `.fadeOut()`, and `.fadeToggle()`
- Animating height with `.slideToggle()` to build a collapsible panel
- That `.animate()` exists for animating other CSS properties directly

## Prerequisites
Topic 7.3: Events.

## Explanation

### Instant vs. animated visibility
`.hide()` and `.show()` change whether an element is visible, instantly, with no animation
— behind the scenes this is close to setting the CSS `display` property directly, which is
exactly what plain CSS already does. jQuery's animated methods below do the same basic job
(making something appear or disappear) but spread the change out over time so it's visible
to the user as motion instead of a sudden jump.

### Fading
- `.fadeIn()` animates an element from invisible to fully visible by increasing its
  opacity over time.
- `.fadeOut()` does the reverse.
- `.fadeToggle()` picks whichever direction makes sense automatically: if the element is
  currently hidden, it fades in; if it's currently visible, it fades out. This saves you
  from writing an if/else that checks the current state yourself.

### Sliding
`.slideToggle()` works like `.fadeToggle()` but animates the element's height instead of
its opacity — it grows open from nothing, or shrinks closed to nothing. This is the classic
way to build a collapsible section or accordion, because it reads visually as the content
"sliding" open or shut, which is exactly the effect this demo's FAQ list uses.

All of these methods accept an optional duration in milliseconds and an optional callback
function to run once the animation finishes, e.g. `$(...).slideToggle(200, function () {
... });` — this demo leaves both at their defaults.

### `.animate()`, briefly
For anything the shortcut methods above don't cover, jQuery has a lower-level `.animate({
... })` method that can animate almost any numeric CSS property — width, margin, a custom
position, and more — to whatever target values you specify. It is not used in this demo,
but it's worth knowing it exists once `.fadeToggle()` and `.slideToggle()` aren't flexible
enough for something you're building.

## The Demo
Open `index.html`: three FAQ questions, each an independent `<button class="faq-question">`
immediately followed by its own `<div class="faq-answer">`, which is hidden by default with
plain CSS (`display: none` in `style.css`).

In `script.js`:

- `$('.faq-question').on('click', function () { $(this).next('.faq-answer').slideToggle();
  });` — clicking any question finds the very next sibling element with `.next(...)`
  (guaranteed to be that question's own answer, thanks to the HTML structure) and slides it
  open or closed.
- A separate, smaller `#fade-demo-btn` toggles a line of text with
  `$('#fade-demo-text').fadeToggle();`, to see the fade effect in isolation, apart from the
  accordion.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
jQuery from the CDN (and, for 7.5, to call the JSONPlaceholder API).

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with:
```
node test.js
```
from inside this folder (or run every topic's tests at once from the repo root with
`npm test`).

Because animations run over time, the test sets `$.fx.off = true` before triggering any
clicks — a real jQuery setting that makes every animation apply its end state immediately,
so the test can check the *intended* result without waiting on real timers.

## Try It Yourself
Add a fourth FAQ item to `index.html` (a new `.faq-item` with its own `.faq-question` and
`.faq-answer`) and confirm, without changing `script.js` at all, that clicking it also
slides its answer open — proving the existing code already handles any number of items.

## Key Takeaways
- `.hide()` / `.show()` change visibility instantly; the fade and slide methods animate
  the same basic change over time
- `.fadeToggle()` and `.slideToggle()` each pick the correct direction (in or out)
  automatically based on the element's current state
- `.slideToggle()` is the standard way to build an accordion or collapsible panel
- `.animate({ ... })` exists for animating arbitrary CSS properties beyond what the
  shortcut methods cover
- Automated tests can use `$.fx.off = true` to make animations resolve immediately
