# 5.6: Objects

**Difficulty:** Beginner+
**Module:** [Module 5: JavaScript Basics](../README.md)

## What You'll Learn
- How to create an object literal to group related data together
- The difference between dot notation and bracket notation for reading and writing properties
- How to add, update, and delete properties on an object
- How to store a function as a property (a method), and a first look at what `this` refers to inside one
- How to use `Object.keys()`, `Object.values()`, and `Object.entries()` to inspect an object's contents

## Prerequisites
Topic 5.5: Arrays & Array Methods

## Explanation
So far you've stored single values in variables, and lists of values in arrays. An
**object** lets you group related values together under named labels called
**properties**. You create one with an **object literal**: curly braces containing
`key: value` pairs separated by commas.

```js
const student = {
  name: "Ayesha Khan",
  age: 20,
  major: "Computer Science",
};
```

You can read or write a property two ways. **Dot notation** (`student.name`) is what
you'll use most of the time, whenever you already know the property's name while
writing your code. **Bracket notation** (`student["name"]`) does the same thing, but
takes the property name as a string, which means it also works when the name is stored
in a variable: `student[someVariable]`. Dot notation can't do that -- `student.someVariable`
would look for a property literally named `someVariable`.

Objects are not fixed once created. You can add a brand new property just by assigning
to it (`student.minor = "Mathematics"`), update an existing one the same way
(`student.gpa = 3.9`), and remove one entirely with the `delete` operator
(`delete student.isEnrolled`). Note that `delete` removes the property itself -- it's
different from setting it to `null` or `undefined`, which would leave the property in
place with an empty value.

A property's value can be a function. When it is, it's called a **method**, and you can
call it with the same dot notation you'd use to read any other property, followed by
`()`:

```js
const student = {
  name: "Ayesha Khan",
  describe: function () {
    return `${this.name} is a student.`;
  },
};

student.describe(); // "Ayesha Khan is a student."
```

Inside a method, the special keyword `this` refers to the object the method was called
on -- in the example above, `this` is `student`, so `this.name` reads `student.name`.
That's a simplification for now; exactly how JavaScript decides what `this` refers to
in different situations is a bigger topic that Module 6 covers in full. For this topic,
just remember: inside a method, `this` gives you a way to refer back to "the object I
was called on."

Finally, three built-in methods let you inspect any object's properties without knowing
their names in advance:

- `Object.keys(obj)` returns an array of just the property names.
- `Object.values(obj)` returns an array of just the property values.
- `Object.entries(obj)` returns an array of `[key, value]` pairs -- one small array per
  property. This is especially useful with a `for...of` loop, since you can destructure
  each pair directly: `for (const [key, value] of Object.entries(obj))`.

## The Demo
`script.js` defines one `student` object with five data properties and one method,
`describe()`.

`renderStudent(obj)` clears the `#output` element, then loops with
`for (const [key, value] of Object.entries(obj))`, skipping the `describe` method
(since it isn't data to display), and creates one `<li>` per remaining property. It
finishes by calling `obj.describe()` and appending the result as a paragraph -- this is
the one-line proof that `this` inside `describe()` correctly refers back to `student`.

Three buttons demonstrate that objects are editable after creation:
- **Update GPA** sets `student.gpa = 3.9` with dot notation, then re-renders.
- **Add a Minor** sets `student[propertyName] = "Mathematics"` with bracket notation
  (the property name is held in a variable first, to show why bracket notation is
  needed here).
- **Delete "isEnrolled"** runs `delete student.isEnrolled`, then re-renders with one
  fewer row.

Open the browser console to see the logged output of `Object.keys(student)` and
`Object.values(student)`.

## How to Run
Open `index.html` directly in your browser. No installation or server needed.

## How This Demo Is Tested
This topic has an automated test in `test.js`. Run it with `node test.js` from inside this
folder (or run every topic's tests at once from the repo root with `npm test`).

## Try It Yourself
Add a new button, "Add a Scholarship," that sets a new `scholarship` property on
`student` to some amount (e.g. `50000`), then re-renders the card. Then add a second
button that deletes it again.

## Key Takeaways
- Object literals group related values together as named properties
- Dot notation needs a literal property name; bracket notation accepts a variable or string
- Properties can be added, updated, or deleted on an object at any time after creation
- A method is just a function stored as a property, and `this` inside it refers to the object it was called on
- `Object.keys()`, `Object.values()`, and `Object.entries()` let you loop over an object's contents generically
