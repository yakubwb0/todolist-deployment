"use client"; // Enables React hooks and state management

import React, { useState, ChangeEvent } from "react";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: "Create Guest Experience mobile check-in", isCompleted: false },
    { id: 2, description: "Document current CICD process", isCompleted: false },
    { id: 3, description: "Perform Code Review for final Pillow-Talk release", isCompleted: false },
    { id: 4, description: "Implement new Color Palette from Design Team", isCompleted: false },
    { id: 5, description: "Fix image uploading process for guest check-in", isCompleted: false },
    { id: 6, description: "Provide on-boarding documentation", isCompleted: false },
  ]);

  const [newTask, setNewTask] = useState<string>(""); // Input for new task
  const [doneCount, setDoneCount] = useState<number>(0); // Tracks completed tasks

  // Add a new task
  const handleAddTask = (): void => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), description: newTask, isCompleted: false },
    ]);
    setNewTask(""); // Reset input field
  };

  // Delete a task
  const handleDeleteTask = (id: number): void => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setDoneCount(updatedTasks.filter((task) => task.isCompleted).length);
  };

  // Toggle task completion
  const handleToggleComplete = (id: number, event: ChangeEvent<HTMLInputElement>): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: event.target.checked } : task
    );
    setTasks(updatedTasks);
    setDoneCount(updatedTasks.filter((task) => task.isCompleted).length);
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Done: {doneCount}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add todo"
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #555",
            backgroundColor: "#202020",
            color: "#ffffff",
            outline: "none",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ADD TASK
        </button>
      </div>
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#202020",
              borderRadius: "5px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={(event) => handleToggleComplete(task.id, event)}
                style={{ marginRight: "10px" }}
              />
              <span>{task.description}</span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{
                backgroundColor: "#FF5252",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
