"use client";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    await addTask(newTaskTitle, newTaskDescription);
    setNewTaskTitle("");
    setNewTaskDescription("");
    fetchTasks();
  };

  const handleToggleComplete = async (task: Task) => {
    await updateTask(
      task.id,
      task.title,
      task.description || "",
      !task.completed
    );
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Task Management</h1>

      {/* Add Task Form */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md mb-6">
        <input
          type="text"
          className="w-full border rounded p-2 mb-2 text-black"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          type="text"
          className="w-full border rounded p-2 mb-2 text-black"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center bg-white shadow p-4 mb-2 rounded-lg cursor-pointer transition ${
              task.completed ? "opacity-50 line-through" : "hover:bg-gray-50"
            }`}
            onClick={() => handleToggleComplete(task)}
          >
            <span className="flex-1 text-black">
              {task.title} - {task.description}
            </span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click triggering complete action
                handleDeleteTask(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
