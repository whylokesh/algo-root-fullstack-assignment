"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTaskById = exports.getAllTasks = void 0;
const taskService = __importStar(require("../services/taskService"));
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch tasks" });
    }
});
exports.getAllTasks = getAllTasks;
// Get a single task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield taskService.getTaskById(Number(id));
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch task" });
    }
});
exports.getTaskById = getTaskById;
// Create a new task
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title)
            return res.status(400).json({ error: "Title is required" });
        const taskId = yield taskService.addTask(title, description);
        return res
            .status(201)
            .json({ id: taskId, message: "Task created successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to create task" });
    }
});
exports.addTask = addTask;
// Update an existing task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const updated = yield taskService.updateTask(Number(id), title, description, completed);
        if (!updated)
            return res.status(404).json({ error: "Task not found" });
        return res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to update task" });
    }
});
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield taskService.deleteTask(Number(id));
        if (!deleted)
            return res.status(404).json({ error: "Task not found" });
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to delete task" });
    }
});
exports.deleteTask = deleteTask;
