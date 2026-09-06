document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // An object literal: a comma-separated list of key: value pairs inside {}.
  // Values can be any type, including a function -- a function stored as a
  // property value is called a "method".
  const student = {
    name: "Ayesha Khan",
    age: 20,
    major: "Computer Science",
    gpa: 3.6,
    isEnrolled: true,
    describe: function () {
      // Inside a method, `this` refers to the object the method was called
      // on. Here, calling student.describe() means `this` is `student`, so
      // `this.name` and `this.major` read that same object's properties.
      // We cover exactly how `this` is determined in Module 6 -- for now,
      // just notice that a method can read its own object's data this way.
      return `${this.name} is a ${this.major} student.`;
    },
  };

  // Renders the current state of an object by looping over Object.entries(),
  // which returns an array of [key, value] pairs -- one per property.
  function renderStudent(obj) {
    output.innerHTML = "";

    const list = document.createElement("ul");
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "function") continue; // methods aren't "data" to list
      const item = document.createElement("li");
      item.textContent = `${key}: ${value}`;
      list.appendChild(item);
    }
    output.appendChild(list);

    const summary = document.createElement("p");
    summary.textContent = obj.describe ? obj.describe() : "";
    output.appendChild(summary);
  }

  renderStudent(student);

  document.getElementById("update-gpa-btn").addEventListener("click", () => {
    // Dot notation: use this when you already know the property name.
    student.gpa = 3.9;
    renderStudent(student);
  });

  document.getElementById("add-minor-btn").addEventListener("click", () => {
    // Bracket notation: required when the property name is stored in a
    // variable, or contains characters that aren't valid in dot notation.
    const propertyName = "minor";
    student[propertyName] = "Mathematics";
    renderStudent(student);
  });

  document.getElementById("delete-enrolled-btn").addEventListener("click", () => {
    // The delete operator removes a property from an object entirely --
    // it's different from setting a property to null or undefined.
    delete student.isEnrolled;
    renderStudent(student);
  });

  // Object.keys() and Object.values() return just the names, or just the
  // values, of an object's own properties.
  console.log("Object.keys(student):", Object.keys(student));
  console.log("Object.values(student):", Object.values(student));
});
