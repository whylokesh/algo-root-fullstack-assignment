import axios from "axios";
import { Task } from "../types/task";

// ok
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const addTask = async (title: string, description: string) => {
  await axios.post(`${API_URL}/tasks`, { title, description });
};

export const updateTask = async (
  id: number,
  title: string,
  description: string,
  completed: boolean
) => {
  await axios.put(`${API_URL}/tasks/${id}`, { title, description, completed });
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
