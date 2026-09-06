// script.js - 7.5 AJAX with jQuery
//
// AJAX means asking the browser to fetch or send data to a server WITHOUT
// reloading the whole page. jQuery's $.ajax() (and its shortcuts, like
// $.get()) do this by making an HTTP request in the background and calling
// your code back once a response arrives - which could take a noticeable
// amount of time, or fail entirely (a lost connection, a server error), so
// this is the first topic in this module where your code has to handle both
// success AND failure, and where something visibly happens some time AFTER
// the line that started it, not immediately on the next line.

// --- renderUsers: a separate, named function ---
//
// This function is deliberately written on its own, OUTSIDE the
// $(document).ready(...) block below, and it does not know or care where
// its data came from - it only knows how to take an array of user objects
// and build the on-page list from them.
//
// An "array" is a JavaScript value that holds an ordered list of items -
// here, a list of user objects, each with (at least) a "name" and an
// "email" property. Arrays have a built-in .forEach(function (item) { ...
// })  method: it runs the function you give it once for every item in the
// array, automatically, without you writing your own counting loop.
//
// Keeping this logic in its own named function (rather than writing it
// inline inside the AJAX success callback below) means it can be tested on
// its own, with fake, hardcoded data, without ever making a real network
// request - which is exactly what this topic's test.js does.
function renderUsers(users) {
  var listHtml = '';

  users.forEach(function (user) {
    listHtml +=
      '<li><strong>' + user.name + '</strong> - ' +
      '<span class="user-email">' + user.email + '</span></li>';
  });

  // .html(...) (introduced in 7.2) replaces #user-list's content with the
  // markup we just built up as a single string.
  $('#user-list').html(listHtml);
}

$(document).ready(function () {

  function loadUsers() {
    // Reset the page to a clean "in progress" state every time loading
    // starts, in case this isn't the first click.
    $('#error-message').addClass('hidden').text('');
    $('#user-list').empty();
    $('#loading-message').removeClass('hidden');

    // $.get(url) is a shortcut for the common case of $.ajax({ url: url,
    // method: 'GET' }). Both send an HTTP request to the given address and
    // return a "promise"-like object right away, before any response has
    // arrived - your code keeps running immediately; it does not wait
    // (freeze) here for the network.
    //
    // .done(fn) registers fn to run later, only if the request succeeds -
    // fn receives the response already parsed from JSON into a plain
    // JavaScript array of objects, ready to use.
    // .fail(fn) registers fn to run later, only if the request fails (no
    // internet connection, the server is down, and so on).
    // .always(fn) registers fn to run either way, once the request is
    // finished - used here to hide the "Loading..." message regardless of
    // the outcome.
    //
    // The equivalent written with $.ajax() directly, which is more
    // configurable, looks like this instead:
    //
    //   $.ajax({
    //     url: 'https://jsonplaceholder.typicode.com/users',
    //     method: 'GET',
    //     success: function (users) { renderUsers(users); },
    //     error: function () { /* show an error */ }
    //   });
    $.get('https://jsonplaceholder.typicode.com/users')
      .done(function (users) {
        renderUsers(users);
      })
      .fail(function () {
        $('#error-message')
          .removeClass('hidden')
          .text('Something went wrong while loading users. Please check your connection and try again.');
      })
      .always(function () {
        $('#loading-message').addClass('hidden');
      });
  }

  $('#load-users-btn').on('click', loadUsers);
});
