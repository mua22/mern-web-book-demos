// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;
const $ = require("jquery")(window);

// jQuery's animations (fadeIn/fadeOut/fadeToggle/slideToggle/animate) run
// over time using timers, which makes them awkward to test directly.
// $.fx.off = true is a real jQuery setting (also used by jQuery's own test
// suite) that makes every animation apply its end state immediately, with
// no actual animating - exactly what an automated test needs to check the
// *intended* end state without waiting on real timers.
$.fx.off = true;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false }));

setTimeout(() => {
  const firstAnswer = $(".faq-question").first().next(".faq-answer");
  const initialDisplay = firstAnswer.css("display");

  $(".faq-question").first().trigger("click");
  const afterOneClick = firstAnswer.css("display");
  if (afterOneClick === initialDisplay) {
    console.error("FAIL: clicking a question should toggle its answer's display state");
    process.exit(1);
  }
  console.log("PASS: clicking a question toggles its answer open (slideToggle)");

  $(".faq-question").first().trigger("click");
  const afterTwoClicks = firstAnswer.css("display");
  if (afterTwoClicks !== initialDisplay) {
    console.error("FAIL: clicking the same question twice should return the answer to its original state");
    process.exit(1);
  }
  console.log("PASS: clicking a question a second time slides its answer back closed");

  // The three FAQ answers must be independent: opening the first should not
  // affect the second.
  const secondAnswer = $(".faq-question").eq(1).next(".faq-answer");
  const secondInitialDisplay = secondAnswer.css("display");
  $(".faq-question").first().trigger("click");
  if (secondAnswer.css("display") !== secondInitialDisplay) {
    console.error("FAIL: opening one FAQ answer should not affect a different question's answer");
    process.exit(1);
  }
  console.log("PASS: each FAQ question's answer toggles independently");

  // The standalone fadeToggle demo.
  const fadeText = $("#fade-demo-text");
  const fadeInitialDisplay = fadeText.css("display");
  $("#fade-demo-btn").trigger("click");
  if (fadeText.css("display") === fadeInitialDisplay) {
    console.error("FAIL: clicking the fade demo button should toggle #fade-demo-text's display state");
    process.exit(1);
  }
  console.log("PASS: the fade demo button toggles #fade-demo-text with fadeToggle");
}, 0);
