# Variant 1: Plain HTML

**Difficulty:** Beginner
**Technologies:** HTML only. No `<style>` tag, no linked stylesheet, no `class`
attributes anywhere in the file.

This is the resume's content with zero styling - exactly what a browser renders using
only its built-in default stylesheet. It's the first of [three variants](../README.md) of
the same resume; see that page for the full comparison.

## What You'll Learn

- What a browser actually looks like with no CSS at all
- That headings, paragraphs, and lists already have sensible default spacing and sizing
  built in - CSS refines that, it doesn't create structure from nothing
- Why writing clean, semantic HTML first (correct heading levels, real `<ul>`/`<ol>`
  lists, `<a>` for links) matters *before* you add any styling at all

## The Demo

`index.html` contains the resume's full content - name, contact list, skills, languages,
education, an about paragraph, experience, and projects - using only semantic HTML
elements (`<header>`, `<section>`, `<article>`, `<h1>`-`<h3>`, `<p>`, `<ul>`, `<a>`). There
is no `<style>` tag and no linked CSS file, so every visual detail you see (heading sizes,
bullet points, link color, spacing between elements) comes entirely from the browser's
default, built-in stylesheet.

## How to Run

Open `index.html` directly in your browser. No installation, server, or internet
connection needed.

## Try It Yourself

- Open your browser's DevTools and inspect an `<h1>` or `<li>` element - look at the
  "Computed" or "Styles" panel to see the *default* CSS rules the browser applied, even
  though this page has no stylesheet of its own.
- Compare this page side by side with [Variant 2](../02-basic-css/) to see exactly what
  a small amount of CSS changes.

## Key Takeaways

- A browser without any CSS is not blank - it has its own default stylesheet (user agent
  styles) that already gives headings, paragraphs, and lists reasonable formatting.
- Good HTML structure is the foundation everything else builds on; CSS can't fix a page
  that uses the wrong elements for its content.
