const { parseAge, ValidationError } = require("./script.js");

let failures = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failures++;
  }
}

// Valid input should return the parsed number.
check(parseAge("25") === 25, "parseAge('25') should return 25");
check(parseAge("  7  ") === 7, "parseAge should trim whitespace and return 7");

// Non-numeric input should throw a ValidationError.
try {
  parseAge("not a number");
  check(false, "parseAge('not a number') should throw");
} catch (err) {
  check(err instanceof ValidationError, "error should be a ValidationError instance");
  check(err instanceof Error, "ValidationError should also be an instance of Error");
}

// Negative numbers are invalid.
try {
  parseAge("-5");
  check(false, "parseAge('-5') should throw");
} catch (err) {
  check(err instanceof ValidationError, "negative age should throw ValidationError");
}

// Empty input is invalid.
try {
  parseAge("");
  check(false, "parseAge('') should throw");
} catch (err) {
  check(err instanceof ValidationError, "empty age should throw ValidationError");
  check(err.message.length > 0, "error should have a human-readable message");
}

// Non-integer numbers are invalid.
try {
  parseAge("25.5");
  check(false, "parseAge('25.5') should throw");
} catch (err) {
  check(err instanceof ValidationError, "non-integer age should throw ValidationError");
}

if (failures > 0) {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}

console.log("PASS: parseAge validates and throws correctly");
