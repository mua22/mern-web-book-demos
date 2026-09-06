#!/usr/bin/env node
/**
 * Runs every `test.js` found under a numbered module/topic folder
 * (e.g. 07-jquery/02-dom-manipulation/test.js) in its own child process,
 * from inside that topic's own folder, and reports a pass/fail summary.
 *
 * This is dev-only tooling for verifying the demos in this repo — students
 * do not need it to run any individual tutorial.
 */
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

function findTestFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findTestFiles(full, results);
    } else if (entry.name === "test.js") {
      results.push(full);
    }
  }
  return results;
}

const testFiles = findTestFiles(ROOT);

if (testFiles.length === 0) {
  console.log("No test.js files found yet.");
  process.exit(0);
}

let failed = 0;
for (const file of testFiles) {
  const rel = path.relative(ROOT, file);
  try {
    const output = execFileSync(process.execPath, [path.basename(file)], {
      cwd: path.dirname(file),
      encoding: "utf8",
    });
    console.log(`PASS  ${rel}`);
    if (output.trim()) console.log(output.trim().split("\n").map((l) => `        ${l}`).join("\n"));
  } catch (err) {
    failed += 1;
    console.log(`FAIL  ${rel}`);
    const out = (err.stdout || "") + (err.stderr || "");
    console.log(out.trim().split("\n").map((l) => `        ${l}`).join("\n"));
  }
}

console.log(`\n${testFiles.length - failed}/${testFiles.length} demo tests passed.`);
process.exit(failed ? 1 : 0);
