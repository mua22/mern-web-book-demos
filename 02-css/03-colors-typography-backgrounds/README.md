# 2.3: Colors, Typography & Backgrounds

**Difficulty:** Beginner
**Module:** [Module 2: CSS](../README.md)

## What You'll Learn
- Three ways to write a color in CSS: `hex`, `rgb()`, and `hsl()`
- What a font stack is and why it should end in a generic family
- The typography properties `font-size`, `font-weight`, `line-height`, and `letter-spacing`
- How to set `background-color` and paint a `background-image` with a CSS gradient
- The `background-position`, `background-size`, and `background-repeat` properties

## Prerequisites
Topic 2.2: The Box Model

## Explanation

CSS gives you several interchangeable ways to describe a color:

- **hex**: `#rrggbb`, six hexadecimal digits (0-9 and a-f) in pairs for red,
  green, and blue. `#ffffff` is white, `#000000` is black.
- **rgb()**: `rgb(red, green, blue)`, the same three channels written as
  plain numbers from 0 to 255, for example `rgb(255, 0, 0)` for pure red.
- **hsl()**: `hsl(hue, saturation, lightness)`. Hue is a position on a color
  wheel from 0 to 360 degrees (0 is red, 120 is green, 240 is blue).
  Saturation and lightness are percentages: low saturation looks gray, and
  lightness moves toward black at 0% or white at 100%. `hsl()` is often the
  easiest format for humans to reason about, since you can darken or
  lighten a color just by changing one number.

All three formats can describe the exact same color; which one you use is
mostly a matter of preference and convenience.

For text, a **font stack** is a comma-separated list of font names given to
`font-family`, like `Arial, Helvetica, sans-serif`. The browser tries each
name in order and uses the first one installed on the user's computer. The
list should always end with a **generic family** — `sans-serif`, `serif`, or
`monospace` — so that even if none of the named fonts are available, the
browser still picks something in the right general style. Fonts named this
way are called "web-safe" because they are common enough to need no
download.

Beyond the font itself, a few properties shape how text looks:

- `font-size` sets how large the text is (commonly in pixels, `16px`).
- `font-weight` controls boldness; `400` is normal weight and `700` is bold.
- `line-height` sets the vertical space each line of text occupies. A
  unitless value like `1.6` means "1.6 times the font-size," which keeps
  paragraphs from feeling cramped.
- `letter-spacing` adds (or removes) space between individual characters.

For backgrounds, `background-color` fills an element with a solid color, and
`background-image` can display an image *or* a gradient generated purely by
CSS, using functions like `linear-gradient(direction, color1, color2)` — no
image file required. `background-position` controls where that image or
gradient is anchored, `background-size` controls how big it renders, and
`background-repeat` controls whether it tiles.

## The Demo

`style.css` styles a small profile card (`index.html`):

- The card's background uses `linear-gradient(135deg, #6a11cb, #2575fc)` as
  its `background-image`, with `background-size`, `background-repeat`, and
  `background-position` also set for completeness.
- The avatar circle, name, title, and three tag pills each use a different
  color format (hex, `rgb()`, and `hsl()`) so you can compare them directly.
- The bio paragraph demonstrates `line-height: 1.6` for readability.
- The name uses `letter-spacing` and a bold `font-weight`.
- A "Font Stacks" section at the bottom shows three different web-safe font
  stacks (`sans-serif`, `serif`, `monospace`) applied to plain paragraphs.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

## Try It Yourself

In `style.css`, find the `.profile-card` rule and change the gradient's
direction from `135deg` to `to right`, and swap one of its two colors for a
color of your own choosing in any format you like (hex, `rgb()`, or
`hsl()`). Reload the page and see how the background changes.

## Key Takeaways
- `hex`, `rgb()`, and `hsl()` are three interchangeable ways to write the
  same color; `hsl()` is often easiest to adjust by hand.
- A font stack lists fallback fonts and should always end in a generic
  family like `sans-serif`.
- `font-size`, `font-weight`, `line-height`, and `letter-spacing` together
  control how readable and styled text looks.
- `background-image` can render a CSS gradient directly, with no image file
  needed.
- `background-position`, `background-size`, and `background-repeat` control
  how a background image or gradient is placed and scaled.
