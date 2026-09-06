// test.js — run with: node test.js  (from inside this folder)
const { buildExamples, formatExample } = require("./script.js");

const examples = buildExamples();

function findExample(label) {
  return examples.find(function (example) {
    return example.label === label;
  });
}

// --- typeof checks ---
const typeofString = findExample('typeof "hello"');
if (!typeofString || typeofString.value !== "string") {
  console.error('FAIL: typeof "hello" should be "string"');
  process.exit(1);
}
console.log('PASS: typeof "hello" is "string"');

const typeofNull = findExample("typeof null");
if (!typeofNull || typeofNull.value !== "object") {
  console.error('FAIL: typeof null should be "object" (the well-known historical quirk)');
  process.exit(1);
}
console.log('PASS: typeof null is "object"');

// --- == vs === ---
const looseEqual = findExample('5 == "5"');
const strictEqual = findExample('5 === "5"');
if (!looseEqual || looseEqual.value !== true) {
  console.error('FAIL: 5 == "5" should be true');
  process.exit(1);
}
if (!strictEqual || strictEqual.value !== false) {
  console.error('FAIL: 5 === "5" should be false');
  process.exit(1);
}
console.log('PASS: 5 == "5" is true, 5 === "5" is false');

// --- arithmetic ---
const power = findExample("2 ** 3");
if (!power || power.value !== 8) {
  console.error("FAIL: 2 ** 3 should be 8");
  process.exit(1);
}
console.log("PASS: 2 ** 3 is 8");

// --- formatExample ---
const formatted = formatExample({ label: "1 + 1", value: 2 });
if (formatted !== "1 + 1 -> 2") {
  console.error('FAIL: formatExample should produce "1 + 1 -> 2"');
  process.exit(1);
}
console.log("PASS: formatExample formats a label/value pair correctly");
