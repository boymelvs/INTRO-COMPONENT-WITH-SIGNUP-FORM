const firstNameElement = document.querySelector(".first_name");
const lastNameElement = document.querySelector(".last_name");
const emailElement = document.querySelector(".email");
const passwordElement = document.querySelector(".password");

const btn = document.querySelector(".btn");
const form = document.querySelector(".forms");

/* ================= utility functions start here =================*/
// check input if empty
const isRequired = (value) => {
   return value === "" ? false : true;
};

// check email if valid
const isEmailCorrect = (email) => {
   const format = /[^@ \t\r\n]+@[^@ \t\r\n]+\.(\w{2,3})+$/;

   return format.test(email);
};

// check password if valid
const isPasswordSecure = (password) => {
   const format = new RegExp("^(?=.*[a-zA-Z0-9])(?=.{8,})");

   return format.test(password);
};

// add or remove class
const addRemoveClass = (isError, elem) => {
   const formField = elem.parentElement;
   const warning = formField.querySelector(".warning p");

   let noError = false;

   if (isError) {
      warning.classList.add("message");
      elem.classList.add("icon_error");
      elem.classList.remove("green_border");
   } else {
      warning.classList.remove("message");
      elem.classList.remove("icon_error");
      elem.classList.add("green_border");
      noError = true;
   }

   return noError;
};

/* ================= validating functions start here =================*/
const checkTheName = (elem) => {
   const value = elem.value.trim();

   return addRemoveClass(!isRequired(value), elem);
};

const checkEmail = (elem) => {
   const value = elem.value.trim();
   const formField = elem.parentElement;
   const warning = formField.querySelector(".warning p");

   const isEmpty = !isRequired(value)
      ? (warning.innerHTML = "Email cannot be empty")
      : !isEmailCorrect(value)
      ? (warning.innerHTML = "Looks like this is not an email")
      : false;

   return addRemoveClass(isEmpty, elem) && addRemoveClass(isEmpty, elem);
};

const checkPassword = (elem) => {
   const value = elem.value.trim();

   return (
      addRemoveClass(!isRequired(value), elem) &&
      addRemoveClass(!isPasswordSecure(value), elem)
   );
};

/* ================= claim button here =================*/
btn.addEventListener("click", (event) => {
   event.preventDefault();

   let isFirstNameValid = checkTheName(firstNameElement),
      isLastNameValid = checkTheName(lastNameElement),
      isEmailValid = checkEmail(emailElement),
      isPasswordValid = checkPassword(passwordElement);

   if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
      alert("Claim free trial?");
      location.reload();
   }
});

/* ================= real time validation ================= */
let timeOutId;
form.addEventListener("input", (event) => {
   //reset timer
   if (timeOutId) {
      clearTimeout(timeOutId);
   }
   // setup time to delay the validation
   timeOutId = setTimeout(() => {
      if (event.target.id === "first_name") {
         checkTheName(firstNameElement);
      }
      if (event.target.id === "last_name") {
         checkTheName(lastNameElement);
      }
      if (event.target.id === "email") {
         checkEmail(emailElement);
      }
      if (event.target.id === "password") {
         checkPassword(passwordElement);
      }
   }, 750);
});
