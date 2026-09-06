// test.js — run with: node test.js  (from inside this folder)
//
// This test deliberately never makes a real network request. Instead:
//   1. It calls renderUsers(...) directly with a small hardcoded array, to
//      test the rendering logic in isolation.
//   2. It replaces $.get with a fake version it controls, to test the
//      loading/success/error wiring around it without depending on the
//      real JSONPlaceholder API being reachable (or fast, or online) while
//      this test runs.
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const $ = require("jquery")(window);

// Replace $.get with a stand-in BEFORE script.js runs, so the real
// $.on('click', loadUsers) handler picks up our fake version instead of
// trying to reach the actual internet. Our fake returns a jQuery Deferred's
// promise, which supports the same .done()/.fail()/.always() chain as a
// real jQuery AJAX call, but we control exactly when (and whether) it
// succeeds by calling .resolve(...) or .reject() ourselves, below.
let capturedDeferred;
$.get = function () {
  capturedDeferred = $.Deferred();
  return capturedDeferred.promise();
};

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

setTimeout(() => {
  // --- Part 1: renderUsers() tested directly, with fake data ---
  const mockUsers = [
    { name: "Ada Lovelace", email: "ada@example.com" },
    { name: "Alan Turing", email: "alan@example.com" },
    { name: "Grace Hopper", email: "grace@example.com" },
  ];

  window.renderUsers(mockUsers);

  if ($("#user-list li").length !== 3) {
    console.error("FAIL: renderUsers(mockUsers) should render exactly 3 <li> elements");
    process.exit(1);
  }
  console.log("PASS: renderUsers(mockUsers) renders one <li> per user");

  const firstItemText = $("#user-list li").first().text();
  if (firstItemText.indexOf("Ada Lovelace") === -1 || firstItemText.indexOf("ada@example.com") === -1) {
    console.error("FAIL: the rendered <li> should contain both the user's name and email");
    process.exit(1);
  }
  console.log("PASS: each rendered <li> contains the user's name and email");

  // --- Part 2: the loading / success / error wiring, using a fake $.get ---
  $("#user-list").empty();

  $("#load-users-btn").trigger("click");
  if ($("#loading-message").hasClass("hidden")) {
    console.error("FAIL: the loading message should be visible while the request is in flight");
    process.exit(1);
  }
  console.log("PASS: clicking Load Users shows the loading message");

  capturedDeferred.resolve(mockUsers);

  if ($("#user-list li").length !== 3) {
    console.error("FAIL: a successful response should render the users via renderUsers");
    process.exit(1);
  }
  if (!$("#loading-message").hasClass("hidden")) {
    console.error("FAIL: the loading message should be hidden again once the request finishes");
    process.exit(1);
  }
  console.log("PASS: a successful response renders the users and hides the loading message");

  // Simulate a failed request on a second click.
  $("#load-users-btn").trigger("click");
  capturedDeferred.reject();

  if ($("#error-message").hasClass("hidden") || $("#error-message").text().trim() === "") {
    console.error("FAIL: a failed request should show a visible, non-empty error message");
    process.exit(1);
  }
  if (!$("#loading-message").hasClass("hidden")) {
    console.error("FAIL: the loading message should be hidden again even after a failed request");
    process.exit(1);
  }
  console.log("PASS: a failed request shows an error message and hides the loading message");
}, 0);
