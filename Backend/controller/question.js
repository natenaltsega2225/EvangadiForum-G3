const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid"); // Universally unique

const { request } = require("express");

async function createQuestion(req, res) {
  const { title, description, tag } = req.body;

  if (!tag || !title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all information" });
  }

  try {
    const questionid = uuidv4();
    const userid = req.user.userid;
    await dbconnection.query(
      "INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
      [questionid, userid, title, description, tag]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "question posted successfully" });
  } catch (error) {
    console.log("posted", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

// async function updateQuestion(req, res) {
//   const { questionid, title, description, tag } = req.body;

//   if (!questionid || !title || !description || !tag) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ msg: "Please provide all required information" });
//   }

//   try {
//     const query =
//       "UPDATE questions SET title=?, description=?, tag=? WHERE questionid=?";
//     const result = await dbconnectionPromise.query(query, [
//       title,
//       description,
//       tag,
//       questionid,
//     ]);

//     if (result) {
//       return res
//         .status(StatusCodes.OK)
//         .json({ msg: "Question updated successfully" });
//     } else {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: "Question not found" });
//     }
//   } catch (error) {
//     console.error("Error updating question:", error);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Something went wrong" });
//   }
// }

// async function deleteQuestion(req, res) {
//   const { questionid } = req.body;

//   if (!questionid) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ msg: "Please provide question ID" });
//   }

//   try {
//     const query = "DELETE FROM questions WHERE questionid=?";
//     const result = await dbconnectionPromise.query(query, [questionid]);

//     if (result) {
//       return res
//         .status(StatusCodes.OK)
//         .json({ msg: "Question deleted successfully" });
//     } else {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: "Question not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting question:", error);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Something went wrong" });
//   }
// }

async function allQuestions(req, res) {
  try {
    const [questions] = await dbconnection.query("SELECT * FROM questions");
    if (questions.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "there are no questions in the database" });
    }
    //     if(answers.length==0){
    //             return res.status(StatusCodes.NOT_FOUND).json({ msg : "No answers found for the requested question"})
    // }
    return res
      .status(StatusCodes.OK)
      .json({ msg: "All questions appeared", questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong,Try again later" });
  }
}
async function getQuestionDetail(req, res) {
  const { question_id } = req.params;
  try {
    const [singleQuestion] = await dbconnection.query(
      "SELECT * FROM questions WHERE id =?",
      [question_id]
    );
    if (singleQuestion.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The question you are looking for could not be found." });
    }
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Here is the question", singleQuestion });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong,Try again later" });
  }
}

module.exports = {
  createQuestion,
  // deleteQuestion,
  // updateQuestion,
  allQuestions,
  getQuestionDetail,
};
