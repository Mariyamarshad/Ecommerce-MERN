const express = require("express");
const usersController = require("../../controllers/adminControllers/adminUsersController");
const router = express.Router();

router.get("/data", usersController.getUserData);
router.delete("/:id", usersController.deleteUser)

module.exports = router;