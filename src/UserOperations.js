const BASE_URL = "http://localhost:3000/users";

export async function addUser(name, email) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  const newUser = await response.json();
  console.log("User added:", newUser);
}
