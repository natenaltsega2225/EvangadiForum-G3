const express = require("express");
const router = express.Router();
//authentication middleware
const authMiddleware = require("../MiddleWare/authMiddleware");
const { register, login, check } = require("../Controller/userController");

// Register route
router.post("/register", register);

// Login
router.post("/login", login);

// check user
router.get("/check", authMiddleware, check);

module.exports = router;
