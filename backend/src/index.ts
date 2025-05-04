import express from "express";
import userRouter from "./routes/user.routes";
import { connectDB } from "./config/db";
import { PORT } from "./utils/env";

// Create Express application instance
const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

// Database connection
connectDB();

// Get port from environment variables
const port = PORT;

// Create Express application instance
app.get("/", (req, res) => {
  res.send("Hi. I created this myself!");
});

app.use("/api/user", userRouter);

// Start server on specified port
app.listen(port, () => {
  console.log(`Connected to localhost ${port}`);
});
