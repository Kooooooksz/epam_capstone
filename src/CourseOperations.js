const BASE_URL = "https://course-datas.vercel.app/courses";

export class Course {
  static idValue;
  constructor(name, description, teacher) {
    this.id = Course.idValue++;
    this.course_name = name;
    this.description = description;
    this.teacher = teacher;
    this.created_at = Intl.DateTimeFormat("en-EN").format(new Date());
    this.modules = [];
  }
}

export async function initializeCourseId() {
  const courses = await getCourses();
  Course.idValue = courses.length + 1;
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
