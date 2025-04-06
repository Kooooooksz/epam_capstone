import {
  addCourse,
  Course,
  updateCourse,
  initializeCourseId,
} from "../../CourseOperations.js";

import { getUsers, patchUserAssignedCourses } from "../../UserOperations.js";

const inputName = document.querySelector("#course-name");
const inputDescription = document.querySelector("#course-description");
const teacherSelect = document.querySelector("#teacher");

await initializeCourseId();

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
  console.log(updateTo);
  inputName.value = updateTo.course_name;
  inputDescription.value = updateTo.description;
}

const courseForm = document.querySelector("form");
console.log(localStorage.getItem("course")?.id);

courseForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const courseName = inputName.value.trim();
  const courseDescription = inputDescription.value.trim();
  const selectedTeacherId = teacherSelect.value;
  const selectedTeacherName =
    teacherSelect.options[teacherSelect.selectedIndex].textContent;

  const teacher = teachers.find((user) => user.id === selectedTeacherId);
  if (!teacher) {
    console.error("Teacher not found!");
    return;
  }

  //let imageUrl = "pfffff";

  const isUpdate = !!localStorage.getItem("course");

  if (isUpdate) {
    const originalCourse = JSON.parse(localStorage.getItem("course"));
    updateTo.course_name = courseName;
    updateTo.description = courseDescription;
    updateTo.teacher = selectedTeacherName;
    if (!teacher.assigned_courses.includes(originalCourse.course_name)) {
      teacher.assigned_courses.push(originalCourse.course_name);
    }

    await patchUserAssignedCourses(teacher.id, teacher.assigned_courses);
    console.log(updateTo.id);
    await updateCourse(updateTo.id, updateTo);
  } else {
    const newCourse = new Course(
      courseName,
      courseDescription,
      selectedTeacherName
    );
    teacher.assigned_courses.push(newCourse.course_name);

    await addCourse(newCourse);
    await patchUserAssignedCourses(teacher.id, teacher.assigned_courses);
  }

  location.assign("../home/home.html");
});

/*async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}*/
