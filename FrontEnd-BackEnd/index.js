const API_URL = "https://jsonplaceholder.typicode.com/todos"; 
const STORAGE_KEY = "cloudTodos";

async function loadTodos() {
  const res = await fetch(API_URL);
  const data = await res.json();           
  const firstTwenty = data.slice(0, 20);   
  localStorage.setItem(STORAGE_KEY, JSON.stringify(firstTwenty));
  renderTodos();
}

function getTodosFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTodosToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodosFromStorage();
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", onToggleTodo);

    const title = document.createElement("span");
    title.textContent = todo.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", onDeleteTodo);

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function onDeleteTodo(e) {
  const li = e.target.closest("li");
  const id = Number(li.dataset.id);
  let todos = getTodosFromStorage();
  todos = todos.filter(t => t.id !== id);
  saveTodosToStorage(todos);
  renderTodos();
}

function onToggleTodo(e) {
  const li = e.target.closest("li");
  const id = Number(li.dataset.id);
  const todos = getTodosFromStorage();
  const idx = todos.findIndex(t => t.id === id);
  if (idx !== -1) {
    todos[idx].completed = !todos[idx].completed;
    saveTodosToStorage(todos);
    renderTodos();
  }
}

document.getElementById("loadBtn").addEventListener("click", loadTodos);

renderTodos();