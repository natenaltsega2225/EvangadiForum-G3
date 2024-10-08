const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Answer controllers
const { getAnswer, postAnswer } = require("../controller/answer.js");

// Route to post an answer
router.post("/", authMiddleware, postAnswer);
// Route to get an answer
router.get("/:questionid", authMiddleware, getAnswer);

module.exports = router;
