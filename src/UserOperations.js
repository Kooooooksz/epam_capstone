const BASE_URL = "http://localhost:3000/users";

export class User {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.role = "student";
    this.email = email;
    this.courses = [];
    this.created_at = Intl.DateTimeFormat("en-EN").format(new Date());
  }
}

export async function getUsers() {
  const response = await fetch(BASE_URL);
  const users = await response.json();
  return users;
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
}
