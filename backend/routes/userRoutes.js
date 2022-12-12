const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.patch("/me", userController.user_update_meta);
router.patch("/me/pw", userController.user_update_password);
router.get("/me/budget", userController.user_get_budget);
router.patch("/me/budget/sm", userController.user_update_budget);
module.exports = router;
