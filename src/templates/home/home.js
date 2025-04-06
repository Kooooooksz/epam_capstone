import { checkUserSignedIn } from "../common.js";
import {
  getCourses,
  getCourseByCourseName,
  deleteCourse,
} from "../../CourseOperations.js";
import { updateUser, getUserByUsername } from "../../UserOperations.js";

const courseListEl = document.querySelector(".course-list");
const sortSelect = document.querySelector(".sort-select");
const searchInput = document.querySelector(".search-input");
const ctaBtn = document.querySelector(".cta-btn");
const header = document.querySelector("header");
const filterSelect = document.querySelector(".search-category");

searchInput.value = "";
checkUserSignedIn(header);

let courses = [];
let currentPage = 1;
const itemsPerPage = 10;

const storageUser = JSON.parse(localStorage.getItem("currentUser"));

let currentUser = null;

async function loadCurrentUser() {
  currentUser = await getUserByUsername(storageUser.name);
  console.log();
  if (!currentUser) {
    console.log("User not found");
    return;
  }

  loadCourses();
}

loadCurrentUser();

async function loadCourses(coursesP) {
  courses = coursesP === undefined ? await getCourses() : coursesP;
  if (coursesP) {
    renderPage(currentPage, true);
  } else {
    renderPage(currentPage);
  }
  setupPagination();
}

function renderPage(page, filtered = false) {
  courseListEl.innerHTML = "";

  const paginatedCourses = getPaginatedCourses(page);

  paginatedCourses.forEach((course) => {
    const courseElem = createCourseCard(course);
    courseListEl.appendChild(courseElem);
  });

  if (shouldShowAddCourseCard(page, filtered)) {
    const addCourseCard = createAddCourseCard();
    courseListEl.appendChild(addCourseCard);
  }

  if (filtered) {
    highlightSearchMatches();
  }

  updatePaginationControls();
}

function getPaginatedCourses(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return courses.slice(start, end);
}

function createCourseCard(course) {
  const courseElem = document.createElement("div");
  courseElem.classList.add("course-card");

  const isEnrolled = currentUser.courses.includes(course.id);
  const isAdmin = currentUser.role === "admin";

  courseElem.innerHTML = `
    <h3 class="course_name">${course.course_name}</h3>
    <p class="description">${course.description}</p>
    <img src="../../assets/course_images/${
      course.course_image
    }" height="300" width="300">
    <p>This course was created at:<span class="created_at"> ${
      course.created_at
    }</span></p>
    <p>Teacher of this course:<span class="teacher"> ${
      course.teacher
    }</span></p>
    <span>
      ${isEnrolled ? `<a class="course-link" href="#">View Course</a>` : ""}
      ${
        isAdmin
          ? `<a class="course-update" href="#">Update Course</a>
           <a class="course-delete" href="#">Delete Course</a>`
          : ""
      }
    </span>
    ${
      !isEnrolled
        ? `<a class="course-enroll" href="#">Enroll</a>`
        : `<a class="course-disenroll" href="#">Disenroll</a>`
    }
  `;
  return courseElem;
}

function shouldShowAddCourseCard(page, filtered) {
  return page === Math.ceil(courses.length / itemsPerPage) && !filtered;
}

function createAddCourseCard() {
  const addCourseCard = document.createElement("div");
  addCourseCard.classList.add("course-card", "add-course-card");
  addCourseCard.innerHTML = `
    <div class="add-course-content">
      <span class="plus-sign">+</span>
      <p>Add New Course</p>
    </div>
  `;
  return addCourseCard;
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

ctaBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const clcoords = courseListEl.getBoundingClientRect();
  console.log(clcoords);

  window.scrollTo({
    left: clcoords.left + window.pageXOffset,
    top: clcoords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

const sortCourses = async (category, order = "asc", courseP) => {
  const courses = [...(courseP ?? data.courses)];

  const sortedCourses = courses.sort((a, b) =>
    compareValues(a, b, category, order)
  );

  console.log(sortedCourses);
  loadCourses(sortedCourses);
};

function compareValues(a, b, category, order) {
  const valA = a[category];
  const valB = b[category];

  console.log(valA, valB);

  if (valA < valB) return order === "asc" ? -1 : 1;
  if (valA > valB) return order === "asc" ? 1 : -1;
  return 0;
}

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

const filterCourses = async function () {
  let { courses } = await getCourses();
  courses = courses.filter((course) =>
    course[filterSelect.value]
      .toLowerCase()
      .includes(searchInput.value.toLowerCase())
  );

  loadCourses(courses);
  updatePaginationControls();
  setupPagination();
  return courses;
};

function highlightSearchMatches() {
  [...courseListEl.children].forEach((card) => {
    if (card.classList.contains("course-card")) {
      const courseNameEl = card.querySelector(`.${filterSelect.value}`);
      const regex = new RegExp(searchInput.value, "gi");
      courseNameEl.innerHTML = courseNameEl.textContent.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
    }
  });
}

searchInput.addEventListener("input", filterCourses);

courseListEl.addEventListener("click", async function (e) {
  e.preventDefault();
  const target = e.target;

  const courseCard = target.closest(".course-card");
  if (!courseCard) return;

  try {
    if (courseCard.classList.contains("add-course-card")) {
      handleAddCourse();
    } else if (target.classList.contains("course-update")) {
      await handleCourseUpdate(target);
    } else if (target.classList.contains("course-link")) {
      await handleCourseLink(target);
    } else if (target.classList.contains("course-enroll")) {
      await handleEnroll(target);
    } else if (target.classList.contains("course-disenroll")) {
      await handleDisenroll(target);
    } else if (target.classList.contains("course-delete")) {
      await handleDelete(target);
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
});

function handleAddCourse() {
  localStorage.removeItem("course");
  location.assign("../add-course/add-course.html");
}

async function handleCourseUpdate(target) {
  const course = await findCourse(target);
  localStorage.setItem("course", JSON.stringify(course));
  location.assign("../add-course/add-course.html");
}

async function handleCourseLink(target) {
  const course = await findCourse(target);
  localStorage.setItem("courseToWatch", JSON.stringify(course));
  location.assign("../course-details/course-details.html");
}

async function handleEnroll(target) {
  const course = await findCourse(target);
  currentUser.courses.push(course.id);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  await updateUser(currentUser.id, currentUser);
}

async function handleDisenroll(target) {
  const course = await findCourse(target);
  const index = currentUser.courses.findIndex((id) => id === course.id);
  if (index !== -1) currentUser.courses.splice(index, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  await updateUser(currentUser.id, currentUser);
}

async function handleDelete(target) {
  const course = await findCourse(target);
  const confirmed = window.confirm(
    `Are you sure you want to delete the course: ${course.course_name}?`
  );
  if (confirmed) {
    await deleteCourse(course.id);
  } else {
    console.log("Course deletion canceled.");
  }
}

async function findCourse(elem) {
  const clickedCard = elem.closest(".course-card");
  const clickedCourseName =
    clickedCard.querySelector(".course_name").textContent;
  const courseAsObject = await getCourseByCourseName(clickedCourseName);
  return courseAsObject;
}
