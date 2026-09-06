// 6.7 JSON
//
// JSON (JavaScript Object Notation) is a plain-text format for representing data:
// objects, arrays, strings, numbers, booleans, and null. It looks a lot like a
// JavaScript object literal, but it is stricter — for example, property names
// must be in double quotes, and it cannot contain functions or the `undefined`
// value. Because it's just text, JSON is the standard way a browser and a server
// exchange data: the browser turns a JavaScript object into a JSON string to
// *send* it, and turns a JSON string it *receives* back into a JavaScript object.

// toPrettyJSON converts a JavaScript value into a JSON string. The third
// argument to JSON.stringify (here, 2) is the number of spaces to indent by,
// which makes the output human-readable instead of one long line.
function toPrettyJSON(value) {
  return JSON.stringify(value, null, 2);
}

// safeParseJSON wraps JSON.parse in a try/catch. JSON.parse throws a
// SyntaxError when the text it's given isn't valid JSON (a missing brace, a
// trailing comma, unquoted keys, and so on) — without a try/catch, that
// error would crash whatever function called it. Here we catch it and return
// null instead, letting the caller decide what "no valid data" means for them.
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

// --- Wiring the demo up to the page -----------------------------------
if (typeof document !== "undefined") {
  const form = document.getElementById("student-form");
  const nameInput = document.getElementById("name-input");
  const semesterInput = document.getElementById("semester-input");
  const enrolledInput = document.getElementById("enrolled-input");

  const objectOutput = document.getElementById("object-output");
  const jsonOutput = document.getElementById("json-output");
  const parsedOutput = document.getElementById("parsed-output");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Step 1: build a plain JavaScript object from the form.
    const student = {
      name: nameInput.value,
      semester: Number(semesterInput.value),
      enrolled: enrolledInput.checked,
    };

    // Step 2: convert it to a JSON string (pretty-printed).
    const jsonString = toPrettyJSON(student);

    // Step 3: parse that string back into a JavaScript object, to prove the
    // round trip preserves the data.
    const parsedBack = JSON.parse(jsonString);

    // Note: we can't display the object itself as text (that would just show
    // "[object Object]"), so we use a compact JSON string as a readable stand-in.
    objectOutput.textContent = JSON.stringify(student);
    jsonOutput.textContent = jsonString;
    parsedOutput.textContent = JSON.stringify(parsedBack);
  });

  // Malformed JSON example: parse a deliberately broken string and show the
  // caught error message instead of letting it crash the page.
  const brokenJsonText = document.getElementById("broken-json").textContent;
  const parseErrorOutput = document.getElementById("parse-error-output");

  try {
    JSON.parse(brokenJsonText);
    parseErrorOutput.textContent = "Unexpectedly parsed without error.";
  } catch (error) {
    parseErrorOutput.textContent = `Caught error: ${error.message}`;
  }
}

if (typeof module !== "undefined") {
  module.exports = { toPrettyJSON, safeParseJSON };
}
