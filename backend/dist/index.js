"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const db_1 = require("./config/db");
const env_1 = require("./utils/env");
// Create Express application instance
const app = (0, express_1.default)();
// Add middleware to parse JSON bodies
app.use(express_1.default.json());
// Database connection
(0, db_1.connectDB)();
// Get port from environment variables
const port = env_1.PORT;
// Create Express application instance
app.get("/", (req, res) => {
    res.send("Hi. I created this myself!");
});
app.use("/api/user", user_routes_1.default);
// Start server on specified port
app.listen(port, () => {
    console.log(`Connected to localhost ${port}`);
});
