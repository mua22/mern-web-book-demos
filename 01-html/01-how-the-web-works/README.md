# 1.1: How the Web Works

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- What the client-server model is and why your browser is a "client"
- What a URL actually is and what its parts mean
- What happens when a browser requests a page: a request goes out, a response comes back
- What an HTTP status code like 200 means
- The difference between opening a local file (`file://`) and visiting a real hosted page (`http://` or `https://`)

## Prerequisites
None. This is the first topic in the roadmap.

## Explanation

Every website you visit involves two sides talking to each other. Your browser
(Chrome, Firefox, Edge, and so on) is the **client**: it asks for things. The
**server** is a computer somewhere else that stores the website's files and
answers those requests. This back-and-forth is called the **client-server
model**, and it is the foundation of how the entire web works.

Here is the sequence, in plain terms:

1. You type an address into the browser, or click a link.
2. The browser sends an **HTTP request** to a server, asking for a specific
   resource (a page, an image, a script, and so on).
3. The server finds that resource and sends back an **HTTP response**, which
   includes a **status code** telling the browser how it went. The most
   common status code is `200`, which means "OK, here is what you asked for."
   You may also encounter `404` (not found) or `500` (server error) later on.
4. The browser reads the response and displays the page.

A **URL** (Uniform Resource Locator) is the address used in step 2. For
example, in `https://example.com/about.html`:
- `https` is the **protocol** (the set of rules used to communicate; more on
  this below).
- `example.com` is the **domain**, which identifies the server.
- `/about.html` is the **path**, which tells the server which specific file
  or resource you want.

Now, an important distinction: everything above describes a page that is
**hosted** on a real server, reachable over the internet or a network, using
the `http://` or `https://` protocol. But you can also open an HTML file
directly from your own computer's hard drive, without any server involved at
all. When you do that, your browser's address bar shows a `file://` address
instead. There is no client-server exchange happening — no request goes out
onto a network, because there is no server on the other end. The browser is
just reading a file straight off your disk, the same way a text editor would.

Both approaches display HTML, but only the `http(s)://` version involves an
actual network request and response. That difference matters because tools
like the Network tab in DevTools are built to show you real network traffic —
so they will not have much to show for pure `file://` browsing.

## The Demo

This folder has two linked pages:
- `index.html` — the starting page, with a link to `about.html`.
- `about.html` — a second page, with a link back to `index.html`.

Clicking between them behaves exactly like clicking a link on any website:
the browser reads the link's `href` (the URL it points to) and loads that
resource.

## How to Run

Open `index.html` directly in your browser (double-click it, or right-click
-> Open With). No installation or server needed.

Before clicking the link on the page, open your browser's DevTools (press
`F12`, or right-click anywhere on the page and choose "Inspect") and switch
to the **Network** tab. Then click the link to `about.html` and watch the
Network tab.

Honest heads-up: because both files are opened via `file://` rather than a
real server, you likely will not see much (or anything) appear in the
Network tab when you click the link. That is expected, not a mistake on your
part — there is no real network request happening here, just the browser
reading another file off your disk, as explained above. The goal of this
demo is to get the *concept* of a link and a URL solid. In a later module,
once these pages are served by an actual local server, you will redo this
exact exercise and see real HTTP requests, response status codes, and timing
show up in that same Network tab.

## Try It Yourself

Open DevTools and switch to the **Elements** (or **Inspector**) tab instead
of Network. Find the `<a>` tag in `index.html` and look at its `href`
attribute. Try changing the link text (the words between `<a>` and `</a>`)
directly in DevTools and see it update live on the page. (This change is
temporary and disappears on refresh — you are only editing what the browser
is displaying, not the actual file.)

## Key Takeaways
- The web runs on a client (your browser) asking a server for resources, and the server responding.
- A URL is an address: protocol, domain, and path together tell the browser what to fetch and from where.
- An HTTP status code like 200 tells you whether a request succeeded.
- Opening a file with `file://` is not the same as visiting a page with `http://` or `https://` — only the latter involves a real network request.
- Clicking a link is the browser reading a URL and loading whatever it points to.
