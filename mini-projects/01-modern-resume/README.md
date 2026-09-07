# Mini Project 1: Modern Resume

**Combines topics from:** [Module 1: HTML](../../01-html/), [Module 2: CSS](../../02-css/)

The exact same resume - the exact same HTML content, the same headings, the same
paragraphs, the same lists - built three times, with progressively more CSS. Reading them
in order is the fastest way to actually *see* what CSS is doing for you at each stage,
instead of just being told.

## The three variants

| # | Variant | Difficulty | What it adds |
|---|---|---|---|
| 1 | [Plain HTML](01-plain-html/) | Beginner | Nothing. No `<style>`, no linked stylesheet, no `class` attributes. Pure browser defaults. |
| 2 | [Basic CSS](02-basic-css/) | Beginner | Colors, fonts, spacing, borders, and the box model - the CSS you'd write after learning selectors and the box model, and nothing more. |
| 3 | [Modern CSS](03-modern-css/) | Intermediate | Flexbox layout, `float` (for real text-wrapping), `position` (sticky sidebar, absolute ribbon and timeline), and `@keyframes`/`transition` animations. |

## Why look at all three instead of just the finished one

It is easy to look at a finished, polished page and not really register which specific
CSS rule is responsible for which visual effect. Comparing three versions of the *same*
content makes that obvious by subtraction:

- Diff Variant 1 against Variant 2, and everything that changes is what basic
  colors/fonts/spacing/borders buy you.
- Diff Variant 2 against Variant 3, and everything that changes is what Flexbox,
  `float`, `position`, and animation buy you on top of that.

None of the three variants use JavaScript, a build step, or an external asset - the only
thing that ever changes between them is CSS (and in Variant 2/3, a few `class`/`id`
attributes added purely as CSS hooks).

## How to Run

Each variant is fully self-contained in its own folder. Open that variant's `index.html`
directly in your browser - no server, installation, or internet connection needed for any
of the three. See each variant's own `README.md` for what specifically to look at.

## Try It Yourself

- Open all three `index.html` files side by side (in separate browser tabs) and resize
  the window on each - notice only Variant 3 reflows into a single column, because only
  Variant 3 has a responsive layout at all.
- Copy Variant 1's `index.html` into a new file, and add just enough CSS to match
  Variant 2's look, without peeking at `02-basic-css/style.css` first.
- View source (or open DevTools) on all three and compare how much markup changed versus
  how much CSS changed - the HTML structure barely moves; almost everything is CSS.
