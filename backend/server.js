const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5501",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));

app.use(authRoutes);
app.use(calculatorRoutes);
app.use(historyRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
