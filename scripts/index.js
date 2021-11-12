const firstNameElement = document.querySelector(".first_name");
const lastNameElement = document.querySelector(".last_name");
const emailElement = document.querySelector(".email");
const passwordElement = document.querySelector(".password");

const btn = document.querySelector(".btn");

/* ================= utility functions start here =================*/
// check input if empty
const isRequired = (value) => {
   return value === "" ? false : true;
};

// check email if valid
const isEmailValid = (email) => {
   const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

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

   if (isError) {
      warning.classList.add("message");
      elem.classList.add("icon_error");
   } else {
      warning.classList.remove("message");
      elem.classList.remove("icon_error");
   }
};

/* ================= validating functions start here =================*/
const checkTheName = (elem) => {
   const value = elem.value.trim();

   addRemoveClass(!isRequired(value), elem);
};

const checkEmail = (elem) => {
   const value = elem.value.trim();

   addRemoveClass(!isRequired(value), elem);
   addRemoveClass(!isEmailValid(value), elem);
};

const checkPassword = (elem) => {
   const value = elem.value.trim();

   addRemoveClass(!isRequired(value), elem);
   addRemoveClass(!isPasswordSecure(value), elem);
};

/* ================= claim button here =================*/
btn.addEventListener("click", (event) => {
   event.preventDefault();
   let isFirstNameValid = checkTheName(firstNameElement),
      isLastNameValid = checkTheName(lastNameElement),
      isEmailValid = checkEmail(emailElement),
      isPasswordValid = checkPassword(passwordElement);
});
