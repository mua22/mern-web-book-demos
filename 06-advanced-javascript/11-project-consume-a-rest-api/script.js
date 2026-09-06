// script.js - 6.11 Project: Consume a Public REST API
//
// This capstone combines everything from this module: fetch() and
// async/await (6.8-6.9) to call a real API, DOM manipulation and events
// (Module 5) to build the search UI, and localStorage (6.10) to remember
// the user's last search. It is written independently from 6.9's demo -
// nothing here is shared with or reused from that folder.

var LAST_SEARCH_KEY = "advanced-js-last-country-search";

// --- renderCountries: a separate, named function ---
//
// renderCountries(countries) only knows how to turn an array of country
// objects (shaped like the REST Countries API's response) into cards inside
// #results - including showing a "No results" message when the array is
// empty. It doesn't know or care whether that array came from a real fetch
// or was typed in by hand, which is what makes it testable: this folder's
// test.js calls renderCountries([...]) directly with hardcoded data, without
// ever making a real network request.
function renderCountries(countries) {
  var results = document.getElementById("results");
  results.innerHTML = "";

  if (countries.length === 0) {
    var noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = "No results found. Try a different country name.";
    results.appendChild(noResults);
    return;
  }

  countries.forEach(function (country) {
    var card = document.createElement("div");
    card.className = "country-card";

    var flag = document.createElement("img");
    flag.className = "country-flag";
    flag.src = country.flags && (country.flags.png || country.flags.svg) || "";
    flag.alt = (country.flags && country.flags.alt) || ("Flag of " + country.name.common);
    card.appendChild(flag);

    var info = document.createElement("div");
    info.className = "country-info";

    var name = document.createElement("h3");
    name.textContent = country.name.common;
    info.appendChild(name);

    var capital = document.createElement("p");
    capital.textContent = "Capital: " + (country.capital ? country.capital[0] : "N/A");
    info.appendChild(capital);

    var region = document.createElement("p");
    region.textContent = "Region: " + country.region;
    info.appendChild(region);

    var population = document.createElement("p");
    population.textContent = "Population: " + country.population.toLocaleString();
    info.appendChild(population);

    card.appendChild(info);
    results.appendChild(card);
  });
}

// --- searchCountries: a thin async wrapper around fetch() ---
//
// This function's only jobs are: remember the search term, manage the
// idle/loading/error UI state, make the actual request, and hand a
// successful result off to renderCountries(). All of the card-building work
// happens in renderCountries, not here.
async function searchCountries(term) {
  var statusMessage = document.getElementById("status-message");
  var results = document.getElementById("results");

  var trimmed = term.trim();
  if (trimmed === "") {
    statusMessage.textContent = "Please enter a country name.";
    results.innerHTML = "";
    return;
  }

  // Remember this search so it can be pre-filled next time the page loads,
  // even after closing and reopening the browser.
  localStorage.setItem(LAST_SEARCH_KEY, trimmed);

  statusMessage.textContent = "Loading...";
  results.innerHTML = "";

  try {
    var response = await fetch(
      "https://restcountries.com/v3.1/name/" + encodeURIComponent(trimmed)
    );

    // The REST Countries API responds with a 404 status (not a network
    // failure) when no country matches the search term. Just like the
    // fetch() gotcha covered in 6.9, response.ok is false for a 404, so it
    // has to be checked explicitly - but a 404 here means "no results", not
    // a real error, so it gets its own friendly message instead of being
    // thrown as an error.
    if (response.status === 404) {
      statusMessage.textContent = 'No countries found matching "' + trimmed + '".';
      return;
    }

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    var countries = await response.json();
    statusMessage.textContent =
      "Found " + countries.length + (countries.length === 1 ? " country" : " countries") +
      ' matching "' + trimmed + '".';
    renderCountries(countries);
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong while searching. Please check your spelling, your connection, and try again.";
    console.error(error);
  }
}

// Guarded so requiring this file from test.js (in plain Node, with no real
// form to submit) never triggers a real network call, and never assumes a
// document or localStorage exist.
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("search-input");

    // Pre-fill the search box with the last search term, if one was saved
    // from a previous visit - this is the part that survives a reload,
    // unlike a plain JS variable.
    var lastSearch = localStorage.getItem(LAST_SEARCH_KEY);
    if (lastSearch) {
      input.value = lastSearch;
    }

    document.getElementById("search-form").addEventListener("submit", function (event) {
      event.preventDefault();
      searchCountries(input.value);
    });
  });
}

if (typeof module !== "undefined") {
  module.exports = { renderCountries: renderCountries };
}
