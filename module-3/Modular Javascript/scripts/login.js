const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let savedUser = JSON.parse(localStorage.getItem("user"));

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (savedUser && savedUser.email === email && savedUser.password === password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login Successful!");
    window.location.href = "todos.html";
  } else {
    alert("Invalid email or password!");
  }
});
