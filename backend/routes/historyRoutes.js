const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  history
} = require("../controllers/historyController");

router.get(
  "/historico",
  authMiddleware,
  history
);

module.exports = router;