import { User, addUser, getUsers } from "../../UserOperations.js";

if (localStorage.getItem("currentUser")) {
  location.assign("../slider_page/slider_page.html");
}

const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputConfirmPass = document.querySelector("#confirm-password");
const radioBtns = document.querySelectorAll("input[name='role']");
[...radioBtns][0].checked = true;

const registerForm = document.querySelector("form");

console.log(radioBtns);

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const allUsers = await getUsers();
  console.log(allUsers);
  if (allUsers.find((user) => user.name === inputName.value)) {
    console.log("This name is already reserved!");
  } else if (allUsers.find((user) => user.email === inputEmail.value)) {
    console.log("This email is already reserved!");
  } else if (inputPassword.value !== inputConfirmPass.value) {
    console.log("Password and confirm password don't match!");
  } else {
    const checkedRole = [...radioBtns].find((radio) => radio.checked).value;
    const newUser = new User(
      inputName.value,
      inputPassword.value,
      checkedRole,
      inputEmail.value
    );
    await addUser(newUser);
  }
});
