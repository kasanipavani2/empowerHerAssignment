import { auth, db } from "./firebase.js";
import {
  doc, setDoc, getDoc, updateDoc, arrayUnion, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const activityDate = document.getElementById("activityDate");
const activityName = document.getElementById("activityName");
const activityCategory = document.getElementById("activityCategory");
const activityDuration = document.getElementById("activityDuration");
const addActivityBtn = document.getElementById("addActivityBtn");
const activityItems = document.getElementById("activityItems");
const remainingTime = document.getElementById("remainingTime");
const analyseBtn = document.getElementById("analyseBtn");
const logoutBtn = document.getElementById("logoutBtn");

let userId = null;
let selectedDate = null;

// Auth protection
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "index.html";
  userId = user.uid;
});

activityDate.addEventListener("change", () => {
  selectedDate = activityDate.value;
  loadActivities();
});

function loadActivities() {
  if (!selectedDate || !userId) return;

  const ref = doc(db, "users", userId, "days", selectedDate);
  onSnapshot(ref, docSnap => {
    const data = docSnap.data();
    const list = data?.activities || [];
    activityItems.innerHTML = "";
    let total = 0;

    list.forEach(act => {
      total += act.duration;
      activityItems.innerHTML += `<li>${act.name} - ${act.duration} mins (${act.category})</li>`;
    });

    const remaining = 1440 - total;
    remainingTime.textContent = `Remaining minutes: ${remaining}`;
    analyseBtn.disabled = remaining > 0;
  });
}

addActivityBtn.addEventListener("click", async () => {
  if (!selectedDate || !userId) return alert("Select a date first!");

  const name = activityName.value.trim();
  const category = activityCategory.value;
  const duration = Number(activityDuration.value);

  if (!name || duration <= 0) return alert("Enter valid name & duration");

  const ref = doc(db, "users", userId, "days", selectedDate);
  const docSnap = await getDoc(ref);
  const current = docSnap.data()?.activities || [];
  const total = current.reduce((sum, act) => sum + act.duration, 0);

  if (total + duration > 1440) return alert("Cannot exceed 24 hours (1440 mins)");

  await setDoc(ref, { activities: arrayUnion({ name, category, duration }) }, { merge: true });

  activityName.value = "";
  activityDuration.value = "";
});

// Analyse button
analyseBtn.addEventListener("click", () => {
  if (selectedDate) {
    localStorage.setItem("selectedDate", selectedDate);
    window.location.href = "analytics.html";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

