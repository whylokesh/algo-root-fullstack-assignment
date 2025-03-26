import db from "../../config/db";

// Fetch all tasks
export const getAllTasks = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Fetch a single task by ID
export const getTaskById = (id: number): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

// Add a new task
export const addTask = (
  title: string,
  description?: string
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tasks (title, description, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      [title, description || ""],
      function (this: { lastID: number }, err: any) {
        if (err) reject(err);
        else resolve(this.lastID); // Return new task ID
      }
    );
  });
};

// Update an existing task
export const updateTask = (
  id: number,
  title: string,
  description: string,
  completed: boolean
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, description, completed ? 1 : 0, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0); // True if a row was updated
      }
    );
  });
};

// Delete a task
export const deleteTask = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0); // True if a row was deleted
    });
  });
};
