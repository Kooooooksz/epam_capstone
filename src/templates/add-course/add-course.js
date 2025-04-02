import {
  getCourses,
  addCourse,
  Course,
  updateCourse,
} from "../../CourseOperations.js";

const inputName = document.querySelector("#course-name");
const inputDescription = document.querySelector("#course-description");
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
if (window.location.toString().split("/").at(-1) === "add-course.html") {
  courseForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    //const file = inputImg.files[0];
    let imageUrl = "pfffff";
    /*if (file) {
      imageUrl = await convertImageToBase64(file);
    }*/

    if (localStorage.getItem("course")) {
      console.log(updateTo);
      updateTo.course_name = inputName.value;
      updateTo.description = inputDescription.value;
      console.log(localStorage.getItem("course").id);
      await updateCourse(updateTo.id, updateTo);
    } else {
      const newCourse = new Course(
        inputName.value,
        inputDescription.value,
        imageUrl
      );
      await addCourse(newCourse);
    }
    location.assign("../home/home.html");
  });

  async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export function kurvaAnyad(num) {
  courseForm.addEventListener("submit", async function (e) {
    console.log(num);
  });
}
