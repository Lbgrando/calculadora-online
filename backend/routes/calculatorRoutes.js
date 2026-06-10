const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  calculate
} = require("../controllers/calculatorController");

router.post(
  "/calcular",
  authMiddleware,
  calculate
);

module.exports = router;
