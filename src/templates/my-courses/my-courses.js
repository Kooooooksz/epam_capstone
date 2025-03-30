import { fetchData, insertNavMenu, navMenuClick } from "../common.js";

const header = document.querySelector("header");
insertNavMenu(header);
navMenuClick(header);

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const courseList = document.querySelector("#course-list");
let data = null;
let courses;
fetchData().then((fetchedData) => {
  if (!fetchedData || !fetchedData.courses) {
    console.error("There are no courses loaded!");
    return;
  }

  data = fetchedData;
  courses = data.courses;
  const coursesByUser = courses.filter((course) =>
    currentUser.courses.includes(course.course_id)
  );

  coursesByUser.forEach((course) => {
    const courseEl = `<div class="course-card">
          <h3>${course.course_name}</h3>
          <p>${course.description}</p>
        </div>`;
    courseList.insertAdjacentHTML("beforeend", courseEl);
  });
});

console.log(currentUser.courses);
