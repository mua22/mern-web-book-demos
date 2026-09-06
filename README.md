# MERN Web Book — Demos

Companion demo code for the **Web Dev Book** tutorial series: hands-on examples and
mini-projects for every topic, from a first `<h1>` to a full MERN stack application with
authentication.

- Book / tutorials: [mern-web-book](https://github.com/mua22/mern-web-book)
- Author: [usmanlive.com](https://usmanlive.com)

Each topic below will get its own folder with a runnable, self-contained example as the
series progresses.

## Topics

### 1. HTML
- [ ] How the web works: client-server, HTTP, browsers, dev tools setup
- [ ] Document structure: DOCTYPE, `html`/`head`/`body`, boilerplate
- [ ] Text elements: headings, paragraphs, text formatting, `div`/`span`
- [ ] Links & navigation (absolute vs. relative URLs)
- [ ] Images & media (`img`, `audio`, `video`, `picture`)
- [ ] Lists: ordered, unordered, description
- [ ] Tables
- [ ] Forms: inputs, labels, select/textarea/button, native validation attributes
- [ ] Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) & accessibility basics
- [ ] SEO basics & best practices (meta tags, alt text, document validation)

### 2. CSS
- [ ] Ways to add CSS; syntax; selectors & specificity
- [ ] The box model (content/padding/border/margin, box-sizing)
- [ ] Colors, typography, backgrounds
- [ ] Display & positioning: static/relative/absolute/fixed/sticky, z-index
- [ ] Flexbox layout
- [ ] CSS Grid layout
- [ ] Responsive design: media queries, mobile-first, fluid units
- [ ] Transitions, transforms & keyframe animations
- [ ] CSS custom properties (variables) & modern features (clamp, aspect-ratio)
- [ ] Organizing CSS at scale (naming conventions like BEM)

### 3. Bootstrap
- [ ] Setup (CDN/npm) & the grid system (containers, rows, columns)
- [ ] Typography & spacing utilities
- [ ] Core components: navbar, cards, buttons, forms, modals, alerts
- [ ] Responsive utility classes
- [ ] Customizing the theme (Sass variables)
- [ ] Project: a full responsive page with Bootstrap

### 4. Tailwind CSS
- [ ] Utility-first concept & setup (Tailwind CLI/PostCSS/Vite)
- [ ] Core utilities: spacing, sizing, typography, color
- [ ] Flexbox & Grid utilities
- [ ] Responsive design in Tailwind (breakpoint prefixes)
- [ ] State variants: hover/focus/dark mode
- [ ] Customizing `tailwind.config`; reusable patterns (`@apply`, components)
- [ ] Project: a full responsive page with Tailwind
- [ ] Bootstrap vs. Tailwind — when to use which

### 5. JavaScript Basics
- [ ] Embedding scripts (`defer`/`async`); the language in the browser
- [ ] Variables (`var`/`let`/`const`), data types, operators
- [ ] Control flow: conditionals, loops, switch
- [ ] Functions: declarations, expressions, arrow functions
- [ ] Arrays & core array methods
- [ ] Objects
- [ ] Strings & template literals
- [ ] DOM selection & manipulation
- [ ] Events & event handling
- [ ] Working with forms via JS

### 6. Advanced JavaScript
- [ ] Scope, hoisting, the temporal dead zone, closures
- [ ] `this`, `call`/`apply`/`bind`
- [ ] Prototypes & prototypal inheritance; ES6 classes
- [ ] Destructuring, spread/rest, modules (`import`/`export`)
- [ ] Error handling (`try/catch`, custom errors)
- [ ] Regular expressions
- [ ] JSON (`stringify`/`parse`)
- [ ] Async JS: callbacks → Promises → `async`/`await`; the event loop
- [ ] API calls: the Fetch API, GET/POST/headers, handling responses & errors, loading/error UI states
- [ ] Browser storage: `localStorage`, `sessionStorage`, cookies
- [ ] Project: consume a public REST API (search, pagination, error handling)

### 7. jQuery
- [ ] Why jQuery existed & setup
- [ ] Selectors & DOM manipulation
- [ ] Events in jQuery
- [ ] Effects & animations
- [ ] AJAX with jQuery (`$.ajax`, `$.get`, `$.post`)
- [ ] jQuery vs. modern vanilla JS — when (not) to reach for it today

### 8. Node.js & Express (Server-Side)
- [ ] Node runtime, npm & package management
- [ ] Core modules (`fs`, `path`, `http`); building a raw HTTP server
- [ ] Introduction to Express; routing (GET/POST/PUT/DELETE)
- [ ] Middleware: built-in, third-party, custom; the request/response pipeline
- [ ] Reading `req.body`/`req.params`/`req.query`; serving static files
- [ ] Template engines (EJS) for server-rendered views
- [ ] Centralized error handling & environment variables/config
- [ ] REST API design principles, status codes, consistent JSON responses
- [ ] Sessions/cookies & token-based auth (JWT) fundamentals

### 9. MongoDB & Mongoose
- [ ] NoSQL concepts; MongoDB Atlas/local setup, Compass
- [ ] CRUD in the Mongo shell
- [ ] Connecting Mongoose; schemas & models
- [ ] CRUD via Mongoose; validation & schema options
- [ ] Relationships: embedding vs. referencing, `populate`
- [ ] Mongoose middleware/hooks
- [ ] Project: full CRUD REST API (Express + Mongoose)
- [ ] File uploads (Multer) — optional
- [ ] Auth with MongoDB: password hashing (bcrypt) + JWT, protected routes

### 10. React Basics
- [ ] Why React; SPA concepts & the Virtual DOM
- [ ] Project setup with Vite; JSX syntax
- [ ] Components & props
- [ ] State with `useState`; event handling
- [ ] Conditional rendering; lists & `key`
- [ ] Forms & controlled components
- [ ] Component composition & children

### 11. React Intermediate
- [ ] `useEffect` & side effects/lifecycle
- [ ] Fetching API data in React; loading/error states
- [ ] `useRef`; lifting state up & prop drilling
- [ ] Context API; `useReducer`
- [ ] Custom hooks
- [ ] React Router: routes, nested routes, params, navigation, protected routes

### 12. React Advanced
- [ ] Performance: `useMemo`, `useCallback`, `React.memo`
- [ ] State management (Redux Toolkit or Zustand)
- [ ] Advanced patterns: compound components, render props, HOCs
- [ ] Error boundaries; code splitting & lazy loading
- [ ] Testing (Jest + React Testing Library)
- [ ] Capstone: connect React to the Express + Mongoose API — full MERN app with JWT auth
- [ ] Deployment (frontend + backend, env vars, production build)
