import { displayTodos } from "../modules/displayTodos.js";

if (localStorage.getItem("loggedIn") !== "true") {
  alert("Please login first!");
  window.location.href = "login.html";
}

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => {
    displayTodos(data.slice(0, 20)); 
  })
  .catch(err => console.log(err));
