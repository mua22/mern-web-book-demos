# 1.5: Images & Media

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- The `img` tag and its `src`, `alt`, `width`, and `height` attributes
- Grouping an image with a caption using `figure` and `figcaption`
- Playing audio with the `audio` tag and the `controls` attribute
- Playing video with the `video` tag and the `controls` attribute
- Why `alt` text matters for accessibility and for when images fail to load

## Prerequisites
Topic 1.4: Links & Navigation

## Explanation

HTML has dedicated tags for embedding images, audio, and video directly on
a page, without needing any extra software.

**`<img>`** displays an image. It's a void element (no closing tag, no
content between tags) and relies entirely on its attributes:

- **`src`** points to the image file, either a local file (like
  `image.svg`, sitting in the same folder as the page) or a full URL to an
  image hosted elsewhere.
- **`alt`** provides a short text description of the image. This text is
  read aloud by screen readers for visually impaired visitors, and it's also
  what displays if the image fails to load for any reason. Every meaningful
  image should have a clear, descriptive `alt` attribute.
- **`width`** and **`height`** set the image's display size, in pixels. Even
  though these can also be set with CSS, specifying them directly on the
  `img` tag lets the browser reserve the right amount of space for the image
  before it finishes loading, which prevents the rest of the page from
  visibly shifting around as images load in.

**`<figure>`** groups an image (or other media) together with
**`<figcaption>`**, a caption describing it. This is the semantically
correct way to pair an image with a caption — as opposed to just placing a
paragraph next to an image — because it tells the browser and any
accessibility tools that the two belong together as one unit.

**`<audio>`** embeds a sound file, and **`<video>`** embeds a video file.
Both work similarly to `<img>` in that they take a `src` pointing to the
media file, but they also support the **`controls`** attribute, which adds
the browser's built-in play/pause/volume/seek bar. Without `controls`, the
media would load but the visitor would have no way to interact with it. Any
text placed between the opening and closing `audio`/`video` tags (like
"Your browser does not support..." in the demo) only displays if the
browser is too old to support the tag at all.

## The Demo

`index.html` covers, in order: a plain `<img>` pointing at `image.svg` (a
small house icon built by hand, saved directly in this folder), the same
image wrapped in a `<figure>` with a `<figcaption>`, an `<audio>` player,
and a `<video>` player.

`image.svg` is a hand-made SVG file: it's a plain text file describing
shapes (a rectangle for the walls, a triangle for the roof, and a couple of
small rectangles for the door and windows) rather than a photo. You can open
`image.svg` in a text editor to see exactly how it's built — SVG markup is
readable, unlike a photo file.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation needed.

Note: the image sections work completely offline, since `image.svg` is a
local file in this folder. The audio and video sections load short public
sample files from MDN (Mozilla's developer documentation site), so those two
sections specifically need an internet connection to actually play; if
you're offline, everything else on the page will still work normally.

## Try It Yourself

Open `image.svg` in a text editor and change one of the color values (for
example, change `fill="#f4a259"` to a different hex color like `#ff0000`).
Save the file, then refresh `index.html` in your browser to see your color
change reflected in both places the image appears on the page.

## Key Takeaways
- `img` needs `src` and `alt`; `alt` matters for accessibility and as a fallback if the image fails to load.
- `width` and `height` on an image help the page avoid layout shifting while images load.
- `figure` and `figcaption` are the correct way to pair an image with a caption.
- `audio` and `video` both need the `controls` attribute to show playback controls to the visitor.
- SVG images are text-based and can be opened and edited directly in a text editor.
