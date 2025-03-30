import { fetchData, insertNavMenu, navMenuClick } from "../common.js";

const courseListEl = document.querySelector(".course-list");
const sortSelect = document.querySelector(".sort-select");
const searchInput = document.querySelector(".search-input");
const header = document.querySelector("header");

searchInput.value = "";
let data = null;
let courses = [];
let currentPage = 1;
const itemsPerPage = 10;

insertNavMenu(header);
navMenuClick(header);

async function loadCourses(coursesP) {
  data = await fetchData();

  if (!data || !data.courses) {
    console.error("There are no courses loaded!");
    return;
  }

  courses = coursesP === undefined ? data.courses : coursesP;
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
      <h3 class="course-name">${elem.course_name}</h3>
      <p>${elem.description}</p>
      <img src=../../assets/course_images/${elem.course_image} height="300" width="300">
      <p>This course was created at: ${elem.created_at}</p>
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

loadCourses();

const sortCourses = async function (category, order, courseP) {
  let data = await fetchData();
  let courses = courseP === undefined ? data.courses : courseP;
  courses = courses.sort((a, b) => {
    if (order === "desc") {
      const temp = a;
      a = b;
      b = temp;
    }
    if (a[category] < b[category]) {
      return -1;
    }
    if (a[category] > b[category]) {
      return 1;
    }
    return 0;
  });

  console.log(courses);
  loadCourses(courses);
};

sortSelect.addEventListener("click", function (e) {
  if (e.target.nodeName === "OPTION") {
    if (searchInput.value.trim() === "") {
      sortCourses(...e.target.value.split("-"));
    } else {
      filterCourses().then((courses) => {
        sortCourses(...e.target.value.split("-"), courses);
      });
    }
  }
});

const filterCourses = async function (e) {
  let { courses } = await fetchData();
  courses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  loadCourses(courses);

  return courses;
};
const courseList = document.querySelector(".course-list");

document.addEventListener("click", function (e) {
  if (document.activeElement === searchInput) {
    searchInput.addEventListener("keydown", filterCourses);
    [...courseList.children].forEach((card) => {
      if (card.classList.contains("course-card")) {
        const courseNameEl = card.querySelector(".course-name");
        const regex = new RegExp(searchInput.value, "gi");
        courseNameEl.innerHTML = courseNameEl.textContent.replace(
          regex,
          (match) => `<span class="highlight">${match}</span>`
        );
        console.log(courseNameEl.innerHTML);
      }
    });
  }
});

console.log(document.activeElement);
