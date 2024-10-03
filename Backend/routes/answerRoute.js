const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js")
const {
  createAnswer,
  GetAnswersByQuestionId,
} = require("../controller/answer.js")

router.post("/create", authMiddleware, createAnswer);

router.get("/all-answers/:questionId", authMiddleware, GetAnswersByQuestionId);

module.exports = router;
