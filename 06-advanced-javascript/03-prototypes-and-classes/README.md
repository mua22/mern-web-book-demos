# 6.3: Prototypes and Classes

**Difficulty:** Intermediate
**Module:** [Module 6: Advanced JavaScript](../README.md)

## What You'll Learn
- What the prototype chain is, and how method lookup walks up it
- How `Object.create()` links one object to another as its prototype
- The modern `class` syntax: `constructor` and instance methods
- How `extends` builds one class on top of another
- How `super` calls the parent class's constructor and methods, including overriding one

## Prerequisites
Topic 6.2: this, call/apply/bind.

## Explanation

### The prototype chain: what happens when a property "isn't there"
Every object in JavaScript has a hidden link to another object, called its
**prototype**. When you read a property or call a method on an object, JavaScript first
checks if that object has it directly. If not, it checks the object's prototype next. If
the prototype doesn't have it either, JavaScript checks the prototype's *own* prototype,
and keeps going up this chain until it either finds the property or runs out of
prototypes. This chain of fallback lookups is called the **prototype chain**.

`Object.create(proto)` is the most direct way to see this in action - it builds a brand
new, empty object whose prototype is exactly the object you pass in:

```js
const animalPrototype = {
  describe() {
    return this.name + " is a " + this.kind;
  },
};

const genericAnimal = Object.create(animalPrototype);
genericAnimal.name = "Rex";
genericAnimal.kind = "generic animal";

genericAnimal.describe(); // "Rex is a generic animal"
```

`genericAnimal` does not have its own `describe` method - `Object.keys(genericAnimal)`
would only show `name` and `kind`. But calling `genericAnimal.describe()` still works,
because JavaScript doesn't find `describe` on `genericAnimal` itself, so it looks at
`genericAnimal`'s prototype (`animalPrototype`) next, and finds it there. You can check
this link directly with `Object.getPrototypeOf(genericAnimal) === animalPrototype`
(`true`), or with the older, non-standard but still widely supported
`genericAnimal.__proto__ === animalPrototype` (also `true`).

### `class`: the same mechanism, with cleaner syntax
Manually wiring up prototypes with `Object.create()` works, but it's not how most
JavaScript is written today. The `class` keyword (added in ES6) sets up the exact same
kind of prototype link automatically, with syntax that reads much more like
class-based languages:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound.";
  }
}

const generic = new Animal("Rex");
generic.speak(); // "Rex makes a sound."
```

- `constructor(name) { ... }` runs automatically every time you write `new Animal(...)`.
  It's where you set up the new object's own properties (here, `this.name`).
- `speak()` is an **instance method** - every `Animal` you create shares this one
  function via the prototype chain, instead of each instance getting its own copy.

### `extends` and `super`: building one class on another
`extends` lets one class inherit everything another class already has, then add to it or
change specific pieces:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls Animal's constructor first
    this.breed = breed;
  }

  speak() {
    return super.speak() + " Specifically, " + this.name + " barks: Woof!";
  }
}
```

- `extends Animal` links `Dog`'s prototype chain to `Animal`, so any method `Dog`
  doesn't define itself (there are none missing here, but there could be) still works
  through the same fallback lookup described above.
- `super(name)` inside `Dog`'s constructor calls `Animal`'s constructor. This must
  happen before you use `this` anywhere else in `Dog`'s constructor - it's what actually
  sets `this` up in the first place.
- `speak()` in `Dog` **overrides** `Animal`'s `speak()`: calling `dog.speak()` finds
  `Dog`'s version first (the lookup never even reaches `Animal`'s version on its own).
  But inside that override, `super.speak()` explicitly reaches up and calls `Animal`'s
  original `speak()` anyway, letting `Dog` build on top of it instead of throwing it
  away completely.

## The Demo
Open `script.js`. It has three parts:

- `Object.create()` demo: builds `animalPrototype` and one `genericAnimal` linked to it,
  then confirms `genericAnimal.describe()` works purely through the prototype chain
  (logged to the console).
- `class Animal` defines `constructor(name)` and `speak()`.
- `class Dog extends Animal` adds a `breed`, calls `super(name)` in its constructor, and
  overrides `speak()` while still calling `super.speak()` inside its own version.
- `createSampleAnimals()` creates one `Animal` and two `Dog`s, and the last block renders
  each one's `speak()` output as a list item on the page.

That last block is wrapped in `if (typeof document !== "undefined") { ... }` so this same
`script.js` file can also be loaded directly by `test.js` in plain Node, where there is
no `document` to render into.

## How to Run
Open `index.html` directly in your browser, and also open the DevTools console (F12) to
see the `Object.create()` prototype chain demo logged when the page loads.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside
this folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a `Cat` class that also `extends Animal`, overrides `speak()` to say
`"<name> meows: Meow!"` (still calling `super.speak()` first, the same way `Dog` does),
and add one `Cat` instance to the list returned by `createSampleAnimals()`.

## Key Takeaways
- The prototype chain is how JavaScript looks up a property it can't find directly on an
  object - by checking that object's prototype, then its prototype's prototype, and so on
- `Object.create(proto)` builds a new object with `proto` as its prototype directly
- `class` is standard, modern syntax for the same prototype mechanism, not a separate
  inheritance system
- `extends` links a subclass's prototype chain to its parent class
- `super(...)` calls the parent's constructor; `super.method()` calls the parent's
  version of an overridden method
