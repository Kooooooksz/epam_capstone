import { checkUserSignedIn } from "../common.js";

const header = document.querySelector("header");
checkUserSignedIn(header);

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    document.getElementById("user-name").textContent = currentUser.name;
    document.getElementById("user-email").textContent = currentUser.email;
    document.getElementById("user-role").textContent = currentUser.role;
    document.getElementById("user-courses").textContent =
      currentUser.courses.join(", ");
    document.getElementById("user-created-at").textContent =
      currentUser.created_at;
    document.getElementById("user-id").textContent = currentUser.id;
  } else {
    alert("No user data found in localStorage.");
  }

  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", function () {
      window.location.href = "/edit-profile";
    });
});
