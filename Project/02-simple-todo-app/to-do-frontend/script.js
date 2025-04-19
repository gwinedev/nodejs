const todoForm = document.getElementById("todo-form");
const task = document.getElementById("task");
const todoList = document.getElementById("todo-list");

// backend url
const API_BASE = "http://localhost:5000";

// fetch and show todos
function fetchTodos() {
  console.log("I am running");
  fetch(`${API_BASE}/todos`)
    .then((res) => res.json()) //fetch from backend and convert the response to json
    .then((data) => {
      todoList.innerHTML = "";
      data.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = `${todo.task} ${todo.done ? "✅" : "❌"}`;

        // add a delete button
        const deleBtn = document.createElement("button");
        deleBtn.textContent = "Delete";
        deleBtn.addEventListener("click", function () {
          fetch(`${API_BASE}/todos/${todo._id}`, { method: "DELETE" })
            .then(() => {
              fetchTodos();
            })
            .catch((err) => console.error("Error deleting todo:", err));
        });
        li.appendChild(deleBtn);

        // listening for click on done icon
        li.addEventListener("click", function () {
          const updatedTodo = { done: !todo.done }; //Toggle done
          // once toggled, the backend should be updated
          fetch(`${API_BASE}/todos/${todo._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo),
          })
            .then((response) => response.json())
            .then(() => {
              fetchTodos(); //reload todos after update
            })
            .catch((err) => console.error("Error updating todo.", err));
        });
        todoList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching todos:", error));
}

// add a new todo
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // collects the value from the input field and create a new todo with done being false
  let taskValue = task.value;
  const newTodo = { task: taskValue, done: false };

  fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchTodos(); //reload the todo list
      taskValue = " "; //clear the input field
    })
    .catch((err) => console.error("Error adding todo:", err));
});

fetchTodos();
