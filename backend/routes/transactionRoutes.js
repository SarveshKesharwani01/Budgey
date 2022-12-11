const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();
router.post("/transaction", transactionController.transaction_post);
router.delete(
  "/transaction/delete/:transactionId",
  transactionController.transaction_delete
);
router.get("/transactions", transactionController.transaction_get);
router.post("/transaction/add", transactionController.transaction_add_category);
module.exports = router;
