# 1.4: Links & Navigation

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- The `<a>` tag and its `href` attribute
- Absolute vs. relative paths
- Opening links in a new tab with `target="_blank"`, and why to pair it with `rel="noopener"`
- `mailto:` and `tel:` links
- Linking to a section within the same page using `id` and `#fragment`

## Prerequisites
Topic 1.3: Text Formatting

## Explanation

Links are what make the web a "web" — pages connected to other pages. In
HTML, a link is created with the **`<a>`** (anchor) tag, and the destination
is set with its **`href`** attribute:

```html
<a href="https://example.com">Visit Example</a>
```

The text between the opening and closing `<a>` tags is what the visitor
clicks; `href` is where clicking it takes them.

There are two kinds of paths you can put in `href`:

- An **absolute** path is a complete address, including the protocol, such
  as `https://developer.mozilla.org/`. It always points to the same place,
  no matter where the link itself lives.
- A **relative** path only describes how to get from the current page to
  another file, such as `page2.html` (meaning "a file called `page2.html` in
  this same folder") or `../images/photo.png` (meaning "go up one folder,
  then into `images`"). Relative paths are what you use to link between
  pages within your own site, since they keep working even if the whole
  site moves to a different domain.

Adding **`target="_blank"`** to a link makes it open in a new browser tab
rather than replacing the current page. It's commonly used for links that
lead away from your site. When you use it, you should also add
**`rel="noopener"`**. Without `rel="noopener"`, the newly opened page can, in
some browsers, gain limited access back to your original page's JavaScript
`window` object, which is a known security concern. Adding
`rel="noopener"` prevents that, so the two attributes are almost always used
together.

Two special-purpose link types:

- **`mailto:`** links, like `<a href="mailto:someone@example.com">`, open the
  visitor's default email application with a new message pre-addressed to
  that address.
- **`tel:`** links, like `<a href="tel:+15551234567">`, start a phone call
  when opened on a device that can place calls, such as a smartphone.

Finally, you can link to a specific spot *within the same page*. Give any
element an **`id`** attribute, for example `<h2 id="section-two">`, and then
link to it with a `#` followed by that id: `<a href="#section-two">`. This
is exactly how "jump to section" or "back to top" links, and in-page tables
of contents, work.

## The Demo

`index.html` opens with a table of contents made entirely of jump links,
each pointing to an `id` further down the same page. Following each section
are examples of absolute vs. relative links, a `target="_blank"` link paired
with `rel="noopener"`, a `mailto:` link, a `tel:` link, and a relative link
to a second file, `page2.html`, which links back to `index.html`.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

## Try It Yourself

Add a new section to `index.html` with its own `id`, and add a matching
entry to the table of contents at the top of the page that jumps to it.
Inside your new section, add a `mailto:` link using your own email address
and check that clicking it opens your email app correctly addressed.

## Key Takeaways
- `<a href="...">` creates a link; the visible text goes between the tags.
- Relative paths (`page2.html`) point to files near the current page; absolute paths (`https://...`) point to a fixed address anywhere.
- `target="_blank"` opens a link in a new tab, and should be paired with `rel="noopener"` for security.
- `mailto:` and `tel:` links trigger email and phone actions instead of loading a page.
- An `id` attribute plus a `#fragment` link lets you jump to any spot on the same page.
