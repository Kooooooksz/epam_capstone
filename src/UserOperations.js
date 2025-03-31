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

export async function addUser(user) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  console.log("User added:", newUser);
}
