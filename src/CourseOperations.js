const BASE_URL = "http://localhost:3000/courses";

export class Course {
  constructor(name, description, course_image) {
    this.course_name = name;
    this.description = description;
    this.course_image = course_image;
    this.teacher = "";
    this.created_at = Intl.DateTimeFormat("en-EN").format(new Date());
    this.modules = [];
  }
}

export async function getCourses() {
  const response = await fetch(BASE_URL);
  const courses = await response.json();
  return courses;
}

export async function addCourse(course) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  const newCourse = await response.json();
  console.log("Course added:", newCourse);
}

export async function getCourseByCourseName(name) {
  const allCourses = await getCourses();
  return allCourses.find((course) => course.course_name === name);
}

export async function deleteCourse(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  console.log(`Course with ID ${id} deleted.`);
}

export async function updateCourse(id, course) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  const updatedUser = await response.json();
  console.log("User updated:", updatedUser);
}
