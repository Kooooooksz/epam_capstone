const courseData = JSON.parse(localStorage.getItem("courseToWatch"));
console.log(courseData);

document.getElementById("course-name").textContent = courseData.course_name;
document.getElementById("course-description").textContent =
  courseData.description;
document.getElementById("teacher-name").textContent = courseData.teacher;
document.getElementById("created-at").textContent = courseData.created_at;
document.getElementById("course-image").src = courseData.course_image;

document.getElementById("back-home").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("courseToWatch");
  location.assign("../home/home.html");
});

const moduleList = document.getElementById("module-list");
courseData.modules.forEach((module) => {
  const li = document.createElement("li");
  li.textContent = `${module.title}: ${module.content}`;
  moduleList.appendChild(li);
});
