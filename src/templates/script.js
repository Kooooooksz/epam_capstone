import { fetchData } from "./fetchData.js";

document.addEventListener("DOMContentLoaded", function () {
  const btnLogout = document.querySelector(".logout");
  const courseListEl = document.querySelector(".course-list");

  let data, currentUser;
  currentUser = localStorage.getItem(currentUser);
  fetchData().then((fetchedData) => {
    data = fetchedData;
    if (!data || !data.courses) {
      console.error("There are no courses loaded!");
      return;
    }
    console.log(data.courses);
    data.courses.forEach((elem) => {
      const course = `
        <div class="course-card">
          <h3>${elem.course_name}</h3>
          <p>${elem.description}</p>
          <a href="#" class="course-link">View Course</a>
        </div>
      `;

      let courseElem = document.createElement("div");
      courseElem.innerHTML = course;

      courseListEl.insertAdjacentElement("beforeend", courseElem);
    });
  });

  console.log(currentUser);

  btnLogout.addEventListener("click", function (e) {
    e.preventDefault();
    currentUser = null;
    location.replace("login.html");
    console.log(currentUser);
  });
});
