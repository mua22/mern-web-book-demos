# 4.5: State Variants

**Difficulty:** Intermediate
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- How Tailwind's state prefixes (`hover:`, `focus:`, `active:`, `disabled:`) apply a
  utility class only in that specific state
- How to combine several state-prefixed classes on one element
- How Tailwind's default `dark:` variant works with zero configuration
- The difference between an interaction state (hover, focus) and an environment
  preference (dark mode)

## Prerequisites
Topics 4.1-4.4 (setup, core utilities, flex/grid utilities, responsive design)

## Explanation

So far, every utility class you've used applies all the time. Tailwind also has a set of
**state variants**: prefixes you stick in front of any utility so that it only applies
under a specific condition. The pattern is always `state:utility`, for example:

```html
<button class="bg-blue-600 hover:bg-blue-700">Click me</button>
```

Here `bg-blue-600` is the button's normal background, and `hover:bg-blue-700` replaces it
with a darker blue only while the mouse is hovering over the button. The four you'll use
most often for interactive elements are:

- **`hover:`** &mdash; applies while the pointer is over the element.
- **`focus:`** &mdash; applies while the element has keyboard/click focus (for example, a
  button that was just clicked, or an input the user has tabbed into). This matters for
  accessibility: keyboard users rely on a visible focus state to know where they are on
  the page.
- **`active:`** &mdash; applies only during the moment the mouse button is actually held
  down on the element, giving a "pressed" feel.
- **`disabled:`** &mdash; applies when the element has the HTML `disabled` attribute, which
  is useful for dimming a button and showing a "not allowed" cursor.

You can stack as many of these as you like on the same element, and they layer on top of
whatever your normal (unprefixed) classes already set.

Tailwind also ships a **`dark:`** variant for dark mode. By default, Tailwind uses the
`media` strategy, which means `dark:` classes activate automatically based on the
visitor's operating system or browser color scheme preference &mdash; there is no toggle
button, no JavaScript, and no configuration file needed for this to work:

```html
<div class="bg-white text-black dark:bg-slate-900 dark:text-white">
  ...
</div>
```

On a machine set to light mode this renders with a white background and black text; on a
machine set to dark mode, the `dark:` classes take over instead. To see it yourself, change
your operating system's or browser's appearance setting to dark (or light) and reload
`index.html`.

## The Demo

`index.html` has two parts:

1. **A button row** demonstrating `hover:`, `focus:`, `active:`, and `disabled:`. The
   first button changes background color on hover, shows a visible focus ring when
   focused (try clicking it or tabbing to it), and darkens and shrinks slightly while
   actively being clicked. The second button is marked `disabled` in HTML and uses
   `disabled:opacity-60 disabled:cursor-not-allowed` to look and behave like it's turned
   off.
2. **A card** using `dark:bg-slate-800`, `dark:text-white`, and related classes, which
   changes appearance automatically based on your system's dark mode setting, with no
   extra code beyond those classes.

## How to Run

Open `index.html` directly in your browser. An internet connection is required to load
Tailwind from the CDN.

## Try It Yourself

Add a third button that starts a solid green (`bg-green-600`) and add a `focus:ring-4
focus:ring-green-300` focus ring to it, matching the pattern used on the first button.
Then switch your OS or browser to dark mode and reload the page to confirm the dark-mode
card responds automatically.

## Key Takeaways
- State variants follow the pattern `state:utility` and only apply the utility under that
  condition.
- `hover:`, `focus:`, `active:`, and `disabled:` cover the most common interactive states.
- `focus:` states matter for accessibility, not just visual polish.
- Tailwind's default `dark:` strategy is `media`: it follows the OS/browser preference
  automatically, with no JavaScript or config required.
- Multiple state-prefixed classes can be combined on a single element.
