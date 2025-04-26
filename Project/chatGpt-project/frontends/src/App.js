import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const url = "http://localhost:5000/tasks";

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setTasks(res.data))
      .catch((error) => console.log("Error fetching tasks", error));
  }, []);

  //Add a new Tsk
  const addTask = () => {
    axios
      .post(url, { name: newTask })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.log("Error adding task", err));
    setNewTask("");
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.log("Error deleting task", err));
  };

  return (
    <div>
      <h1> Todo-List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
