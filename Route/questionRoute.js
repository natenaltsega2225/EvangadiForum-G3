//import express and route module
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../MiddleWare/authMiddleware");

//question controllers
const {
  submitQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../Controller/questionControllers");

//Get All Questions
router.get("/question", getAllQuestions);

//Get Single Question
router.get("/question:question_id", getSingleQuestion);

//Post Question
router.post("/question", authenticateToken, submitQuestion);

module.exports = router;
