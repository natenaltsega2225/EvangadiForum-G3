const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
} = require("../controller/questionController.jsx");

// Route to create a new question
router.post("/", createQuestion);

// Route to get all questions
router.get("/", getQuestions);

// Route to get a specific question by ID
router.get("/:id", getQuestionById);

module.exports = router;
