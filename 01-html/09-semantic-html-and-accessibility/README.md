# 1.9: Semantic HTML & Accessibility

**Difficulty:** Beginner+
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- What "semantic HTML" means and why it beats building everything from `<div>`s
- The main layout tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<aside>`, `<footer>`
- How to write meaningful `alt` text for images
- Basic use of `aria-label` to label a region for assistive technology
- Why color contrast matters for readability

## Prerequisites
Topic 1.8: Forms

## Explanation
A **semantic** tag is one whose name describes the *meaning* of its content, not just
how it should look. `<p>` means "this is a paragraph"; `<div>` means nothing more than
"this is a generic box". Both can be styled identically with CSS, but only one tells the
browser, a screen reader, or a search engine what the content actually is.

Early web pages, and many beginners' pages today, are built almost entirely out of
`<div>` tags with class names like `class="header"` or `class="sidebar"` doing all the
explaining. This pattern is sometimes nicknamed **div-soup**. It works visually, but it
throws away information: a **screen reader** (software that reads a page aloud for
users who are blind or have low vision) cannot tell a `<div class="nav">` from a
`<div class="footer">`, because to the browser they are both just generic boxes. Search
engines have the same problem when deciding which part of a page is the real content.
And a future developer reading the code has to guess at structure that semantic tags
would have stated directly.

HTML provides a set of tags specifically for page structure:

- `<header>` - introductory content for a page or section, often a logo, title, or nav.
- `<nav>` - a block of navigation links.
- `<main>` - the primary content of the page. There should be exactly one per page.
- `<section>` - a thematic grouping of content, usually with its own heading.
- `<article>` - a self-contained piece of content that would make sense on its own, like
  a blog post or a news story.
- `<aside>` - content tangentially related to the main content, like a sidebar or a tip.
- `<footer>` - closing content for a page or section, like copyright info or links.

These tags are called **landmarks**, and screen readers let users jump directly between
them, which is a huge usability win over having to listen to the whole page top to
bottom.

Two more small but important habits: every `<img>` needs meaningful `alt` text describing
what the image shows (or conveys), because a screen reader reads the `alt` text aloud in
place of the image, and a user with images disabled sees that text instead. And when a
region needs a label but there's no visible heading for it, `aria-label="..."` can supply
one directly, as in `<nav aria-label="Main navigation">` (an "ARIA" attribute is one from
a set of attributes designed specifically to add accessibility information).

Accessibility isn't only about markup, either. **Color contrast**, the difference in
brightness between text and its background, has to be strong enough for the text to be
readable, particularly for users with low vision or color blindness. Light gray text on
a white background may look stylish, but it can be genuinely unreadable for some users;
prefer clearly dark text on a clearly light background (or vice versa).

## The Demo
Open `index.html` in a browser. It's a small blog post page built entirely from semantic
tags: a `<header>` containing the site title and a `<nav>` (with `aria-label="Main
navigation"` since the nav has no visible heading of its own), a `<main>` containing an
`<article>` (the blog post itself, broken into `<section>`s for each sub-topic) next to
an `<aside>` with a related tip, and a `<footer>` with copyright text. The article's
image uses descriptive `alt` text that explains what the image is illustrating, not just
its filename.

## How to Run
Open `index.html` directly in your browser (double-click it, or right-click → Open With).
No installation or server needed.

## Try It Yourself
Add a second `<article>` to `<main>`, right after the first one, representing a second
blog post with its own `<h2>` and at least one `<section>`. Give the new article's image
(if you add one) meaningful `alt` text describing what it shows.

## Key Takeaways
- Semantic tags describe meaning, not just appearance; `<div>`-only markup loses that
  information for screen readers, search engines, and other developers.
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` are
  landmarks that assistive technology can jump between directly.
- Write `alt` text that describes what an image conveys, not just its filename.
- Use `aria-label` to name a region when there's no visible heading to do it for you.
- Strong color contrast between text and background is a basic accessibility requirement.
