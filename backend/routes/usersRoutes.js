const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.get("/data", usersController.getUserData);
router.delete("/:id", usersController.deleteUser)

module.exports = router;