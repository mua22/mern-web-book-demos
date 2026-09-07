# Mini Project 1: Modern Resume

**Difficulty:** Intermediate
**Technologies:** HTML, CSS only - no JavaScript, no build step, no external assets.
**Combines topics from:** [Module 1: HTML](../../01-html/), [Module 2: CSS](../../02-css/)
(selectors, box model, positioning, Flexbox, animations).

A single-page, print-friendly resume that deliberately uses four different CSS layout
techniques side by side - Flexbox, `float`, `position`, and `@keyframes` animation - so you
can see, in one real page, when each one is actually the right tool.

## What You'll Learn

- How to combine Flexbox, `float`, and `position` in one layout instead of treating them as
  competing alternatives
- A genuine, correct use case for the old `float` property (wrapping text around an image)
- How `position: sticky` keeps a sidebar in view without any JavaScript
- How to build a visual timeline using only `position: relative`/`absolute` and pseudo-elements
- How to animate a page on load and on hover using CSS `@keyframes` and `transition`
- Respecting `prefers-reduced-motion` and writing resume-appropriate `@media print` styles

## Architecture

The whole project is two files: `index.html` (semantic structure) and `style.css` (every
visual and layout rule). There is no JavaScript at all - every dynamic-looking effect
(the skill bars filling in, the header fading up, the avatar bobbing) is done in pure CSS.

The page is built from four regions, top to bottom:

```
.resume
├── header.resume-header      (name, avatar, contact info, "available" ribbon)
├── .resume-body
│   ├── aside.sidebar         (skills, languages, education, download button)
│   └── main.main-content     (about, experience timeline, projects grid)
└── footer.resume-footer
```

### Where each CSS technique is used, and why

| Technique | Used for | Why this technique and not another |
|---|---|---|
| **Flexbox** | The header's internal layout, the sidebar/main split (`.resume-body`), the contact list, each skill row, the tag chips, and the project card grid | Flexbox is for arranging a group of boxes along a line (or wrapping onto several). Every one of these is exactly that: a row or column of sibling elements that should share space or wrap. |
| **`float`** | Just one spot, on purpose: the small icon at the start of the "About Me" paragraph (`.about-icon`) | This is what `float` was originally designed for - letting inline text flow around a floated element, like a magazine wrapping a paragraph around a photo. Flexbox and Grid can't do that (they don't let text reflow around a sibling box), so for this one specific effect, `float` is still the right tool, not a legacy mistake. |
| **`position: sticky`** | `.sidebar` | The sidebar should stay visible while the (usually longer) main column scrolls past it. `sticky` does this with one line of CSS and no scroll-event JavaScript. |
| **`position: relative` + `position: absolute`** | The "Available for Hire" ribbon on the header, and the Experience timeline's connecting line and dots | Both are classic "overlay something at an exact spot inside its parent" problems. The parent gets `position: relative` to become the positioning context, and the child gets `position: absolute` with `top`/`left`/`right` offsets to place itself precisely without affecting the normal document flow around it. |
| **`@keyframes` animation** | The header content fading/sliding up on load (`fade-slide-up`), the avatar's gentle up-and-down bob (`bob`), and each skill bar filling to its target width (`fill-bar`) | These are all "animate automatically, once, on page load" effects, which is exactly what a CSS animation (as opposed to a `:hover` transition) is for. |
| **`transition`** | Hover states on project cards and the download button | A transition only needs a start and end state (normal vs. `:hover`) and no keyframes in between, so it's the simpler, more appropriate tool for these than `@keyframes`. |

### The skill bars, explained

Each skill bar's target width is set once, inline, as a CSS custom property:

```html
<div class="skill-bar-fill" style="--level: 92%; animation-delay: 0.2s;"></div>
```

A single `@keyframes fill-bar` rule in `style.css` animates `width` from `0` to
`var(--level, 0%)`. Because `--level` is different for every bar, one animation
definition can drive six different bars to six different widths - no JavaScript, and no
repeated CSS rules.

### The timeline, explained

`.timeline` (the `<ol>`) gets `position: relative` and an absolutely-positioned `::before`
pseudo-element that draws the vertical line. Each `.timeline-item` also gets
`position: relative`, and its own `::before` draws the small circular dot, offset to line
up against the shared vertical line. Nothing here needs an image or an SVG - it's four
lines of `position`/`background`/`border-radius`.

## How to Run

Open `index.html` directly in your browser - double-click it, or right-click it and choose
"Open with" your browser. There is no server, build step, or internet connection required;
every icon is an inline SVG and every color/gradient is plain CSS.

To see the print layout, use your browser's Print dialog (Ctrl+P / Cmd+P) and check the
print preview - the ribbon and download button are hidden, and the page is set up to flow
across print pages cleanly.

## Try It Yourself

- Change the value of one skill's `--level` and watch only that bar's animated fill change.
- Add a fourth entry to the Experience `<ol>` and confirm the timeline line and dots extend
  to include it automatically - you don't need to touch any position values by hand.
- Resize your browser below 800px wide to see the sidebar un-stick and stack above the main
  content (see the `@media (max-width: 800px)` block in `style.css`).
- Replace `.about-icon`'s `float: left` with `display: inline-block` and reload the page -
  notice the paragraph text no longer wraps around it, which is the exact difference
  `float` makes.

## Key Takeaways

- Flexbox, `float`, and `position` are not competing systems - real pages often need all
  three for different, specific jobs on the same page.
- `float` is not "deprecated" - it is simply no longer the default choice for whole-page
  layout, but it is still the simplest way to wrap text around an element.
- `position: sticky` and CSS `@keyframes` can replace a surprising amount of what people
  reach for JavaScript to do.
- A resume is a great small project for practicing layout because it naturally needs a
  header, a sidebar, a list-like section (skills), a timeline, and a card grid - a
  realistic cross-section of common UI patterns.
