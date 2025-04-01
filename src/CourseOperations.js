const BASE_URL = "http://localhost:3000/courses";

export class Course {
  constructor(name, description) {
    this.course_name = name;
    this.description = description;
    this.course_image = "picturewillbehere";
    this.teacher = "mary_jones";
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
