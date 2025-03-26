import sqlite3 from "sqlite3";

// Open a database connection
const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database");

    // Create tasks table with timestamps
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                completed INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
      (tableErr) => {
        if (tableErr) console.error("Error creating table:", tableErr.message);
      }
    );
  }
});

export default db;
