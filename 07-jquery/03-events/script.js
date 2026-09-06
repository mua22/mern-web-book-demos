// script.js - 7.3 Events
//
// This demo rebuilds the same kind of "add item" list as 7.2, but wires up
// the Remove links differently on purpose, to show event delegation.
$(document).ready(function () {

  function updateEmptyMessage() {
    var hasItems = $('#item-list li').length > 0;
    if (hasItems) {
      $('#empty-message').addClass('hidden');
    } else {
      $('#empty-message').removeClass('hidden');
    }
    $('#item-count').text('Items: ' + $('#item-list li').length);
  }

  // --- Why event delegation? ---
  //
  // In 7.2, the Remove button for each list item was bound directly, at the
  // moment that item was created:
  //
  //   newItem.find('.remove-btn').on('click', function () { ... });
  //
  // That works, but only because the button already existed on the page at
  // the exact moment .on('click', ...) ran. Any element added to the page
  // LATER, after that line of code has already finished running, was never
  // there to be bound - so it would not respond to clicks at all, unless you
  // remembered to bind it too, individually, every single time.
  //
  // Event delegation flips this around. Instead of listening on each item,
  // we listen once on a parent element that already exists when the page
  // loads - here, #item-list - and tell it which descendant selector we
  // actually care about:
  //
  //   $('#item-list').on('click', '.remove-link', handler);
  //
  // Because clicks in a web page "bubble" upward from the element clicked
  // through each of its ancestors, a click on a Remove link (even one added
  // to the list minutes from now, long after this code ran) still reaches
  // #item-list and gets checked against '.remove-link'. One handler,
  // registered once, keeps working for every matching element, present now
  // or added later - no re-binding required.
  $('#item-list').on('click', '.remove-link', function (event) {
    // event.preventDefault() stops the browser's own default reaction to
    // this event. Our Remove control is a real <a href="#"> link, and a
    // real click on a link normally makes the browser navigate - here, to
    // "#", which would jump the page to the top. We don't want that; we
    // only want our own remove logic to run, so we cancel the default
    // behavior first.
    event.preventDefault();

    // event.target is the EXACT element the click landed on, which is not
    // always the same element the selector matched. This Remove link
    // contains a nested <span>, so a click directly on the word "Remove"
    // reports event.target as that <span> - while "this" (and
    // event.currentTarget) is always the <a class="remove-link"> element
    // itself, i.e. whichever element actually matched '.remove-link' when
    // jQuery walked up from event.target looking for a match. That is what
    // makes delegation work even when an element has nested children.
    $(this).closest('li').remove();
    updateEmptyMessage();
  });

  $('#add-btn').on('click', function () {
    var itemText = $('#item-input').val();
    if (itemText.trim() === '') {
      return;
    }

    var newItem = $('<li></li>');
    // Deliberately no click handler is attached to this new item or its
    // Remove link here - unlike 7.2, we don't need one. The single
    // delegated handler registered above on #item-list already covers it,
    // because it was written to match any '.remove-link', including ones
    // that do not exist yet at the time this code runs.
    newItem.html(itemText + ' <a href="#" class="remove-link">(<span>Remove</span>)</a>');

    $('#item-list').append(newItem);
    $('#item-input').val('');
    updateEmptyMessage();
  });

  // --- .off() ---
  //
  // .off('click', '.remove-link') removes a previously-attached delegated
  // handler that matches the same event type and selector. This button lets
  // you switch the delegated handler off and back on, so you can see the
  // difference: with it off, clicking Remove does nothing at all, because
  // there is no longer any handler listening for that click.
  var delegationOn = true;

  $('#toggle-delegation-btn').on('click', function () {
    if (delegationOn) {
      $('#item-list').off('click', '.remove-link');
      $('#delegation-status').text('Delegated click handling is: OFF');
      $(this).text('Turn delegated handler on');
    } else {
      $('#item-list').on('click', '.remove-link', function (event) {
        event.preventDefault();
        $(this).closest('li').remove();
        updateEmptyMessage();
      });
      $('#delegation-status').text('Delegated click handling is: ON');
      $(this).text('Turn delegated handler off');
    }
    delegationOn = !delegationOn;
  });

  updateEmptyMessage();
});
