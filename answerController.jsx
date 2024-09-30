const dbConnection = require("../db/dbConfig.jsx");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Function to create a new answer
async function createAnswer(req, res) {
  const { userid, questionid, answer } = req.body;

  if (!userid || !questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answerTable (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer created successfully!" });
  } catch (error) {
    console.error("Error creating answer:", error.message);
    console.error(error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Function to get answers by question ID
async function getAnswersByQuestionId(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbConnection.query(
      "SELECT * FROM answerTable WHERE questionid = ?",
      [questionid]
    );
    return res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.error("Error retrieving answers:", error.message);
    console.error(error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { createAnswer, getAnswersByQuestionId };
