const express = require("express");
const { signup, login, getCurrentUser, logout, blockUser } = require("../../controllers/commonControllers/AuthController");
const { signUpValidation, loginValidation } = require("../../middlewares/AuthValidation");

const router = express.Router(); 

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login)
router.get("/currentuser", getCurrentUser);
router.post("/logout", logout);

module.exports = router;
