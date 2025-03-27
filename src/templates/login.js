import { fetchData } from "./fetchData.js";

let data;
fetchData().then((fetchedData) => {
  data = fetchedData;
});

if (window.location.pathname.includes("login.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    if (!loginForm) {
      console.error("A login form nem található!");
      return;
    }

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
          localStorage.setItem("currentUser", JSON.stringify(user));
          location.replace("index.html");
        } else {
          console.log("Incorrect password!");
        }
      });
    });
  });
}
