const express = require("express");
const app = express();
const port = 5500;

// Database connection
const dbConnection = require("../../db/dbConfig.jsx");

// Middleware to parse JSON
app.use(express.json());

// User routes middleware
const userRoutes = require("../../routes/userRoute.jsx");
app.use("/api/users", userRoutes);
console.log("User routes registered at /api/users");

// Profile routes middleware
const profileRoutes = require("../../routes/profileRoute.jsx");
app.use("/api/profiles", profileRoutes);
console.log("Profile routes registered at /api/profiles");

// Other routes (questions, answers, etc.)
const questionRoutes = require("../../routes/questionRoute.jsx");
app.use("/api/questions", questionRoutes);
console.log("Question routes registered at /api/questions");

const answerRoutes = require("../../routes/answerRoute.jsx");
app.use("/api/answers", answerRoutes);
console.log("Answer routes registered at /api/answers");

async function start() {
  try {
    await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (error) {
    console.error(error.message);
  }
}

start();
