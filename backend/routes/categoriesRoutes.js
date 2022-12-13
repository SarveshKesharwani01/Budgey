const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

router.get("/categories", categoriesController.categories_get);
router.get("/categories/sum", categoriesController.categories_transaction_sum);
router.patch("/categories/budget", categoriesController.categories_budget)
module.exports = router;
