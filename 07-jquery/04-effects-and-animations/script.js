// script.js - 7.4 Effects and Animations
//
// jQuery's effect methods change how an element's visibility changes, not
// just whether it's visible. .hide() and .show() are instant - the element
// simply disappears or appears with no animation, which is exactly what
// plain CSS ("display: none") already does; jQuery's own version exists
// mostly so it can be combined with the animated methods below using the
// same simple names.
//
// .fadeIn() / .fadeOut() animate an element's opacity from 0 to visible (or
// the reverse) over time. .fadeToggle() picks whichever direction makes
// sense: it fades an element in if it's currently hidden, and out if it's
// currently visible - one method instead of an if/else checking which state
// the element is in.
//
// .slideToggle() is similar but animates height instead of opacity - the
// element grows open from nothing, or shrinks closed to nothing, which
// reads visually as "sliding." This is the classic way to build an
// accordion or a collapsible panel, which is exactly what this demo does.
//
// All of these accept an optional duration (in milliseconds) and callback,
// e.g. $(...).slideToggle(200, function () { ... }); left at their defaults
// here. For animations more custom than a simple show/hide/fade/slide,
// jQuery also has a lower-level .animate({ ... }) method that can animate
// almost any numeric CSS property (width, opacity, margin, and more) to
// whatever values you specify - useful when none of the shortcut methods
// above do quite what you need.
$(document).ready(function () {

  // .faq-question is a <button> for each question. Clicking one should open
  // (or close) only the answer that belongs to that specific question, not
  // every answer on the page.
  $('.faq-question').on('click', function () {
    // "this" is the exact <button> that was clicked. .next('.faq-answer')
    // selects the very next sibling element in the HTML that matches
    // '.faq-answer' - in index.html, each question button is immediately
    // followed by its own answer <div>, so this reliably finds the right
    // one without needing an id to match them up.
    $(this).next('.faq-answer').slideToggle();
  });

  // A second, independent demo of .fadeToggle() on a plain line of text, to
  // show the fade effect on its own, separate from the accordion above.
  $('#fade-demo-btn').on('click', function () {
    $('#fade-demo-text').fadeToggle();
  });
});
