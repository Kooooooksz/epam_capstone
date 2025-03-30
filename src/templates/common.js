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

export const insertNavMenu = function (header) {
  const navMenu = ` <nav>
        <div class="logo">
          <h1>LearnHub</h1>
        </div>
        <ul class="nav-links">
          <li><a href="home/home.html">Home</a></li>
          <li><a class="my_courses" href="#">My Courses</a></li>
          <li><a href="#">Profile</a></li>
          <li><a class="logout" href="#">Logout</a></li>
        </ul>
      </nav>`;
  header.insertAdjacentHTML("beforeend", navMenu);
};

export const navMenuClick = function (header) {
  header.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("logout")) {
      localStorage.removeItem("currentUser");
      console.log("User logged out.");
      console.log(
        "Current user after logout:",
        localStorage.getItem("currentUser")
      );
      location.assign("../login/login.html");
    }
    if (e.target.classList.contains("my_courses")) {
      location.assign("../my-courses/my-courses.html");
    }
  });
};
