const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.jsx");
const {
  createAnswer,
  GetAnswersByQuestionId,
} = require("../controller/answer.jsx");

router.post("/create", authMiddleware, createAnswer);

router.get("/all-answers/:questionId", authMiddleware, GetAnswersByQuestionId);

module.exports = router;
