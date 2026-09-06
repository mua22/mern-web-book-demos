// script.js - 7.1 Setup and Selectors
//
// $(document).ready(...) tells jQuery: "wait until the browser has finished
// reading the whole HTML file and built the page's structure in memory
// (this in-memory structure is called the DOM, the Document Object Model)
// before running the code inside." If this code ran too early, jQuery could
// try to select an element like "#greeting" before the browser had even
// reached that line in the HTML, and it would find nothing.
//
// function () { ... } here is a function - a named or, as in this case,
// unnamed ("anonymous") block of code that does not run immediately. It only
// runs later, when something else calls it. Here we are not calling it
// ourselves; instead we hand the whole function to $(document).ready as an
// argument, and jQuery calls it for us once the page is ready. Handing a
// function to another function like this is extremely common in JavaScript
// and is usually called a "callback".
$(document).ready(function () {

  // $('#greeting') is a jQuery selector. The '#' prefix means "an element
  // whose id attribute is exactly this" - the same rule CSS uses for id
  // selectors. The vanilla (plain, library-free) JavaScript equivalent is
  // document.querySelector('#greeting'); jQuery's version is shorter and,
  // as you will see below, easier to chain multiple actions onto.
  //
  // .text('...') replaces the element's visible text.
  // .css('color', 'blue') sets one CSS style property directly from code.
  // Both methods return the same jQuery object they were called on, so you
  // can "chain" another method call straight after with a dot, instead of
  // writing three separate lines.
  $('#greeting').text('Hello from jQuery!').css('color', 'blue');

  // '.' selects by class, again just like CSS. There are TWO <p class="note">
  // elements in index.html, and this single line updates both of them at
  // once - jQuery loops over every match internally, so we never had to
  // write our own loop.
  $('.note').css('font-style', 'italic').addClass('highlighted');

  // A plain tag name selects every element with that tag, anywhere on the
  // page - here, every <li> (list item), regardless of which list it is in.
  $('li').css('color', 'darkgreen');

  // .length works on a jQuery selection the same way it works on a plain
  // JavaScript array: it tells you how many items are in it. We use it here
  // to prove, visibly on the page, that our selector actually found
  // something.
  var itemCount = $('li').length;
  $('#selector-result').text('jQuery found ' + itemCount + ' list items and styled them all.');
});
