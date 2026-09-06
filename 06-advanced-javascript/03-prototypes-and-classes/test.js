// test.js — run with: node test.js  (from inside this folder)
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// ---------------------------------------------------------------------------
// Part 1: test the classes and the prototype chain demo directly - no DOM
// needed. Requiring script.js also logs the prototype chain demo to the
// console, which is harmless.
// ---------------------------------------------------------------------------
const { Animal, Dog, createSampleAnimals, getPrototypeChainDemo } = require("./script.js");

const chainDemo = getPrototypeChainDemo();
if (chainDemo.describeResult !== "Rex is a generic animal") {
  console.error("FAIL: genericAnimal.describe() did not return the expected text");
  process.exit(1);
}
if (chainDemo.sharesThePrototype !== true) {
  console.error("FAIL: genericAnimal's prototype should be animalPrototype");
  process.exit(1);
}
console.log("PASS: Object.create() prototype chain demo works as expected");

const genericAnimal = new Animal("Generic Creature");
if (genericAnimal.speak() !== "Generic Creature makes a sound.") {
  console.error("FAIL: Animal#speak() did not return the expected text");
  process.exit(1);
}
console.log("PASS: Animal#speak() returns the expected text");

const dog = new Dog("Buddy", "Golden Retriever");
if (!(dog instanceof Animal)) {
  console.error("FAIL: a Dog should be an instance of Animal (via extends)");
  process.exit(1);
}
console.log("PASS: Dog extends Animal (instanceof check)");

const dogSpeech = dog.speak();
if (dogSpeech.indexOf("Buddy makes a sound.") === -1) {
  console.error("FAIL: Dog#speak() should include the parent's message via super.speak()");
  process.exit(1);
}
if (dogSpeech.indexOf("Woof!") === -1) {
  console.error("FAIL: Dog#speak() should add its own bark message");
  process.exit(1);
}
console.log("PASS: Dog#speak() overrides speak() and calls super.speak()");

const animals = createSampleAnimals();
if (animals.length !== 3) {
  console.error("FAIL: createSampleAnimals() should return exactly 3 animals");
  process.exit(1);
}
if (!(animals[0] instanceof Animal) || animals[0] instanceof Dog) {
  console.error("FAIL: the first sample animal should be a plain Animal, not a Dog");
  process.exit(1);
}
if (!(animals[1] instanceof Dog) || !(animals[2] instanceof Dog)) {
  console.error("FAIL: the second and third sample animals should be Dogs");
  process.exit(1);
}
console.log("PASS: createSampleAnimals() returns the expected mix of Animal and Dog instances");

// ---------------------------------------------------------------------------
// Part 2: load index.html with jsdom and confirm the rendered list matches.
// ---------------------------------------------------------------------------
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;

const scriptSrc = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
window.eval(scriptSrc);

const items = window.document.querySelectorAll("#animal-list li");
if (items.length !== 3) {
  console.error("FAIL: #animal-list should contain 3 <li> elements, found " + items.length);
  process.exit(1);
}
if (items[0].textContent !== "Generic Creature makes a sound.") {
  console.error("FAIL: the first <li> has unexpected text: " + items[0].textContent);
  process.exit(1);
}
if (items[1].textContent.indexOf("Buddy") === -1 || items[1].textContent.indexOf("Woof!") === -1) {
  console.error("FAIL: the second <li> should describe Buddy the dog barking");
  process.exit(1);
}
console.log("PASS: index.html renders one Animal and two Dogs with the correct text");
