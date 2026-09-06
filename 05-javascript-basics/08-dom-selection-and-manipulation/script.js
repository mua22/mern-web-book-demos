document.addEventListener("DOMContentLoaded", () => {
  // Three ways to select elements: getElementById, and querySelector, which
  // accepts any CSS selector and works for ids, classes, tags, and more.
  const input = document.getElementById("item-input");
  const addBtn = document.querySelector("#add-btn");
  const list = document.querySelector("#item-list");
  const countLabel = document.getElementById("item-count");

  function updateCount() {
    // querySelectorAll returns every matching element as a static list.
    const count = list.querySelectorAll("li").length;
    // .textContent writes plain text into an element, replacing whatever was there.
    countLabel.textContent = `${count} item${count === 1 ? "" : "s"}`;
  }

  function addItem() {
    // .value reads the current text typed into an <input>.
    const text = input.value.trim();
    if (text === "") return;

    // Build the new <li> out of smaller pieces created with document.createElement.
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("item-text");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Bound directly on this specific button, right when it's created. This
    // works here because we control the exact moment the button is added --
    // topic 5.9 covers a different approach (event delegation) for when that
    // isn't convenient.
    removeBtn.addEventListener("click", () => {
      li.remove(); // removes this one <li> from the page
      updateCount();
    });

    // Clicking the item's text toggles a "done" class on/off, striking the text through.
    span.addEventListener("click", () => {
      li.classList.toggle("done");
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li); // attaches the finished <li> to the page

    input.value = ""; // .value can be written to as well as read
    input.focus();
    updateCount();
  }

  addBtn.addEventListener("click", addItem);
  updateCount();
});
