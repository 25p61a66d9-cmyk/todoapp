import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <h1>My TODO App</h1>
      <p>Organize your day, one task at a time!</p>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>My Tasks ({tasks.length})</h2>

      {tasks.length === 0 && (
        <p>No tasks yet. Add your first task!</p>
      )}

      {tasks.map((item) => (
        <div className="task" key={item.id}>
          <span
            onClick={() => toggleTask(item.id)}
            className={item.completed ? "completed" : ""}
          >
            {item.completed ? "✓ " : "○ "}
            {item.text}
          </span>

          <button
            className="delete"
            onClick={() => deleteTask(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
