import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const chartEl = document.getElementById("chart");
const noData = document.getElementById("noData");

let userId;
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "index.html";
  userId = user.uid;
  loadAnalytics();
});

async function loadAnalytics() {
  const date = localStorage.getItem("selectedDate");
  if (!date) return;

  const ref = doc(db, "users", userId, "days", date);
  const docSnap = await getDoc(ref);
  const data = docSnap.data()?.activities;

  if (!data || data.length === 0) {
    noData.classList.remove("hidden");
    chartEl.style.display = "none";
    return;
  }

  // Prepare chart data
  const categories = {};
  data.forEach(act => {
    categories[act.category] = (categories[act.category] || 0) + act.duration;
  });

  new Chart(chartEl, {
    type: 'pie',
    data: {
      labels: Object.keys(categories),
      datasets: [{
        label: 'Minutes per category',
        data: Object.values(categories),
        backgroundColor: ['#4a68e8','#ff6b6b','#fcd34d','#10b981','#a78bfa','#f87171']
      }]
    }
  });
}
