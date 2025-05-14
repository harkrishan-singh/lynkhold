import express from "express";
import userRouter from "./routes/user.routes";
import { connectDB } from "./config/db";
import { PORT } from "./utils/env";
import tagRouter from "./routes/tag.routes";
// import linkRouter from "./routes/link.routes";

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

// Importing user routes using userRouter
app.use("/api/user", userRouter);

// Importing tag routes using tagRouter
app.use("/api/tag", tagRouter);

// app.use("/api/link", linkRouter);

// Start server on specified port
app.listen(port, () => {
  console.log(`Connected to localhost ${port}`);
});
