import { Request, Response } from "express";
import * as taskService from "../services/taskService";

// Get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get a single task by ID
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Create a new task
export const addTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const taskId = await taskService.addTask(title, description);
    return res
      .status(201)
      .json({ id: taskId, message: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create task" });
  }
};

// Update an existing task
export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updated = await taskService.updateTask(
      Number(id),
      title,
      description,
      completed
    );
    if (!updated) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const deleted = await taskService.deleteTask(Number(id));
    if (!deleted) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete task" });
  }
};
