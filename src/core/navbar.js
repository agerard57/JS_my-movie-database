import {
  getUserData,
  deleteUserData,
} from "/assets/scripts/utils/userDataStorage.js";

const newHeader = new Headers();
const url = "/data/genres";
/* JSON Method
const url = "/assets/data/genres.json"; */
const options = {
  method: "GET",
  headers: newHeader,
  mode: "cors",
  cache: "default",
};

const navbar = `
<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
   <div class="container-fluid">
      <a class="navbar-brand" href="/">My Movie Database</a>
      <button
         class="navbar-toggler"
         type="button"
         data-bs-toggle="collapse"
         data-bs-target="#navbarCollapse"
         aria-controls="navbarCollapse"
         aria-expanded="false"
         aria-label="Toggle navigation"
         />
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
         <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
               <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="/list">List</a>
            </li>
            <li class="nav-item dropdown">
               <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
               Genre
               </a>
               <ul id="genres-list" class="dropdown-menu" aria-labelledby="navbarDropdown"></ul>
            </li>
            <li id="admin-movie-buttons" class="nav-item">
               <button id="add-movie-button" class="btn btn-outline-success" type="button">Add a movie</button>
               <button id="remove-movie-button" class="btn btn-outline-warning" type="button">Delete a movie</button>
            </li>
            <li class="nav-item">
            </li>
         </ul>
         <form class="d-flex">
            <button class="btn btn-outline-light" type="submit">GO</button>
            <input
               class="form-control me-2"
               type="search"
               placeholder="Search"
               aria-label="Movie name"
               type="submit"
               />
            <button id="auth-button" type="button"></button>
         </form>
      </div>
   </div>
</nav>
`;

new Promise((resolve) => {
  resolve(
    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((genres) => {
        genres.forEach((genre) => {
          const ulGenresList = document.querySelector("#genres-list");
          const liGenresList = document.createElement("li");
          const listElement = document.createElement("a");

          listElement.setAttribute("class", "dropdown-item");
          listElement.innerHTML = genre.name;
          liGenresList.appendChild(listElement);

          listElement.addEventListener("click", () => {
            window.location.href =
              window.location.origin + `/genre/${genre.id}`;
          });

          ulGenresList.appendChild(liGenresList);
        });
      })
  );
});

document.body.insertAdjacentHTML("afterbegin", navbar);

const authBtn = document.querySelector("#auth-button");
const adminMovieButtons = document.querySelector("#admin-movie-buttons");
const addMovieBtn = document.querySelector("#add-movie-button");
const removeMovieBtn = document.querySelector("#remove-movie-button");

if (getUserData("user") === null) {
  authBtn.setAttribute("class", "btn btn-outline-primary");
  authBtn.innerHTML = "Login";
  authBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/login";
  });
} else {
  authBtn.setAttribute("class", "btn btn-outline-danger");
  authBtn.innerHTML = "Logout";
  authBtn.addEventListener("click", () => {
    deleteUserData();
  });
  addMovieBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/movie/add";
  });
  removeMovieBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/movie/remove";
  });
}

if (getUserData("type") === "admin")
  adminMovieButtons.style.display = "initial";
else adminMovieButtons.style.display = "none";

var input = document.getElementById("myInput");

// TODO SearchBar
/* input.addEventListener("keyup", function (event) {
  // 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action
    event.preventDefault();
  }
}); */

/* btn - outline - primary;
btn - outline - danger; */

// TODO BETTER NAMING FOR NAVBAR.MODULE
// TODO Clean this file (it's a mess)
// TODO REGROUP DUPLICATE FILES (genres+list)
