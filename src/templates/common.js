export async function fetchData() {
  try {
    const response = await fetch("../../data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return { users: [], courses: [] };
  }
}

export const checkUserSignedIn = (header) => {
  if (!localStorage.getItem("currentUser")) {
    location.assign("../login/login.html");
  } else {
    insertNavMenu(header);
  }
};

const insertNavMenu = function (header) {
  const currentPath = window.location.pathname;

  const isActive = (path) => (currentPath.includes(path) ? "active" : "");

  const navMenu = `   
  <nav>
    <div class="logo">
        <h1>LearnHub</h1>
    </div>
    <ul class="nav-links">
    <li><a class="slider_page ${isActive(
      "slider_page"
    )}" href="../slider_page/slider_page.html">Introduction</a></li>
        <li><a class="home ${isActive(
          "home"
        )}" href="../home/home.html">Courses</a></li>
        <li><a class="my_courses ${isActive(
          "my-courses"
        )}" href="../my-courses/my-courses.html">My Courses</a></li>
        <li><a class="contacts ${isActive(
          "contacts"
        )}" href="../contacts/contacts.html">Contacts</a></li>
        <li class="user-menu">
            <a href="#">${
              localStorage.getItem("currentUser")
                ? JSON.parse(localStorage.getItem("currentUser")).name
                : ""
            }</a>
            <ul class="submenu">
                <li><a href="../profile/profile.html">Profile</a></li>
                <li><a class="logout" href="#">Logout</a></li>
            </ul>
        </li>
    </ul>
  </nav>
`;

  header.insertAdjacentHTML("beforeend", navMenu);

  header.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout")) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      location.assign("../login/login.html");
    }
  });
};
