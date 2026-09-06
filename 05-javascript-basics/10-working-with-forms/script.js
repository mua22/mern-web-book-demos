document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const successMessage = document.getElementById("success-message");

  function showError(inputEl, errorEl, message) {
    errorEl.textContent = message;
    errorEl.classList.add("visible");
    inputEl.classList.add("invalid");
  }

  function clearError(inputEl, errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
    inputEl.classList.remove("invalid");
  }

  // A simple, intentionally not-exhaustive pattern check: some non-space
  // characters, an @, more non-space characters, a dot, more non-space
  // characters. Good enough to catch obviously-missing pieces of an email
  // address without needing a full regular-expression deep dive yet.
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (event) => {
    // Forms submit natively by default, which reloads the page -- almost
    // never what you want when JavaScript is handling the form. preventDefault()
    // stops that default behavior so our own validation code can run instead.
    event.preventDefault();

    successMessage.classList.remove("visible");
    successMessage.textContent = "";

    let isValid = true;

    // The <input type="email"> and the "novalidate" attribute on the <form>
    // let the browser's own built-in validation stay out of the way while
    // this custom validation runs instead. Reading each field's current
    // value is the same .value property used in Topics 5.8 and 5.9.
    const name = nameInput.value.trim();
    if (name === "") {
      showError(nameInput, nameError, "Name is required.");
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    const email = emailInput.value.trim();
    if (email === "") {
      showError(emailInput, emailError, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError(emailInput, emailError, "Enter a valid email address, like name@example.com.");
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    const password = passwordInput.value;
    if (password.length < 8) {
      showError(passwordInput, passwordError, "Password must be at least 8 characters.");
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (isValid) {
      successMessage.textContent = "Account created successfully!";
      successMessage.classList.add("visible");
      form.reset();
    }
  });
});
