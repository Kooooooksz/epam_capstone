export let data;

export async function fetchData() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return { users: [], courses: [] };
  }
}
