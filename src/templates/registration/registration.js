import { User, addUser } from "../../UserOperations.js";

const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputConfirmPass = document.querySelector("#confirm-password");

const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newUser = new User(
    inputName.value,
    inputPassword.value,
    inputPassword.value
  );

  await addUser(newUser);
});
