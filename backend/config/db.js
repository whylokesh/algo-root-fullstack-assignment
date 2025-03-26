"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
// Open a database connection
const db = new sqlite3_1.default.Database("database.sqlite", (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    }
    else {
        console.log("Connected to SQLite database");
        // Create tasks table with timestamps
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                completed INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (tableErr) => {
            if (tableErr)
                console.error("Error creating table:", tableErr.message);
        });
    }
});
exports.default = db;
