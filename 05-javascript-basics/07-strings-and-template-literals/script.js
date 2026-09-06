document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("text-input");
  const button = document.getElementById("analyze-btn");
  const output = document.getElementById("output");

  function analyze() {
    const raw = input.value;
    const trimmed = raw.trim(); // removes leading/trailing whitespace

    const length = trimmed.length;
    const upper = trimmed.toUpperCase();
    const lower = trimmed.toLowerCase();
    const firstFive = trimmed.slice(0, 5); // slice(start, end) -- end not included
    const words = trimmed.split(" ").filter((word) => word !== "");
    const containsThe = trimmed.toLowerCase().includes("the");
    const noSpaces = trimmed.replace(/ /g, "");

    // Old-style concatenation with + would look like this instead:
    //   "Length: " + length + ", Uppercase: " + upper
    // A template literal (backticks, with ${} to insert values) reads much
    // more like the final sentence, and can also span multiple lines without
    // any special escape characters.
    output.innerHTML = `
      <ul>
        <li>Original (trimmed): "${trimmed}"</li>
        <li>Length: ${length}</li>
        <li>Uppercase: ${upper}</li>
        <li>Lowercase: ${lower}</li>
        <li>First 5 characters (slice(0, 5)): "${firstFive}"</li>
        <li>Split into words: ${words.length} word(s) -> [${words.join(", ")}]</li>
        <li>Contains "the" (case-insensitive): ${containsThe}</li>
        <li>With spaces removed (replace): "${noSpaces}"</li>
      </ul>
    `;
  }

  // A multi-line template literal -- useful for anything that reads like a
  // block of text, such as a message or a small template. This is logged
  // once on load, separately from the interactive analysis above.
  const welcomeNote = `Welcome to the string methods playground.
Type a sentence above, then press "Analyze" (or just keep typing) to see
several string methods applied to it, one line per method.`;
  console.log(welcomeNote);

  button.addEventListener("click", analyze);
  input.addEventListener("input", analyze);
});
