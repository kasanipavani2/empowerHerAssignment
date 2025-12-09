import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  limit
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeOCNUQavq9VvABuifFax0XV4vSrcV7nc",
  authDomain: "fir-book-app-ad6e0.firebaseapp.com",
  projectId: "fir-book-app-ad6e0",
  storageBucket: "fir-book-app-ad6e0.appspot.com",
  messagingSenderId: "1033619878272",
  appId: "1:1033619878272:web:25006ee1eaf47d73a99165"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const booksCol = collection(db, "books");


const grid = document.getElementById("grid");
const count = document.getElementById("count");
const addForm = document.getElementById("addForm");
const seedBtn = document.getElementById("seedBtn");


const modal = document.getElementById("modal");
const mTitle = document.getElementById("mTitle");
const mAuthor = document.getElementById("mAuthor");
const mPrice = document.getElementById("mPrice");
const mCover = document.getElementById("mCover");
document.getElementById("closeModal").addEventListener("click", () =>
  modal.classList.remove("show")
);

function renderBook(docSnap) {
  const data = docSnap.data();
  const id = docSnap.id;

  const card = document.createElement("div");
  card.className = "card";

  const cover = document.createElement("div");
  cover.className = "cover";
  cover.style.backgroundImage = `url('${data.coverImageURL}')`;

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = data.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `By ${data.author} • ₹${Number(data.price).toFixed(2)}`;

  const actions = document.createElement("div");
  actions.className = "actions";

  const viewBtn = document.createElement("button");
  viewBtn.textContent = "View";
  viewBtn.addEventListener("click", () => {
    mTitle.textContent = data.title;
    mAuthor.textContent = "Author: " + data.author;
    mPrice.textContent = "Price: ₹" + Number(data.price).toFixed(2);
    mCover.src = data.coverImageURL;
    modal.classList.add("show");
  });

  const updBtn = document.createElement("button");
  updBtn.textContent = "Update Author";
  updBtn.addEventListener("click", async () => {
    const newAuthor = prompt("Enter new author name", data.author);
    if (newAuthor && newAuthor.trim() !== "" && newAuthor !== data.author) {
      const d = doc(db, "books", id);
      await updateDoc(d, { author: newAuthor });
    }
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "secondary";
  delBtn.addEventListener("click", async () => {
    if (confirm("Delete this book?")) {
      const d = doc(db, "books", id);
      await deleteDoc(d);
    }
  });

  actions.append(viewBtn, updBtn, delBtn);
  card.append(cover, title, meta, actions);
  return card;
}

function renderList(snapshot) {
  grid.innerHTML = "";
  snapshot.forEach((docSnap) => grid.appendChild(renderBook(docSnap)));
  count.textContent = `${snapshot.size} book${snapshot.size === 1 ? "" : "s"}`;
}

onSnapshot(booksCol, (snapshot) => {
  renderList(snapshot);
});

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const price = parseFloat(document.getElementById("price").value.trim());
  const image = document.getElementById("image").value.trim();

  if (!title || !author || !image || isNaN(price)) {
    alert("All fields are required!");
    return;
  }

  try {
    console.log("Adding Book...");

    await addDoc(booksCol, {
      title: title,
      author: author,
      price: price,
      coverImageURL: image,
      createdAt: new Date()
    });

    alert("✅ Book Added Successfully!");

    addForm.reset(); 

    console.log(" Book Added to Firestore");

  } catch (error) {
    console.error("Error adding book:", error.message);
    alert("Failed to add book. Check Console!");
  }
});


seedBtn.addEventListener("click", async () => {
  const q = query(booksCol, limit(1));
  const snaps = await getDocs(q);
  if (!snaps.empty) {
    alert("Books already exist!");
    return;
  }

  const dummy = [
    { title: "The Alchemist", author: "Paulo Coelho", price: 199, coverImageURL: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&q=80" },
    { title: "Atomic Habits", author: "James Clear", price: 499, coverImageURL: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" },
    { title: "Clean Code", author: "Robert C. Martin", price: 599, coverImageURL: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80" },
    { title: "Deep Work", author: "Cal Newport", price: 349, coverImageURL: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80" },
    { title: "Design of Everyday Things", author: "Don Norman", price: 429, coverImageURL: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80" }
  ];

  for (const b of dummy) await addDoc(booksCol, b);
  alert("Dummy Books Added");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});
