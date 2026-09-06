# 1.3: Text Formatting

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- Headings `h1`-`h6` and why hierarchy matters
- Paragraphs with `p`
- The difference between `strong`/`b` and `em`/`i`
- Line breaks with `br` and dividers with `hr`
- Quoting text with `blockquote`, and showing code with `code` and `pre`

## Prerequisites
Topic 1.2: Document Structure

## Explanation

HTML gives you specific tags for specific kinds of text content, and using
the right one matters, not just for how the page looks, but for how well
tools like screen readers and search engines understand it.

**Headings** (`<h1>` through `<h6>`) create a hierarchy in your content, like
a table of contents. `<h1>` is the most important heading, typically used
once per page as the main title, and `<h6>` is the least important. Skipping
levels (going from an `<h1>` straight to an `<h4>`, for example) or using
headings just because you want bigger text is considered bad practice —
headings should describe the actual structure of your content.

**Paragraphs** (`<p>`) wrap blocks of regular text. Browsers automatically
add spacing above and below each paragraph.

For bold and italic text, HTML actually gives you two tags for each, and the
difference is about meaning versus appearance:
- **`<strong>`** marks text as important. It happens to render bold by
  default, but a screen reader may also announce it differently to convey
  that importance.
- **`<b>`** also renders bold, but carries no extra meaning — it's a pure
  visual style, useful for things like keywords in a summary.
- **`<em>`** marks text as emphasized, as if you'd stress that word out loud.
  It renders in italics by default.
- **`<i>`** also renders in italics, but with no emphasis meaning — commonly
  used for terms, titles of creative works, or foreign-language phrases.

**`<br>`** forces a line break inside a block of text, without starting a
new paragraph. It's a void element (it has no closing tag and no content).
**`<hr>`** draws a horizontal rule, a visual dividing line, typically used to
separate distinct sections of content. It's also a void element.

**`<blockquote>`** is for quoting a chunk of text from another source; it's
not meant to be used just for indenting or styling text that isn't actually
a quote.

Finally, for showing code: **`<code>`** marks a short, inline piece of code,
a filename, or a command within a normal sentence. **`<pre>`** (short for
"preformatted") preserves exactly the whitespace and line breaks you typed,
which is essential for multi-line code — normal HTML collapses extra spaces
and line breaks, but `<pre>` doesn't. The two are typically combined, as
`<pre><code>...</code></pre>`, to show a properly formatted, multi-line code
sample.

## The Demo

`index.html` walks through every tag covered above, one section at a time,
each with an `<hr>` divider and a plain-text "Label:" note explaining what
you're looking at, so you can match the rendered output to the underlying
tag.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

## Try It Yourself

Add a new section to `index.html` (copy the pattern used for the other
sections) containing an `<h2>` title, a short `<blockquote>` with your
favorite quote, and a `<pre><code>` block with a 2-3 line snippet of code
in any language you like. Open the file in your browser to check it renders
the way you expect.

## Key Takeaways
- Use headings (`h1`-`h6`) to represent real structure and hierarchy, not just to resize text.
- `strong`/`em` carry meaning; `b`/`i` are purely visual.
- `br` breaks a line without starting a new paragraph; `hr` draws a dividing line.
- `blockquote` is for quoting another source's text.
- `code` is for short inline code; `pre` preserves whitespace, and the two are often combined for multi-line code samples.
