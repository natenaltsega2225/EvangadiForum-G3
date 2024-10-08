const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const {
  createQuestion,
  allQuestions,
  // deleteQuestion,
  // updateQuestion,
  getQuestionDetail,
} = require("../controller/question.js");

// Use POST for creating a new question
router.post("/", authMiddleware, createQuestion);

// use get for getting single question detail
router.get("/:question_id", authMiddleware, getQuestionDetail);

// Use GET for retrieving all questions
router.get("/", authMiddleware, allQuestions);

// Use POST for updating a question
// router.post("/update-question", authMiddleware, updateQuestion);

// // Use POST for deleting a question
// router.post("/delete-question", authMiddleware, deleteQuestion);

module.exports = router;
