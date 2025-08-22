const express = require("express");
const { signup, login } = require("../controllers/AuthController");
const { signUpValidation, loginValidation } = require("../middlewares/AuthValidation");

const router = express.Router(); 

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login)

module.exports = router;
