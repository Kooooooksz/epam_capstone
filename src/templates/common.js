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

export const insertNavMenu = function (header) {
  console.log();
  const navMenu = ` <nav>
    <div class="logo">
        <h1>LearnHub</h1>
    </div>
    <ul class="nav-links">
        <li><a class="home" href="#">Home</a></li>
        <li><a class="my_courses" href="#">My Courses</a></li>
        <li><a class="contacts" href="#">Contacts</a></li>
        <li class="user-menu">
            <a href="#">${
              JSON.parse(localStorage.getItem("currentUser")).name
            }</a>
            <ul class="submenu">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a class="logout" href="#">Logout</a></li>
            </ul>
        </li>
    </ul>
</nav>
`;
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
    if (e.target.classList.contains("home")) {
      location.assign("../home/home.html");
    }
    if (e.target.classList.contains("contacts")) {
      location.assign("../contacts/contacts.html");
    }
  });
};
