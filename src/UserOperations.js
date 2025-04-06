const BASE_URL = "https://course-datas.vercel.app/users";

export class User {
  constructor(name, password, role, email) {
    this.name = name;
    this.password = password;
    this.role = role;
    this.email = email;
    role === "student" ? (this.courses = []) : (this.aassigned_courses = []);
    this.created_at = Intl.DateTimeFormat("en-EN").format(new Date());
  }
}

export async function getUsers() {
  const response = await fetch(BASE_URL);
  const users = await response.json();
  return users;
}

export async function getUserByUsername(username) {
  const response = await fetch(`${BASE_URL}?name=${username}`);
  const users = await response.json();

  // Assumes that the username is unique
  return users.length ? users[0] : null; // Returns the first matching user
}

export async function addUser(user) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  console.log("User added:", newUser);
}

export async function updateUser(id, user) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const updatedUser = await response.json();
  console.log("User updated:", updatedUser);
}

export async function patchUserAssignedCourses(id, newCourses) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assigned_courses: newCourses }),
  });

  const updatedUser = await response.json();
  console.log("User patched:", updatedUser);
}
