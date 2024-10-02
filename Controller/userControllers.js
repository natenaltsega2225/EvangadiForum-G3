// database connnection
const dbConnection = require("../Database/dbConfig");

async function authentication(req, res) {
  const { email } = req.body; // Expecting email in the request body

  if (!email) {
    return res.status(400).json({ msg: "Please provide an email!" });
  }

  try {
    // Query to find the user by email
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Check if the user exists
    if (user.length === 0) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // If the user exists, send the user data (excluding sensitive information)
    const { password, ...userData } = user[0]; // Exclude password from response
    return res.status(200).json({ msg: "User found!", user: userData });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(400)
      .json({ msg: "please provide the information for all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid from users WHERE username = ? or email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(400).json({ msg: "the user already registered" });
    }

    if (password.length <= 8) {
      return res
        .status(400)
        .json({ msg: "password must be at least eight characters" });
    }

    const [addUser] = await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email,password) VALUES(?,?,?,?,?)",
      [username, firstname, lastname, email, password]
    );
    const user_id = addUser.insertId;
    return res.status(201).json({ msg: "user created", user_id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  // Fetch user by email and check password (you should hash the password)
  const [user] = await dbConnection.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (user.length === 0 || user[0].password !== password) {
    // Replace with hashed password check
    return res.status(401).json({ msg: "Invalid credentials!" });
  }

  const token = jwt.sign({ id: user[0].userid }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ msg: "Login successful!", token });
}


module.exports = { authentication, register, login };
