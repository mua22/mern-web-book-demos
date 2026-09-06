# MERN Web Book — Demos

A hands-on, folder-by-folder companion to learning the MERN stack: HTML, CSS, Bootstrap,
Tailwind CSS, JavaScript, jQuery, Express, MongoDB/Mongoose, and React — from a first
`<h1>` to a full-stack application.

This repo is independent of, and complements, the [mern-web-book](https://github.com/mua22/mern-web-book)
textbook. The book explains concepts in prose, lecture by lecture; this repo is
demo-first — every topic is a small, runnable, self-contained project with a README
walking through what it does and why.

Written for 5th-semester BSCS students. Author: [usmanlive.com](https://usmanlive.com)

## How This Repo Is Organized

- **Modules** are numbered top-level folders (`01-html`, `02-css`, ...). Each module has
  its own `README.md` with an overview and a table of its topics.
- **Topics** are numbered subfolders inside a module (e.g. `02-css/05-flexbox`). Each
  topic folder contains:
  - `README.md` — what you'll learn, an explanation of the concept, a walkthrough of the
    demo code, and **how to run it**.
  - The demo itself (`index.html`, `style.css`, `script.js`, or a small project) — always
    complete and runnable on its own.
- **Every topic is independent.** You never need to have completed another topic's files
  to run a given demo — each one is self-contained, even though the *concepts* build on
  each other and are best followed in order.
- **Difficulty increases gradually**, both within a module (topic 1 is easier than the
  last topic in that module) and across modules (later modules assume everything before
  them). Each topic folder states its difficulty level in its README.

## Roadmap

Modules already built have their topics linked below. Modules not yet started are listed
for context — topics will be added to them later.

### 1. [HTML](01-html/) — Beginner
Document structure, text, links, images, lists, tables, forms, semantic HTML,
accessibility, SEO basics.

### 2. [CSS](02-css/) — Beginner → Intermediate
Selectors, the box model, colors & typography, positioning, Flexbox, Grid, responsive
design, transitions & animations, custom properties, organizing CSS at scale.

### 3. [Bootstrap](03-bootstrap/) — Beginner → Intermediate
The grid system, typography & utilities, core components, responsive utilities,
customizing the theme, a full responsive project.

### 4. [Tailwind CSS](04-tailwind-css/) — Beginner → Intermediate
The utility-first concept, core utilities, Flexbox/Grid utilities, responsive design,
state variants, customizing `tailwind.config.js`, a full responsive project, Bootstrap vs.
Tailwind.

### 5. JavaScript Basics — *coming later*
Variables, data types, operators, control flow, functions, arrays, objects, strings, DOM
selection, events, working with forms.

### 6. Advanced JavaScript — *coming later*
Scope & closures, `this`, prototypes & classes, destructuring & modules, error handling,
regular expressions, JSON, async JS (Promises/async-await), the Fetch API, browser
storage.

### 7. [jQuery](07-jquery/) — Beginner+ → Intermediate
Selectors, DOM manipulation, events, effects & animations, AJAX, jQuery vs. modern
JavaScript.

### 8. Node.js & Express — *coming later*
The Node runtime & npm, core modules, Express routing & middleware, REST API design,
sessions/cookies, token-based auth basics.

### 9. MongoDB & Mongoose — *coming later*
NoSQL concepts, schemas & models, CRUD, relationships, a full REST API project,
password hashing & JWT auth.

### 10. React Basics — *coming later*
JSX, components & props, state, event handling, conditional rendering, lists, forms.

### 11. React Intermediate — *coming later*
`useEffect`, fetching API data, `useRef`, Context API, `useReducer`, custom hooks, React
Router.

### 12. React Advanced — *coming later*
Performance (`useMemo`/`useCallback`/`memo`), state management libraries, advanced
patterns, testing, a full MERN capstone project, deployment.

## Running & Testing the Demos

Almost every demo needs nothing but a browser — open its `index.html` file directly. A
few (marked in their own README) load a library from a CDN and need an internet
connection, and a couple of advanced topics use a real local build step and include their
own `package.json`.

This repository also has its own dev-only test tooling (not needed by students, only used
to verify the demos are correct):

```bash
npm install        # installs jsdom + jquery, used to test the jQuery demos
npm test           # runs every topic's automated test.js
npm run validate:html   # structural HTML validation across all demos
```

## Contributing / Roadmap Status

This repo is being built module by module, in the order shown above. If you spot an issue
in a demo, open an issue or a PR against that topic's folder.
