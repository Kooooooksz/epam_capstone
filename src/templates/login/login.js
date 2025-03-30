import { fetchData, insertNavMenu, navMenuClick } from "../common.js";

const header = document.querySelector("header");
insertNavMenu(header);
navMenuClick(header);

let data;
fetchData().then((fetchedData) => {
  data = fetchedData;
});

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const loginUsername = document.querySelector(".username");
  const loginPassword = document.querySelector(".password");

  if (!loginUsername || !loginPassword) {
    console.error("You have to fill both username and password!");
    return;
  }

  console.log(loginUsername.value);
  console.log(loginPassword.value);

  fetchData().then((fetchedData) => {
    const users = fetchedData.users;
    const user = users.find((user) => user.name === loginUsername.value);

    if (!user) {
      console.log("User was not found!");
      return;
    }
    if (user.password === loginPassword.value) {
      console.log("Login was successful!");
      console.log(JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.assign("../home/home.html");
      console.log(window.location);
    } else {
      console.log("Incorrect password!");
    }
  });
});
