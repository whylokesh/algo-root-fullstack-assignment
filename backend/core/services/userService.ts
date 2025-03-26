import db from "../../config/db";

export const getAllUsers = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
