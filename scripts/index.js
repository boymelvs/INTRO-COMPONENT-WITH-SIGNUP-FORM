const firstNameElement = document.querySelector(".first_name");
const lastNameElement = document.querySelector(".last_name");
const emailElement = document.querySelector(".email");
const passwordElement = document.querySelector(".password");

const btn = document.querySelector(".btn");
const inputFields = document.querySelectorAll(".field");

/* ================= utility functions start here =================*/
// check input if empty
const isRequired = (value) => {
   return value === "" ? false : true;
};

// check email if valid
const isEmailValid = (email) => {
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
   } else {
      warning.classList.remove("message");
      elem.classList.remove("icon_error");
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

   return (
      addRemoveClass(!isRequired(value), elem) &&
      addRemoveClass(!isEmailValid(value), elem)
   );
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
inputFields.forEach((inputField) => {
   let timeOutId;

   inputField.addEventListener("input", (event) => {
      if (timeOutId) {
         clearTimeout(timeOutId);
      }

      timeOutId = setTimeout(() => {
         if (event.target.id === "first_name") {
            checkTheName(inputField);
         }

         if (event.target.id === "last_name") {
            checkTheName(inputField);
         }

         if (event.target.id === "email") {
            checkEmail(inputField);
         }

         if (event.target.id === "password") {
            checkPassword(inputField);
         }
      }, 750);
   });
});
