// declare variables
const main = document.querySelector("[data-js-main]"),
  template = document.querySelector("[data-js-template]"),
  form = document.querySelector("[data-js-form]"),
  emailInput = document.querySelector("[data-js-input]"),
  errorMessage = document.querySelector("[data-js-error]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEmail();

  const email = new FormData(e.target).get("email");

  if (email) {
    main.classList.add("active");
    main.innerHTML = template.innerHTML.replace(/{{email}}/, email);
  }
});

// regex function
function checkEmail(emailValue) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(String(emailValue).toLowerCase());
}

// validateEmail fuction
function validateEmail() {
  const emailValue = emailInput.value.trim();

  function success() {
    form.classList.add("active");
    form.classList.remove("inactive");
    emailInput.removeAttribute("aria-invalid");
    emailInput.removeAttribute("aria-describedby");
    template.setAttribute("role", "alert");
  }

  function error() {
    form.classList.add("inactive");
    emailInput.focus();
    emailInput.setAttribute("aria-invalid", "true");
    errorMessage.setAttribute("aria-describedby", "form__error");
  }

  if (emailValue === "" || !checkEmail(emailValue)) {
    errorMessage.textContent = "Valid email required";
    error();
  } else {
    errorMessage.textContent = "";
    success();
  }
}

// return to the Newsletter form
function returnToForm(e) {
  if (e.target.hasAttribute("data-js-reset")) {
    location.reload();
  }
}

main.addEventListener("click", returnToForm);

// create placeholder text
document.getElementById("email").placeholder = "email@company.com";

// set the input to empty string
document.getElementById("email").value = "";
