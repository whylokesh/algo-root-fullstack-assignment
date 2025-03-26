"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./core/routes"));
const errorHandler_1 = __importDefault(require("./core/middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)()); // Helps secure Express apps by setting HTTP headers
// Enable CORS
app.use((0, cors_1.default)());
// Request payload parsing
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Enable compression for better performance
app.use((0, compression_1.default)());
// Rate Limiting (Limits requests to avoid abuse)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 mins per IP
    message: "⚠️ Too many requests, please try again later.",
});
app.use(limiter);
// API Routes
app.use("/api", routes_1.default);
// Serve static files
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "public/images")));
// Global error handler
app.use(errorHandler_1.default);
exports.default = app;
