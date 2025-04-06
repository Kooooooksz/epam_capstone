import { getUsers } from "../../UserOperations.js";

if (localStorage.getItem("currentUser")) {
  location.assign("../slider_page/slider_page.html");
}

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const loginUsername = document.querySelector(".username");
  const loginPassword = document.querySelector(".password");

  if (!loginUsername || !loginPassword) {
    console.error("You have to fill both username and password!");
    return;
  }

  const allUsers = await getUsers();
  const user = allUsers.find((user) => user.name === loginUsername.value);

  if (!user) {
    console.log("User was not found!");
    return;
  }
  if (user.password === loginPassword.value) {
    console.log("Login was successful!");
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.assign("../home/home.html");
    console.log(window.location);
  } else {
    console.log("Incorrect password!");
  }
});
