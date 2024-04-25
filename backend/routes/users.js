const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Signup
router.post("/signup", userController.signup);
// verify otp
router.post("/verify-otp", userController.verifyOtp);
// signin
router.post("/signin", userController.signin);
// get user information
router.get("/user", userController.verifyToken, userController.getUser);

module.exports = router;
