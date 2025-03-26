"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTaskById = exports.getAllTasks = void 0;
const db_1 = __importDefault(require("../../config/db"));
// Fetch all tasks
const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM tasks", (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getAllTasks = getAllTasks;
// Fetch a single task by ID
const getTaskById = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row || null);
        });
    });
};
exports.getTaskById = getTaskById;
// Add a new task
const addTask = (title, description) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("INSERT INTO tasks (title, description, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [title, description || ""], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID); // Return new task ID
        });
    });
};
exports.addTask = addTask;
// Update an existing task
const updateTask = (id, title, description, completed) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [title, description, completed ? 1 : 0, id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes > 0); // True if a row was updated
        });
    });
};
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes > 0); // True if a row was deleted
        });
    });
};
exports.deleteTask = deleteTask;
