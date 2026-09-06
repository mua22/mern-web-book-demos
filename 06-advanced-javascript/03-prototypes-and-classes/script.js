// script.js - 6.3 Prototypes and Classes

// ---------------------------------------------------------------------------
// Part 1: the prototype chain, briefly, using Object.create()
// ---------------------------------------------------------------------------
// Every object in JavaScript has an internal link to another object, called
// its "prototype". When you read a property that isn't found directly ON
// the object itself, JavaScript automatically looks for it on the
// prototype next, and if it's not there either, on THAT object's own
// prototype, and so on. This chain of fallback lookups is called the
// "prototype chain", and it is how method lookup works for every object,
// array, and function in JavaScript - including the classes in Part 2.
var animalPrototype = {
  describe: function () {
    return this.name + " is a " + this.kind;
  },
};

// Object.create(animalPrototype) makes a brand-new, empty object whose
// prototype IS animalPrototype. genericAnimal does not have its own
// `describe` property - but calling genericAnimal.describe() still works,
// because JavaScript finds it on the prototype instead.
var genericAnimal = Object.create(animalPrototype);
genericAnimal.name = "Rex";
genericAnimal.kind = "generic animal";

// You can inspect this link with the standard Object.getPrototypeOf(), or
// (in most JavaScript engines) the older, non-standard __proto__ getter:
//   Object.getPrototypeOf(genericAnimal) === animalPrototype   -> true
//   genericAnimal.__proto__ === animalPrototype                -> true
function getPrototypeChainDemo() {
  return {
    describeResult: genericAnimal.describe(),
    sharesThePrototype: Object.getPrototypeOf(genericAnimal) === animalPrototype,
  };
}

var chainDemo = getPrototypeChainDemo();
console.log("genericAnimal.describe():", chainDemo.describeResult);
console.log("genericAnimal's prototype is animalPrototype:", chainDemo.sharesThePrototype);

// ---------------------------------------------------------------------------
// Part 2: the same idea, expressed with ES6 class syntax
// ---------------------------------------------------------------------------
// `class` is not a different inheritance system - underneath, it still uses
// the exact same prototype chain shown in Part 1. `class` is simply a
// cleaner, standard way to set that chain up, and it's what you will see in
// almost all modern JavaScript, and later in React.
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound.";
  }
}

// `extends Animal` makes Dog.prototype's own prototype be Animal.prototype -
// so every Dog instance can reach Animal's methods through that same
// lookup chain, unless Dog defines its own version of a method first.
class Dog extends Animal {
  constructor(name, breed) {
    // super(...) calls Animal's constructor. It MUST run before we use
    // `this` in Dog's own constructor, because it's what sets up `this` in
    // the first place (here, it's what assigns this.name).
    super(name);
    this.breed = breed;
  }

  // Overriding: because Dog defines its own speak(), calling dog.speak()
  // finds THIS version first - Animal's speak() is only used as a
  // fallback for objects that don't override it (like plain Animal
  // instances).
  speak() {
    // super.speak() explicitly calls the PARENT class's version too, so we
    // can build on top of it instead of throwing it away completely.
    return super.speak() + " Specifically, " + this.name + " the " + this.breed + " barks: Woof!";
  }
}

// ---------------------------------------------------------------------------
// Part 3: create a few instances of each class
// ---------------------------------------------------------------------------
function createSampleAnimals() {
  return [
    new Animal("Generic Creature"),
    new Dog("Buddy", "Golden Retriever"),
    new Dog("Milo", "Beagle"),
  ];
}

// ---------------------------------------------------------------------------
// Render each instance's speak() output to the page (skipped in Node, where
// this file is loaded by test.js and there is no `document`).
// ---------------------------------------------------------------------------
if (typeof document !== "undefined") {
  var list = document.getElementById("animal-list");
  var animals = createSampleAnimals();
  animals.forEach(function (animal) {
    var item = document.createElement("li");
    item.textContent = animal.speak();
    list.appendChild(item);
  });
}

if (typeof module !== "undefined") {
  module.exports = { Animal, Dog, createSampleAnimals, getPrototypeChainDemo };
}
