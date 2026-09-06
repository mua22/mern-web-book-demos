const { toPrettyJSON, safeParseJSON } = require("./script.js");

let failures = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failures++;
  }
}

// toPrettyJSON
const sample = { name: "Aliza Khan", semester: 5, enrolled: true };
const pretty = toPrettyJSON(sample);
check(typeof pretty === "string", "toPrettyJSON should return a string");
check(pretty.includes("\n"), "pretty-printed JSON should contain newlines (indent argument)");
check(pretty.includes('"name": "Aliza Khan"'), "pretty JSON should contain the name field");

// Round trip: stringify then parse should reproduce the original data.
const roundTripped = JSON.parse(toPrettyJSON(sample));
check(roundTripped.name === sample.name, "round trip should preserve name");
check(roundTripped.semester === sample.semester, "round trip should preserve semester");
check(roundTripped.enrolled === sample.enrolled, "round trip should preserve enrolled");

// safeParseJSON: valid JSON
const parsed = safeParseJSON('{"a":1}');
check(parsed !== null, "safeParseJSON should parse valid JSON");
check(parsed.a === 1, "safeParseJSON should return the correct parsed value");

// safeParseJSON: malformed JSON
check(safeParseJSON("{bad") === null, "safeParseJSON should return null for malformed JSON");
check(safeParseJSON('{"a": 1') === null, "safeParseJSON should return null for a missing closing brace");

if (failures > 0) {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}

console.log("PASS: toPrettyJSON and safeParseJSON behave correctly");
