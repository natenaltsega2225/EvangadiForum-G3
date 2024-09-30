// db connection

const dbConnection = require("../db/dbConfig.jsx")
const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')


async function register(req, res) {

  const { username, firstName, lastName, email, password } = req.body

  if (!email || !password || !firstName || !lastName || !username) {
  return res
    .status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required fields!" });
  }

  try {
    const [user]=await dbConnection.query("select username,userid from users where username=? or email=?",[username,email])
    if (user.length>0){
       return res
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: "User already registered" });
    }
  
    if (password.length<=8){
       return res
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: "password must be at least 8 characters" });
    }

//encrypt the password
       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

    await dbConnection.query(
      "INSERT INTO users(username, firstName, lastName, email, password) VALUES(?,?,?,?,?)",
      [username, firstName, lastName, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "User regiter" });

  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res .status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all required fields!" });
  }

  try {
    // Query to find the user by email
    const [user] = await dbConnection.query("select username,userid,password FROM users WHERE email = ?",[email]);
    if (user.length==0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"});
    }
  
    // Compare password
    const isMatch=await bcrypt.compare(password,user[0].password)
      if (!isMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential" });
      }
     const username=user[0].username
     const userid=user[0].userid
     const token= jwt.sign({username,userid},"secret",{expiresIn:"1d"})
     return res.status(StatusCodes.OK).json({ message: "user login successful", token });


      // return res.json({user:user[0].password})

  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!" });
  }
}


async function checkUser(req, res) {
  const { email } = req.body; // Expecting email in the request body

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an email!" });
  }

  try {
    // Query to find the user by email
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Check if the user exists
    if (user.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found!" });
    }

    // If the user exists, send the user data (excluding sensitive information)
    const { password, ...userData } = user[0]; // Exclude password from response
    return res
      .status(StatusCodes.OK)
      .json({ msg: "User found!", user: userData });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { register, login, checkUser };
