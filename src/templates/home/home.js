import { fetchData } from "../fetchData.js";

const btnLogout = document.querySelector(".logout");
const courseListEl = document.querySelector(".course-list");
const myCoursesEl = document.querySelector(".my_courses");

let data = null;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let courses = [];
let currentPage = 1;
const itemsPerPage = 10;

async function loadCourses() {
  data = await fetchData();

  if (!data || !data.courses) {
    console.error("There are no courses loaded!");
    return;
  }

  courses = data.courses;
  renderPage(currentPage);
  setupPagination();
}

function renderPage(page) {
  courseListEl.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCourses = courses.slice(start, end);

  paginatedCourses.forEach((elem) => {
    const courseElem = document.createElement("div");
    courseElem.classList.add("course-card");
    courseElem.innerHTML = `
      <h3>${elem.course_name}</h3>
      <p>${elem.description}</p>
      <a href="#" class="course-link">View Course</a>
    `;
    courseListEl.appendChild(courseElem);
  });

  updatePaginationControls();
}

function setupPagination() {
  document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  document.getElementById("next").addEventListener("click", () => {
    if (currentPage < Math.ceil(courses.length / itemsPerPage)) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  document.getElementById(
    "page-info"
  ).textContent = `Page ${currentPage} of ${Math.ceil(
    courses.length / itemsPerPage
  )}`;
  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled =
    currentPage === Math.ceil(courses.length / itemsPerPage);
}

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

loadCourses();
