const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const document = window.document;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);
document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));

const form = document.getElementById("signup-form");

function submitForm() {
  form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
}

// Submitting the empty form should show all three inline errors and no success message.
submitForm();

if (!document.getElementById("name-error").classList.contains("visible")) {
  console.error("FAIL: empty name did not show an error message");
  process.exit(1);
}
if (!document.getElementById("email-error").classList.contains("visible")) {
  console.error("FAIL: empty email did not show an error message");
  process.exit(1);
}
if (!document.getElementById("password-error").classList.contains("visible")) {
  console.error("FAIL: empty password did not show an error message");
  process.exit(1);
}
if (document.getElementById("success-message").classList.contains("visible")) {
  console.error("FAIL: success message showed even though the form was invalid");
  process.exit(1);
}
console.log("PASS: submitting an empty form shows an inline error under every field");

// An invalid email format (missing the @domain.tld part) should still be rejected.
document.getElementById("name").value = "Ayesha Khan";
document.getElementById("email").value = "not-an-email";
document.getElementById("password").value = "short";
submitForm();

if (!document.getElementById("email-error").classList.contains("visible")) {
  console.error("FAIL: a malformed email address was not flagged as invalid");
  process.exit(1);
}
if (!document.getElementById("password-error").classList.contains("visible")) {
  console.error("FAIL: a too-short password was not flagged as invalid");
  process.exit(1);
}
if (document.getElementById("name-error").classList.contains("visible")) {
  console.error("FAIL: a valid name was incorrectly flagged as invalid");
  process.exit(1);
}
console.log("PASS: a malformed email and a too-short password are both rejected while a valid name is accepted");

// Fully valid data should clear every error and show the success message.
document.getElementById("name").value = "Ayesha Khan";
document.getElementById("email").value = "ayesha@example.com";
document.getElementById("password").value = "supersecret";
submitForm();

if (document.getElementById("name-error").classList.contains("visible")) {
  console.error("FAIL: name error still visible after submitting valid data");
  process.exit(1);
}
if (document.getElementById("email-error").classList.contains("visible")) {
  console.error("FAIL: email error still visible after submitting valid data");
  process.exit(1);
}
if (document.getElementById("password-error").classList.contains("visible")) {
  console.error("FAIL: password error still visible after submitting valid data");
  process.exit(1);
}
if (!document.getElementById("success-message").classList.contains("visible")) {
  console.error("FAIL: success message did not appear after submitting valid data");
  process.exit(1);
}
console.log("PASS: submitting fully valid data clears all errors and shows the success message");
