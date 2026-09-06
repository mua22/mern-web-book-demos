document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("item-input");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("item-list");
  const log = document.getElementById("log");

  function addItem() {
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Notice: no click listener is attached to removeBtn here. This button
    // is added to the page well after the page first loaded, and it will be
    // handled entirely by the single listener on #item-list set up below.
    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);

    log.textContent = `${list.children.length} item(s) in the list.`;
    input.value = "";
    input.focus();
  }

  // addEventListener attaches a function that runs whenever the named event
  // fires. Different event types fire for different reasons:
  //   - "click"   : the user clicked an element
  //   - "submit"  : a <form> was submitted (covered in 5.10)
  //   - "input"   : a form field's value changed
  //   - "keydown" : a key was pressed down
  addBtn.addEventListener("click", addItem);

  input.addEventListener("keydown", (event) => {
    // The event object describes what happened. event.key holds the name of
    // the key that was pressed.
    if (event.key === "Enter") {
      addItem();
    }
  });

  // Event delegation: instead of attaching a click listener to every single
  // "Remove" button (there could end up being many, and new ones keep getting
  // created after the page has already loaded), we attach ONE listener to
  // their shared parent, #item-list. Clicks on any child bubble up to the
  // parent, where we check event.target -- the exact element that was
  // actually clicked -- to see whether it was a remove button.
  //
  // This matters because an element created with document.createElement
  // after the page loaded has no event listeners of its own unless code
  // explicitly attaches one to it. If we only ever attached listeners when
  // the page first loaded, buttons added later (like every "Remove" button
  // here) would do nothing when clicked. Listening on the parent instead
  // sidesteps the problem entirely: the parent was already on the page, so
  // its listener is already active no matter how many children get added
  // afterward.
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const li = event.target.closest("li");
      li.remove();
      log.textContent = `${list.children.length} item(s) in the list.`;
    }
  });
});
