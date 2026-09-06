// 6.5 Error Handling
//
// ValidationError is a custom error class. It extends the built-in Error class,
// so it behaves like a normal error (has a .message, a stack trace, works with
// try/catch) but callers can also check `error instanceof ValidationError` to
// tell "this input was bad" apart from other, unrelated failures.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// parseAge validates and converts a raw string into a positive whole number.
// It throws a ValidationError (with a message meant for a human) whenever the
// input is not usable, and returns the parsed number otherwise.
function parseAge(input) {
  const trimmed = String(input).trim();

  if (trimmed === "") {
    throw new ValidationError("Age is required.");
  }

  const value = Number(trimmed);

  if (Number.isNaN(value)) {
    throw new ValidationError(`"${trimmed}" is not a number.`);
  }

  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError("Age must be a positive whole number.");
  }

  return value;
}

// --- Wiring the demo up to the page -----------------------------------
// This block only runs in a browser, where the #age-form element exists.
// When this file is loaded by Node (for testing) `document` is undefined,
// so we guard it the same way we guard the module.exports at the bottom.
if (typeof document !== "undefined") {
  const form = document.getElementById("age-form");
  const input = document.getElementById("age-input");
  const result = document.getElementById("result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      const age = parseAge(input.value);
      result.textContent = `Valid age: ${age}`;
      result.className = "success";
    } catch (error) {
      // We catch here, at the UI boundary, because this is the one place
      // that knows how to turn a ValidationError into something a user can
      // read and act on. A deeper helper function has no good way to show
      // a message to the user, so it should let the error propagate up to
      // whoever called it instead of swallowing it.
      if (error instanceof ValidationError) {
        result.textContent = `Error: ${error.message}`;
        result.className = "error";
      } else {
        // An error we did not anticipate. Re-throwing lets it surface in the
        // console (and in a real app, get reported) instead of being hidden.
        throw error;
      }
    }
  });
}

if (typeof module !== "undefined") {
  module.exports = { parseAge, ValidationError };
}
