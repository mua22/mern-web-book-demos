# 1.2: Document Structure

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- The `<!DOCTYPE html>` declaration and why it belongs at the very top of every page
- The `html`, `head`, and `body` skeleton every HTML page is built from
- What `<meta charset>` and `<meta name="viewport">` do
- What the `<title>` tag controls
- How to write HTML comments and why they're useful

## Prerequisites
Topic 1.1: How the Web Works

## Explanation

Every HTML page, no matter how simple or complex, is built on the same basic
skeleton. Once you know this skeleton, you can recognize the structure of
any web page you look at.

**`<!DOCTYPE html>`** is the very first line of an HTML file. It is a
declaration, not a regular tag (it has no closing tag), and it tells the
browser "interpret this file as modern HTML5." Without it, some browsers
fall back to an old compatibility mode that can render pages inconsistently.

After the doctype comes the **`<html>`** element, called the **root
element** because every other element on the page is nested inside it. It
commonly carries a `lang` attribute (for example `lang="en"`), which tells
browsers and screen readers what language the content is written in.

Inside `<html>` there are exactly two main sections:

- **`<head>`** contains information *about* the page rather than content
  shown directly on it: the page's title, its character encoding, viewport
  settings, links to stylesheets, and so on.
- **`<body>`** contains everything that is actually visible on the page:
  headings, paragraphs, images, links, buttons — all of it.

Inside `<head>`, three tags matter most for a beginner:

- **`<meta charset="UTF-8">`** tells the browser which character encoding to
  use when reading the file's text. UTF-8 is the standard choice because it
  correctly handles virtually every character in every language, plus
  symbols and emoji. Skipping this can cause special characters to render as
  garbled text.
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**
  controls how the page displays on mobile devices. It tells the browser to
  match the page's width to the device's actual screen width, and to start
  at normal (100%) zoom, rather than rendering the page as a shrunken-down
  desktop layout. Almost every modern page includes this line.
- **`<title>`** sets the text shown in the browser tab and used for
  bookmarks, and it's usually what appears as the clickable headline in
  search engine results.

Finally, **comments**. Anything written as `<!-- like this -->` is completely
ignored by the browser — it never appears on the page. Comments let you
leave notes in your code, either to explain something to other people
reading it, or as a reminder to your future self. One important rule: a
comment ends at the *first* `-->` it finds, so never write `-->` inside the
text of a comment, or you'll accidentally close it early.

## The Demo

Open `index.html` in a text editor (not just a browser) to read it properly.
The file is deliberately over-commented: nearly every line has an
explanation directly above or beside it, covering the doctype, the `html`
tag, the `head` section with its three meta/title lines, and the `body`.
This is the minimal, correct skeleton you'll reuse as the starting point for
every HTML page you write from now on.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed. For this topic, also open
the file in a plain text editor (Notepad, VS Code, etc.) so you can read the
comments, since comments are invisible in the browser itself.

## Try It Yourself

Make a copy of `index.html`, remove the `<meta name="viewport" ...>` line
from your copy, and open it in your browser. Then use your browser's device
toolbar (in DevTools, usually a small phone/tablet icon) to preview it at a
mobile screen size, and compare it against the original file with the
viewport tag still in place. Notice the difference in how the text scales.

## Key Takeaways
- Every HTML page starts with `<!DOCTYPE html>`, followed by `<html>` containing a `<head>` and a `<body>`.
- `<head>` holds metadata (not shown on the page); `<body>` holds everything visible.
- `<meta charset="UTF-8">` and the viewport meta tag are standard on nearly every modern page.
- `<title>` controls the browser tab text and search engine result headline.
- Comments (`<!-- ... -->`) are ignored by the browser and are only for people reading the code.
