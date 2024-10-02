const dbConnection = require("../Database/dbConfig");

// const user_id = require("./userControllers")

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query("SELECT * FROM questions");
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error.message);
    console.error(error.stack);
    return res
      .status(404)
      .json({ msg: "the question you are looking for is not found" });
  }
}

async function getSingleQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );
    if (question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }
    return res.status(200).json(question[0]);
  } catch (error) {
    console.error("Error retrieving question:", error.message);
    console.error(error.stack);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function submitQuestion(req, res) {
  const { title, description, tag } = req.body;
  const user_id = req.user.id;

  if (!title || !description) {
    return res.status(400).json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (user_id, title, description, tag) VALUES ( ?, ?, ?, ?)",
      [user_id, title, description, tag]
    );
    return res.status(201).json({ msg: "Question created successfully!" });
  } catch (error) {
    console.error("Error creating question:", error.message);
    console.error(error.stack);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { getAllQuestions, getSingleQuestion, submitQuestion, };
