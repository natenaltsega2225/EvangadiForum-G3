const express = require("express");
const router = express.Router();

//authentication middleware
const authMiddleware = require("../middleware/authMiddleware.jsx");

// //user controller
const { register, login, checkUser } = require("../controller/userController.jsx");

//register route
router.post("/register", authMiddleware, register);

//login route
router.post("/login", authMiddleware, login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
