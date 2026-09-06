# 4.1: Setup & the Utility-First Concept

**Difficulty:** Beginner
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- What "utility-first" CSS means
- How Tailwind's approach differs from writing your own CSS rules (Module 2) and from
  using Bootstrap's pre-built components (Module 3)
- How to add Tailwind to a page with the Play CDN, with no build step
- Your first utility classes: `p-4`, `bg-blue-500`, `text-white`, `rounded`, `font-bold`
- Why a utility-first page does not need a separate CSS file

## Prerequisites
Module 1: HTML, Module 2: CSS

## Explanation
So far you have styled pages in two ways. In Module 2 (CSS) you wrote your own rules in a
`style.css` file, giving elements a class name and then deciding what that class name
means (`.card { padding: 1rem; background: blue; }`). In Module 3 (Bootstrap) you used
pre-built components: a class like `.btn` or `.card` already carries a whole bundle of
styling decided by the framework, and you mostly just apply it.

Tailwind CSS takes a third approach, called **utility-first**. Instead of a class that
means "a card" or "a button", Tailwind gives you a large set of small classes that each
do exactly one thing: `p-4` adds padding, `bg-blue-500` sets a background color,
`text-white` sets text color, `rounded` rounds the corners, `font-bold` makes text bold.
None of these classes know anything about "cards" or "buttons" - you build up whatever
component you need by combining several of them directly in your HTML.

This has a direct trade-off compared to what you already know:

- Compared to **plain CSS**, you stop inventing class names and writing rules in a
  separate file. You style elements by adding classes straight to the HTML tag, and the
  utility classes are already defined by Tailwind - you never write `p-4 { padding: 1rem; }`
  yourself.
- Compared to **Bootstrap**, you are not limited to the specific components the framework
  shipped (`.card`, `.navbar`, `.btn-primary`). You assemble your own look from small
  pieces, which gives you more control over the exact result, at the cost of your HTML
  tags carrying more classes.

To use Tailwind on a page without installing anything or setting up a build tool, you add
one script tag from the Tailwind Play CDN to your `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

This is meant for learning and quick demos (a real project would normally use a proper
build step, which later topics in this module cover), but it gives you every Tailwind
utility class immediately, with nothing to install.

## The Demo
Open `index.html`. In the `<head>`, the only thing loading any styling is the Play CDN
script tag - there is no `<link rel="stylesheet">` anywhere in the file, because there is
no separate CSS file to link.

The main example is a single `<div>` styled entirely with five utility classes:

```html
<div class="p-4 bg-blue-500 text-white rounded font-bold">
  Hello, Tailwind!
</div>
```

- `p-4` - adds padding on all four sides of the box
- `bg-blue-500` - gives the box a medium blue background
- `text-white` - makes the text inside the box white
- `rounded` - rounds the box's corners slightly
- `font-bold` - makes the text bold

A second box below it uses `bg-slate-100` instead of `bg-blue-500`, and leaves out
`text-white`, showing that swapping or dropping a single utility class changes exactly
one thing about the element, nothing else.

## How to Run
Open `index.html` directly in your browser. An internet connection is required to load
Tailwind from the Play CDN - nothing needs to be installed.

## Try It Yourself
Add a third box below the second one. Give it a `bg-green-500` background, `text-white`,
`p-4`, `rounded`, and `font-bold`, then try removing `rounded` and reloading the page to
see exactly what that one class was doing.

## Key Takeaways
- Utility-first means composing small, single-purpose classes directly in your HTML
  instead of writing your own CSS rules or relying on pre-built components.
- The Play CDN script tag (`<script src="https://cdn.tailwindcss.com"></script>`) gives a
  page every Tailwind utility class with no installation or build step.
- `p-4`, `bg-blue-500`, `text-white`, `rounded`, and `font-bold` are each responsible for
  exactly one visual property.
- A page styled with Tailwind utilities needs no separate CSS file.
