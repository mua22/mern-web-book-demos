# 4.8: Bootstrap vs. Tailwind

**Difficulty:** Intermediate
**Module:** [Module 4: Tailwind CSS](../README.md)

## What You'll Learn
- How the same UI component looks built in Bootstrap versus built in Tailwind
- The practical tradeoffs between a component-based framework and a utility-first one
- How each approach affects bundle size, customization, and learning curve
- A rule of thumb for choosing between them on a real project

## Prerequisites
Module 3 (Bootstrap) and Topics 4.1-4.7 (Tailwind)

## Explanation

You've now built real things in both frameworks, so this topic is not about learning new
syntax &mdash; it's about comparing the two approaches directly, using the same small
component: a pricing card with a title, a price, a feature list, and a button.

**Bootstrap** ships pre-built components. A card is `.card` / `.card-body` /
`.card-title`, and a styled button is `.btn.btn-primary`. You get a reasonable, consistent
look almost for free, and there is very little to decide: Bootstrap has already made most
of the visual decisions (border radius, shadow, spacing, font weights) for you.

**Tailwind** ships no components at all &mdash; only utilities. The same card is built
from raw building blocks: `bg-white`, `shadow`, `rounded-lg`, `p-6`, and so on. Nothing is
free, but nothing is fighting you either: every visual detail is something you explicitly
chose, which makes deep customization (a slightly different shadow, an unusual spacing
scale, a totally custom look) far more straightforward than in Bootstrap, where you often
end up overriding built-in component styles.

That difference shows up in a few concrete tradeoffs:

- **Bundle size and performance.** A default Bootstrap CSS file ships all of its
  components whether you use them or not, unless you set up its Sass build and manually
  exclude unused pieces. A properly configured Tailwind build (topics 4.6-4.7) only
  includes the utility classes your project actually uses, which is usually much smaller
  in a finished production build. (Note: the Play CDN version used elsewhere in this
  module, including on this very page, ships the opposite way &mdash; it sends *all*
  utilities and compiles in the browser, which is only appropriate for demos, never
  production.)
- **Ease of customization.** Restyling a Bootstrap button beyond its theme variables often
  means overriding CSS that Bootstrap already wrote. Restyling a Tailwind element just
  means changing which utility classes you wrote in the first place.
- **Learning curve.** Bootstrap is faster to get *a* working, decent-looking result from on
  day one, because the component decisions are made for you. Tailwind asks you to know (or
  look up) more individual utility names up front, but that knowledge transfers directly
  to any layout you build afterward, since you're not learning a new component's specific
  API each time.
- **How opinionated each is.** Bootstrap is opinionated about component *design*: its
  cards, navbars, and buttons all share one visual language unless you override it.
  Tailwind is opinionated about *scale* (spacing, sizes, colors all come from one
  consistent design scale) but has no opinion at all about what a "card" or "button" should
  look like.

**A rule of thumb:** reach for Bootstrap when you want to move fast, the design doesn't
need to be highly distinctive, and the team is comfortable with Bootstrap's look and
component API. Reach for Tailwind when the design needs to be more custom or
distinctive, when you want tight control over the final CSS bundle size, or when the
project is expected to grow and diverge visually from any framework's default look over
time.

## The Demo

`index.html` loads both Bootstrap (via its CDN stylesheet) and Tailwind (via the Play CDN)
on the same page, purely so the two versions can be compared side by side &mdash; a real
project would never ship both frameworks together. The left column is the pricing card
built with Bootstrap's `.card` component and utility classes; the right column is the same
card built entirely from Tailwind utilities, with no card or button component class
involved at all.

## How to Run

Open `index.html` directly in your browser. An internet connection is required to load
Bootstrap and Tailwind from their CDNs.

## Try It Yourself

Add a "Most Popular" badge to both cards: in the Bootstrap version, use its `.badge
.bg-warning` classes; in the Tailwind version, build the same badge from utilities like
`bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full`. Compare how much you had to
look up for each.

## Key Takeaways
- Bootstrap gives you pre-built, opinionated components; Tailwind gives you utilities and
  lets you build the component yourself.
- A properly configured Tailwind build typically produces a smaller production CSS bundle
  than a default, unconfigured Bootstrap build.
- Bootstrap is usually faster to start with; Tailwind scales better into highly custom or
  long-lived designs.
- Never ship both frameworks together in a real project &mdash; this demo does it only so
  you can compare them on one page.
- Choose based on how distinctive the design needs to be and how much control over the
  final CSS you want, not just which one you learned first.
