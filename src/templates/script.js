const courseListEl = document.querySelector(".course-list");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const courses = data.courses;
    courses.forEach((elem) => {
      const course = `<div class="course-card">
      <h3>${elem.course_name}</h3>
      <p>
        ${elem.description}
      </p>
      <a href="#" class="course-link">View Course</a>
    </div>`;

      let courseElem = document.createElement("div");
      courseElem.innerHTML = course;

      // Append the new course card to the list
      courseListEl.insertAdjacentElement("beforeend", courseElem);
    });
  })
  .catch((error) => console.error("Hiba történt:", error));
