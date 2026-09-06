# 1.10: SEO Basics

**Difficulty:** Beginner+
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- What SEO is and why it starts with plain HTML, before any tools or plugins
- The role of `<title>` and `<meta name="description">` in search results
- Why a page should have exactly one `<h1>` and a logical heading hierarchy below it
- How `<link rel="canonical">` avoids duplicate-content problems
- What Open Graph tags and the `robots` meta tag do

## Prerequisites
Topic 1.9: Semantic HTML & Accessibility

## Explanation
**SEO** (Search Engine Optimization) is the practice of structuring a page so that
search engines can understand it well and rank it fairly for relevant searches. A large
part of basic SEO is simply writing clean, honest HTML; no special tool is required to
get the fundamentals right.

The `<title>` tag is arguably the single most important SEO tag on a page. It sets the
text shown in the browser tab, and far more importantly, it is usually the clickable blue
headline shown in a search engine's results list. Every page on a site should have its
own unique, descriptive title, not a generic one repeated everywhere.

`<meta name="description" content="...">` supplies the short summary a search engine
often displays underneath the title in its results. It doesn't directly affect ranking,
but a clear, honest description written by you (rather than one a search engine has to
guess by scraping your text) makes users more likely to click your result over a
competitor's.

Heading hierarchy also matters: a page should have exactly one `<h1>`, describing its main
topic, and every heading below it should nest logically: `<h2>` for major sections,
`<h3>` only for a sub-point within an `<h2>`, and so on, without skipping levels. Search
engines use this outline to understand what the page is really about and how its content
is organized, the same way a reader skimming a table of contents would.

`<link rel="canonical" href="...">` tells search engines the one "official" URL for a
page's content, even when the same content is technically reachable at more than one
address (for example, with or without a tracking parameter in the URL). Without a
canonical tag, a search engine might treat those as separate, competing pages and split
their ranking value between them.

**Open Graph tags** (`og:title`, `og:description`, and others, all starting with `og:`)
control how a page appears when it's shared as a link on social media platforms like
Facebook or LinkedIn: the headline, summary, and image shown in the preview card. They
don't affect search rankings directly, but they matter for how a shared link looks and
performs.

Finally, `<meta name="robots" content="...">` gives instructions directly to search
engine crawlers. `"index, follow"` (the default behavior even with no tag at all) means
"you may list this page in search results, and you may follow its links to discover
other pages." A page you don't want listed, like an internal staging page, would instead
use `"noindex, nofollow"`.

## The Demo
Open `index.html` in a browser, but the real content to study here is its `<head>`
section: every tag discussed above appears once, each with an explanatory HTML comment
directly above it explaining what that tag does and why it's there. The body of the page
is a short, deliberately simple bread-baking guide that demonstrates a single `<h1>`
followed by a logical `<h2>`/`<h3>` hierarchy, plus one image with descriptive `alt` text.

## How to Run
Open `index.html` directly in your browser (double-click it, or right-click → Open With).
Then use "View Page Source" (or your browser's DevTools) to look closely at the `<head>`
section and read each comment next to its tag.

## Try It Yourself
Add an `og:image` meta tag to the `<head>` (following the pattern of the existing
`og:title` and `og:description` tags) pointing at the same image URL already used in the
`<img>` tag in the body, and add a one-line HTML comment above it explaining what it's
for.

## Key Takeaways
- `<title>` and `<meta name="description">` are what users actually see and click on in
  search results, so write them like ad copy, not filler.
- A page should have exactly one `<h1>`, and every heading below it should nest without
  skipping levels.
- `<link rel="canonical">` prevents duplicate URLs from splitting a page's search ranking.
- Open Graph tags control how a page looks when shared on social media, separately from
  how it ranks in search.
- `meta name="robots"` gives direct instructions to search engine crawlers about
  indexing and link-following.
