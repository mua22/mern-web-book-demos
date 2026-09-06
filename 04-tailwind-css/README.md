# Module 4: Tailwind CSS

Tailwind is a *utility-first* CSS framework: instead of components with fixed styles (like
Bootstrap's `.card` or `.btn`), you compose small single-purpose classes (`flex`, `p-4`,
`text-lg`) directly in your HTML. This module goes from the utility-first idea to a real
local build setup with a `tailwind.config.js`.

**Difficulty range:** Beginner → Intermediate+
**Prerequisites:** [Module 1: HTML](../01-html/), [Module 2: CSS](../02-css/). Having done
[Module 3: Bootstrap](../03-bootstrap/) first is not required, but topic 4.8 directly
compares the two.

## Topics

| # | Topic | Difficulty | Folder |
|---|---|---|---|
| 4.1 | Setup & the Utility-First Concept | Beginner | [01-setup-and-utility-first-concept](01-setup-and-utility-first-concept/) |
| 4.2 | Core Utilities | Beginner+ | [02-core-utilities](02-core-utilities/) |
| 4.3 | Flexbox & Grid Utilities | Intermediate | [03-flexbox-and-grid-utilities](03-flexbox-and-grid-utilities/) |
| 4.4 | Responsive Design | Intermediate | [04-responsive-design](04-responsive-design/) |
| 4.5 | State Variants (hover, focus, dark mode) | Intermediate | [05-state-variants](05-state-variants/) |
| 4.6 | Customizing `tailwind.config.js` | Intermediate+ | [06-customizing-tailwind-config](06-customizing-tailwind-config/) |
| 4.7 | Project: A Full Responsive Page | Intermediate+ | [07-project-responsive-page](07-project-responsive-page/) |
| 4.8 | Bootstrap vs. Tailwind | Intermediate | [08-bootstrap-vs-tailwind](08-bootstrap-vs-tailwind/) |

## How to Run These Demos

Topics 4.1-4.5 and 4.8 use the Tailwind **Play CDN** (`cdn.tailwindcss.com`) — just open
`index.html` in your browser (an internet connection is required, nothing to install).

Topics 4.6 and 4.7 use a **real local Tailwind build** (the way you'd actually set up a
project), so each of those two folders has its own `package.json` and its README explains
the exact `npm install` / build commands to run.

[Back to the main roadmap](../README.md)
