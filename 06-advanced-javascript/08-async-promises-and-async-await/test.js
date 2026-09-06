// test.js — run with: node test.js  (from inside this folder)
//
// This topic never touches the network, so the test simply requires
// script.js directly in plain Node and checks that wait()/waitAndFail()
// behave like real Promises: wait() resolves after roughly the requested
// delay, and waitAndFail() rejects instead. Both use short, real delays
// (well under a second) so the test stays fast and fully deterministic.
const { wait, waitAndFail } = require("./script.js");

(async () => {
  const start = Date.now();
  const result = await wait(50);
  const elapsed = Date.now() - start;

  if (elapsed < 40) {
    console.error("FAIL: wait(50) resolved too early (after " + elapsed + "ms)");
    process.exit(1);
  }
  console.log("PASS: wait() resolves after roughly the requested delay");

  if (result !== "Waited 50ms") {
    console.error("FAIL: wait(50) should resolve with 'Waited 50ms', got: " + result);
    process.exit(1);
  }
  console.log("PASS: wait() resolves with the expected result value");

  try {
    await waitAndFail(30);
    console.error("FAIL: waitAndFail(30) should have rejected, but it resolved");
    process.exit(1);
  } catch (error) {
    if (!(error instanceof Error)) {
      console.error("FAIL: waitAndFail(30) should reject with an Error");
      process.exit(1);
    }
    console.log("PASS: waitAndFail() rejects with an Error after roughly the requested delay");
  }
})();
