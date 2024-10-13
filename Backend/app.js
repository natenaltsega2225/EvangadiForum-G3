<<<<<<< HEAD
require("dotenv").config();
=======
require("dotenv").config()
>>>>>>> main
const express = require("express");
const app = express();
const port = 5500;

<<<<<<< HEAD
const cors = require("cors");
app.use(cors());

//db connection
const dbConnection = require("./db/dbConfig.js");

//user routes middleware file
const userRoutes = require("./routes/userRoute.js");
const questionRoute = require("./routes/questionRoute.js");
const answerRoute = require("./routes/answerRoute.js");
const installRoute = require("./routes/installRoute.js");
const authMiddleware = require("./middleware/authMiddleware.js");

//json middleware to extract to json data
app.use(express.json());

app.use("/", installRoute);

//user routes middleware
app.use("/api/users", userRoutes);
//question route middleware
app.use("/api/question", questionRoute);
//answer route middleware
app.use("/api/answer", answerRoute);

// const port = 3333;
// port = process.env.SERVER_PORT || 5500;
// app.use((req, res, next) => {
//     res.status(404).json({ msg: 'Resource not found error.' });
// });

app.get("/", (req, res) => {
  res.send("Api is working");
});
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong.", error: err.message });
});
async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
=======
const cors = require('cors')
app.use(cors())

const dbConnection = require("./Database/dbConfig");  // DB connection
// User routes middleware file
const userRoutes = require("./Route/userRoute");
const questionRoutes = require("./Route/questionRoute");
const answerRoutes = require("./Route/answerRoute");

const tagRoutes = require("./Route/tagRoute");
// JSON middleware to extract json data
app.use(express.json());

// User route middleware
app.use("/api/users", userRoutes);

// Questions route middleware
app.use("/api/question", questionRoutes)

// Answers route middleware
app.use("/api/answer", answerRoutes);

// ragged route middleware
app.use("/api/questions",tagRoutes)
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
>>>>>>> main
