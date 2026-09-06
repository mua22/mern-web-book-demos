const { isValidEmail, redactDigits } = require("./script.js");

let failures = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failures++;
  }
}

// isValidEmail
check(isValidEmail("a@b.com") === true, "a@b.com should be valid");
check(isValidEmail("student@example.edu") === true, "student@example.edu should be valid");
check(isValidEmail("first.last+tag@my-school.org") === true, "email with . + - should be valid");
check(isValidEmail("nope") === false, "'nope' should be invalid (no @ or domain)");
check(isValidEmail("missing@domain") === false, "missing a top-level domain should be invalid");
check(isValidEmail("@nolocalpart.com") === false, "missing local part should be invalid");
check(isValidEmail("has space@example.com") === false, "email with a space should be invalid");
check(isValidEmail("") === false, "empty string should be invalid");

// redactDigits
check(redactDigits("555-123-4567") === "***-***-4567", "should redact all but last 4 digits");
check(redactDigits("1234") === "1234", "4 digits or fewer should be left untouched");
check(redactDigits("12345") === "*2345", "5 digits should mask only the first one");
check(redactDigits("no digits here") === "no digits here", "text with no digits is unchanged");

if (failures > 0) {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}

console.log("PASS: isValidEmail and redactDigits behave correctly");
