import { getCourses, addCourse, Course } from "../../CourseOperations.js";

const inputName = document.querySelector("#course-name");
const inputDescription = document.querySelector("#course-description");

const courseForm = document.querySelector("form");

courseForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newCourse = new Course(inputName.value, inputDescription.value);
  await addCourse(newCourse);
});
