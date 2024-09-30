const dbConnection = require("../db/dbConfig.jsx");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function getUserProfile(req, res) {
  const { userId } = req.body; // Assuming the user ID is sent in the request body

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a user ID!" });
  }

  try {
    const [profile] = await dbConnection.query(
      "SELECT first_name, last_name FROM Profile WHERE user_id = ?",
      [userId]
    );

    if (profile.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Profile not found!" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "User profile retrieved!", profile: profile[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function updateUserProfile(req, res) {
  const { userId, firstName, lastName } = req.body;

  if (!userId || !firstName || !lastName) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      "UPDATE Profile SET first_name = ?, last_name = ? WHERE user_id = ?",
      [firstName, lastName, userId]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "User profile updated successfully!" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { getUserProfile, updateUserProfile };
