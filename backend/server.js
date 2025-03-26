"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = __importDefault(require("node:os"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const numCPUs = node_os_1.default.cpus().length; // Get the number of CPU cores
if (node_cluster_1.default.isPrimary) {
    console.log(`🟢 Primary process ${process.pid} is running`);
    // Fork worker processes equal to the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        node_cluster_1.default.fork();
    }
    // Restart a worker if it crashes
    node_cluster_1.default.on("exit", (worker, code, signal) => {
        console.error(`❌ Worker ${worker.process.pid} crashed. Restarting...`);
        node_cluster_1.default.fork();
    });
}
else {
    // Worker processes handle requests
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
    });
}
