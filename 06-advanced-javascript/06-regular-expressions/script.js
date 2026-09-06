// 6.6 Regular Expressions
//
// EMAIL_PATTERN is a regex *literal*: text between slashes, with optional flags
// after the closing slash. This one has no flags because we are testing a whole
// string at once, not scanning for repeated matches inside a longer text.
//
//   ^                start of string
//   [\w.+-]+         one or more "local part" characters: \w (word chars: letters,
//                    digits, underscore) plus literal . + -
//   @                a literal @
//   [\w-]+           one or more word characters or hyphens (the domain name)
//   \.               a literal dot (escaped, because a plain . means "any character")
//   [a-zA-Z]{2,}     two or more letters (the top-level domain, e.g. "com", "edu")
//   $                end of string
const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;

// isValidEmail uses .test(), which just returns true/false: does the whole
// string match the pattern?
function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

// redactDigits replaces every digit except the last 4 with an asterisk, using
// .replace() with a regex and a replacer function. \d matches any digit
// (equivalent to [0-9]); the "g" flag means "find every match in the string",
// not just the first one.
function redactDigits(input) {
  const digits = input.match(/\d/g) || []; // .match() with "g" returns an array of every match
  const totalDigits = digits.length;
  let seen = 0;

  return input.replace(/\d/g, (digit) => {
    seen++;
    const remainingAfterThis = totalDigits - seen;
    return remainingAfterThis < 4 ? digit : "*";
  });
}

// --- Wiring the demo up to the page -----------------------------------
if (typeof document !== "undefined") {
  const emailInput = document.getElementById("email-input");
  const emailFeedback = document.getElementById("email-feedback");

  emailInput.addEventListener("input", () => {
    const value = emailInput.value;

    if (value === "") {
      emailFeedback.textContent = "";
      emailFeedback.className = "";
      emailInput.className = "";
      return;
    }

    if (isValidEmail(value)) {
      emailFeedback.textContent = "Valid format";
      emailFeedback.className = "valid";
      emailInput.className = "valid";
    } else {
      emailFeedback.textContent = "Not a valid format";
      emailFeedback.className = "invalid";
      emailInput.className = "invalid";
    }
  });

  const phoneInput = document.getElementById("phone-input");
  const phoneOutput = document.getElementById("phone-output");

  phoneInput.addEventListener("input", () => {
    phoneOutput.textContent = phoneInput.value === "" ? "" : redactDigits(phoneInput.value);
  });
}

if (typeof module !== "undefined") {
  module.exports = { isValidEmail, redactDigits, EMAIL_PATTERN };
}
