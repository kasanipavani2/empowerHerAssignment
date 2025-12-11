export function displayTodos(data) {
  const container = document.getElementById("todos");
  container.innerHTML = "";

  data.forEach(todo => {
    const div = document.createElement("div");
    div.style.border = "1px solid #aaa";
    div.style.margin = "5px";
    div.style.padding = "10px";

    div.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Status: <strong>${todo.completed ? "Completed" : "Pending"}</strong></p>
    `;

    container.appendChild(div);
  });
}
