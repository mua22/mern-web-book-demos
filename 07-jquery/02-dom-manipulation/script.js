// script.js - 7.2 DOM Manipulation
//
// As in 7.1, we wait for the page to finish loading before touching it.
// $(document).ready(...) is covered in detail in 7.1's README - here we just
// use it. Note: this demo needs a button click to work, so it also uses
// jQuery's .on('click', handler) method to react to that click. Events are
// the whole subject of 7.3 - for now, all you need to know is that
// .on('click', fn) tells jQuery "run this function every time this element
// is clicked."
$(document).ready(function () {

  // A "function declaration" - a named, reusable block of code, defined
  // once and called (run) as many times as we like later by writing its
  // name followed by parentheses, e.g. updateEmptyMessage(). We use this to
  // avoid repeating the same "is the list empty?" check in two places below.
  function updateEmptyMessage() {
    // $('#item-list li').length counts how many <li> elements are currently
    // inside the list (exactly like counting entries in a plain JavaScript
    // array with .length).
    var hasItems = $('#item-list li').length > 0;

    // .addClass('hidden') and .removeClass('hidden') add or remove one CSS
    // class from the selected element(s). The actual hiding is done by a
    // plain CSS rule in style.css ("display: none"), which is why this
    // topic uses class manipulation instead of jQuery's own .show()/.hide()
    // methods - those belong to 7.4 (Effects & Animations).
    if (hasItems) {
      $('#empty-message').addClass('hidden');
    } else {
      $('#empty-message').removeClass('hidden');
    }

    // .text() with NO argument is the "get" form: it reads and returns the
    // current text of the first matched element, as a plain JavaScript
    // string. .text('...') WITH an argument is the "set" form: it replaces
    // the element's text. Here we use the set form to display a live count.
    $('#item-count').text('Items: ' + $('#item-list li').length);
  }

  $('#add-btn').on('click', function () {
    // .val() with no argument is the "get" form for form fields: it reads
    // whatever the user has typed into the <input>, as a plain string.
    var itemText = $('#item-input').val();

    // .trim() is plain JavaScript (not jQuery) - it removes whitespace from
    // the start and end of a string. We use it so clicking "Add" with only
    // spaces typed in does nothing.
    if (itemText.trim() === '') {
      return; // "return" here exits the function early, doing nothing else.
    }

    // $('<li></li>') creates a brand-new element that exists only in memory
    // so far - it is not yet part of the visible page. Passing HTML text to
    // $(...) like this, instead of a selector, is how you build new elements
    // with jQuery.
    var newItem = $('<li></li>');

    // .html('...') is like .text('...') but its argument is interpreted as
    // HTML, not plain text - so tags inside the string actually become real
    // elements. We use it here to include a <button> inside the new <li>.
    // (If we used .text() instead, the user would literally see the
    // characters "<button>Remove</button>" printed on the page instead of a
    // clickable button.)
    newItem.html(itemText + ' <button type="button" class="remove-btn">Remove</button>');

    // .find('.remove-btn') searches INSIDE newItem for a descendant matching
    // that selector - here, the button we just created with .html() above.
    // We attach a click handler directly to this one button. (7.3 shows a
    // better way to do this for elements added after the page loads, called
    // event delegation - this direct-binding approach works, but has a
    // limitation that topic explains.)
    newItem.find('.remove-btn').on('click', function () {
      // "this" inside a jQuery click handler refers to the exact DOM element
      // that was clicked - here, the Remove button. $(this) wraps it in a
      // jQuery object so we can call jQuery methods on it.
      // .closest('li') walks upward from the button and finds the nearest
      // ancestor <li> - the whole list item this button belongs to.
      // .remove() deletes that element from the page entirely.
      $(this).closest('li').remove();
      updateEmptyMessage();
    });

    // Clicking anywhere else on this item (but not the Remove button, which
    // has its own handler above) marks it as "done" by toggling a CSS class
    // on and off. .toggleClass('done') adds the class if the element does
    // not already have it, and removes it if it does - one method doing the
    // job of an if/else. We bind this directly to newItem, at the moment we
    // create it, the same way we bound the Remove button above - both
    // handlers only work because they are attached before the item is added
    // to the page. 7.3 shows why that requirement becomes a problem as an
    // app grows, and how event delegation solves it.
    newItem.on('click', function (event) {
      if ($(event.target).is('.remove-btn')) {
        return;
      }
      $(this).toggleClass('done');
    });

    // .append(newItem) inserts newItem as the last child of #item-list.
    $('#item-list').append(newItem);

    // .val('') is the "set" form of .val() - it replaces the input's current
    // value. Here, an empty string clears the box after adding.
    $('#item-input').val('');

    updateEmptyMessage();
  });

  // Run once on page load so the empty message and count are correct before
  // the user adds anything.
  updateEmptyMessage();
});
