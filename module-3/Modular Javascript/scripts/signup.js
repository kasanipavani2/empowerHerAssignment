const form = document.getElementById("signupForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup Successful!");
  window.location.href = "login.html";
});
