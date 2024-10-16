require("dotenv").config()
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors')
app.use(cors())

const dbConnection = require("./Database/dbConfig");  // DB connection
// User routes middleware file
const userRoutes = require("./Route/userRoute");
const questionRoutes = require("./Route/questionRoute");
const answerRoutes = require("./Route/answerRoute");
// JSON middleware to extract json data
app.use(express.json());

// User route middleware
app.use("/api/users", userRoutes);

// Questions route middleware
app.use("/api/question", questionRoutes)

// Answers route middleware
app.use("/api/answer", answerRoutes);

app.post("/api/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    return res.status(200).json({ message: "Logged out successfully" });
    
    
  });
});


async function start(){
    try {
        const result = dbConnection.execute("select 'test' ");
        await app.listen(port)
        console.log("Database connection established")
        console.log(`listening on ${port}`)
    } catch (error) {
        console.log(err)
    }
}
start()