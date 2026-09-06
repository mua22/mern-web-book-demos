// script.js - 6.9 The Fetch API and Calling a Real API
//
// fetch(url) is the browser's built-in way to make an HTTP request. It
// returns a Promise (see 6.8), so it is consumed here with async/await and
// try/catch, exactly the way 6.8 introduced.

// --- renderPosts: a separate, named function ---
//
// renderPosts(posts) does not know or care where its data came from - it
// only knows how to take an array of post objects (each with at least a
// "title") and build the on-page list from them. Keeping this logic in its
// own named function, separate from the fetch() call itself, is what makes
// it possible to test: this folder's test.js calls renderPosts(...) directly
// with a small hardcoded array, without ever making a real network request.
function renderPosts(posts) {
  var list = document.getElementById("post-list");
  list.innerHTML = "";

  posts.forEach(function (post) {
    var item = document.createElement("li");
    item.textContent = post.title;
    list.appendChild(item);
  });
}

// --- loadPosts: a thin wrapper around fetch() ---
//
// This function's only jobs are: manage the loading/error UI state, make the
// actual request, and hand a successful result off to renderPosts(). All of
// the DOM-building work happens in renderPosts, not here.
async function loadPosts() {
  var loadingMessage = document.getElementById("loading-message");
  var errorMessage = document.getElementById("error-message");
  var list = document.getElementById("post-list");

  // Reset to a clean "in progress" state every time loading starts, in case
  // this isn't the first click.
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";
  list.innerHTML = "";
  loadingMessage.classList.remove("hidden");

  try {
    // fetch(url) returns a Promise that resolves with a Response object as
    // soon as the server sends back HTTP headers - it does NOT wait for the
    // full body, and (this is the classic gotcha) it does NOT reject just
    // because the server responded with an error status like 404 or 500.
    // fetch() only rejects for something like a lost network connection.
    // That means YOU have to check response.ok (true only for status codes
    // 200-299) yourself, and throw an error if it's false, or a failed
    // request would silently be treated as a success.
    var response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    // .json() is also asynchronous - it reads and parses the response body
    // as JSON (see 6.7) - so it too needs to be awaited before the parsed
    // array of posts is available to use.
    var posts = await response.json();

    // Only the first 10 titles are shown, to keep the demo list short.
    renderPosts(posts.slice(0, 10));
  } catch (error) {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent =
      "Something went wrong while loading posts. Please check your connection and try again.";
    console.error(error);
  } finally {
    loadingMessage.classList.add("hidden");
  }
}

// A GET request like the one above needs nothing extra. A POST request that
// sends data along looks like this instead (not used by this demo, since
// JSONPlaceholder's writes aren't persisted, but shown here for reference):
//
//   fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "My Post", body: "Some text", userId: 1 })
//   });

// Guarded so requiring this file from test.js (in plain Node, with no real
// button to click) never triggers a real network call.
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("load-posts-btn").addEventListener("click", loadPosts);
  });
}

if (typeof module !== "undefined") {
  module.exports = { renderPosts: renderPosts };
}
