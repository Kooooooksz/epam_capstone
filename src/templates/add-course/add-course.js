import {
  getCourses,
  addCourse,
  Course,
  updateCourse,
} from "../../CourseOperations.js";

import { getUsers, patchUserAssignedCourses } from "../../UserOperations.js";

const inputName = document.querySelector("#course-name");
const inputDescription = document.querySelector("#course-description");
const teacherSelect = document.querySelector("#teacher");

async function getAllTeachers() {
  const allUserrs = await getUsers();
  const allTeachers = allUserrs.filter((user) => user.role === "teacher");
  return allTeachers;
}

const teachers = await getAllTeachers();

teachers.forEach((teacher) => {
  const optionEl = `<option value=${teacher.id
    .toLowerCase()
    .split(" ")
    .join("_")}>${teacher.name}</option>`;
  teacherSelect.insertAdjacentHTML("afterbegin", optionEl);
});

console.log(teacherSelect);
//const inputImg = document.querySelector("#img");
const h2 = document.querySelector("h2");
if (localStorage.getItem("course")) {
  console.log(h2);
  h2.textContent = "Update Course";
}

let updateTo;
if (localStorage.getItem("course")) {
  updateTo = JSON.parse(localStorage.getItem("course"));
  inputName.value = updateTo.course_name;
  inputDescription.value = updateTo.description;
}

const courseForm = document.querySelector("form");
console.log(JSON.parse(localStorage.getItem("course")).id);

courseForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log(teacherSelect.value);
  //const file = inputImg.files[0];
  let imageUrl = "pfffff";
  /*if (file) {
      imageUrl = await convertImageToBase64(file);
    }*/

  const teacher = teachers.find((user) => user.id === teacherSelect.value);
  console.log(teacher);

  if (localStorage.getItem("course")) {
    console.log(updateTo);
    updateTo.course_name = inputName.value;
    updateTo.description = inputDescription.value;
    updateTo.teacher = teacherSelect.value;

    console.log(localStorage.getItem("course").id);
    teacher.assigned_courses.push(
      JSON.parse(localStorage.getItem("course")).id
    );
    console.log(teacher.assigned_courses);
    patchUserAssignedCourses(teacher.id, teacher.assigned_courses);
    await updateCourse(updateTo.id, updateTo);
  } else {
    const newCourse = new Course(
      inputName.value,
      inputDescription.value,
      teacherSelect.value
    );
    await addCourse(newCourse);
  }
  //location.assign("../home/home.html");
});

async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
