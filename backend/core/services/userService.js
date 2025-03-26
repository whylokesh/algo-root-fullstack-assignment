"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM users", (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getAllUsers = getAllUsers;
