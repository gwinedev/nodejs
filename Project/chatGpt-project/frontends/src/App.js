import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.log("Error fetching tasks", error));
  }, []);

  //Add a new Tsk

  return (
    <div>
      <h1> Todo-List</h1>
    </div>
  );
}

//   // Add a new task
//   const addTask = () => {
//     axios.post('http://localhost:5000/tasks', { name: newTask })
//       .then(response => setTasks([...tasks, response.data]))
//       .catch(error => console.log('Error adding task', error));
//     setNewTask('');
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     axios.delete(`http://localhost:5000/tasks/${id}`)
//       .then(() => setTasks(tasks.filter(task => task._id !== id)))
//       .catch(error => console.log('Error deleting task', error));
//   };

//   return (
//     <div>
//       <h1>To-Do List</h1>
//       <input
//         type="text"
//         value={newTask}
//         onChange={e => setNewTask(e.target.value)}
//         placeholder="New task"
//       />
//       <button onClick={addTask}>Add Task</button>
//       <ul>
//         {tasks.map(task => (
//           <li key={task._id}>
//             {task.name}
//             <button onClick={() => deleteTask(task._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
