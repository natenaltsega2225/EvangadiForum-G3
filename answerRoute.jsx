const express = require("express");
const router = express.Router();
const {
  createAnswer,
  getAnswersByQuestionId,
} = require("../controller/answerController.jsx");

// Route to create a new answer
router.post("/", createAnswer);

// Route to get answers for a specific question
router.get("/:questionId", getAnswersByQuestionId);

module.exports = router;
