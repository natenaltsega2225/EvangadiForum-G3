const dbConnection = require("../db/dbConfig.jsx");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
// Function to create a new question
async function createQuestion(req, res) {
  const { userid, title, description, tag } = req.body;

  if (!userid || !title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questionTable (userid, title, description, tag) VALUES (?, ?, ?, ?)",
      [userid, title, description, tag]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully!" });
  } catch (error) {
    console.error("Error creating question:", error.message);
    console.error(error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Function to get all questions
async function getQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query("SELECT * FROM questionTable");
    return res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error.message);
    console.error(error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Function to get a question by ID
async function getQuestionById(req, res) {
  const { questionid } = req.params;

  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questionTable WHERE questionid = ?",
      [questionid]
    );
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }
    return res.status(StatusCodes.OK).json(question[0]);
  } catch (error) {
    console.error("Error retrieving question:", error.message);
    console.error(error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { createQuestion, getQuestions, getQuestionById };
