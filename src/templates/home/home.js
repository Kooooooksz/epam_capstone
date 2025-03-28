import { fetchData } from "../fetchData.js";

const btnLogout = document.querySelector(".logout");
const courseListEl = document.querySelector(".course-list");
const myCoursesEl = document.querySelector(".my_courses");

let data = null;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let courses = [];

fetchData().then((fetchedData) => {
  if (!fetchedData || !fetchedData.courses) {
    console.error("There are no courses loaded!");
    return;
  }

  data = fetchedData;
  courses = data.courses;

  courses.forEach((elem) => {
    const courseElem = document.createElement("div");
    courseElem.classList.add("course-card");
    courseElem.innerHTML = `
      <h3>${elem.course_name}</h3>
      <p>${elem.description}</p>
      <a href="#" class="course-link">View Course</a>
    `;
    courseListEl.appendChild(courseElem);
  });
});
console.log(window.location);

btnLogout.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  console.log("User logged out.");
  console.log(
    "Current user after logout:",
    localStorage.getItem("currentUser")
  );
  location.assign("../login/login.html");
});

myCoursesEl.addEventListener("click", function (e) {
  location.assign("../my-courses/my-courses.html");
});

console.log("Current user:", currentUser);
