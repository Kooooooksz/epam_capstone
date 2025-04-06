import { getCourses } from "../../CourseOperations.js";
import { checkUserSignedIn } from "../common.js";

const header = document.querySelector("header");
checkUserSignedIn(header);

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const courseList = document.querySelector("#course-list");
let data = null;
let courses;
async function getMyCourses() {
  courses = await getCourses();
  const coursesByUser = courses.filter((course) =>
    currentUser.courses.includes(course.id)
  );

  coursesByUser.forEach((course) => {
    const courseEl = `<div class="course-card">
          <h3>${course.course_name}</h3>
          <p>${course.description}</p>
        </div>`;
    courseList.insertAdjacentHTML("beforeend", courseEl);
  });
}

await getMyCourses();

console.log(currentUser.courses);
