import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleForm = document.getElementById("toggleForm");
const toggleText = document.getElementById("toggleText");

let isLogin = true;

// Toggle between login and signup
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  submitBtn.textContent = isLogin ? "Login" : "Create Account";
  toggleText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
  toggleForm.textContent = isLogin ? "Sign Up" : "Login";
});

// Handle form submit


submitBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return alert("Enter email & password");

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html"; // Redirect on success
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html"; // Redirect on success
    }
  } catch (err) {
    alert(err.message);
  }
});



// Redirect if already logged in
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "dashboard.html";
});
