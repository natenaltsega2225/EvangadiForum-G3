const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { answer, questionid } = req.body;

  if (!answer || !questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required value. " });
  }

  try {
    const userid = req.user.userid;
    await dbconnection.query(
      "INSERT INTO answers( questionid, userid, answer) VALUES(?,?,?)",
      [questionid, userid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log("answer posted error is", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}
async function getAnswer(req, res) {
  // const { questionid } = req.body;
  const { questionid } = req.params;
  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter questionid " });
  }

  try {
    const response = await dbconnection.query(
      "SELECT answers.answer, users.username FROM answers  INNER JOIN users ON answers.userid = users.userid WHERE answers.questionid = ? ORDER BY answers.answerid DESC",
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ data: response[0] });
  } catch (error) {
    console.log("from get answer", error);
  }
}

module.exports = { postAnswer, getAnswer };
