const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const pool = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Middleware de autenticação
function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ erro: "Não autenticado" });
  }
  next();
}

// =======================
// REGISTRO
// =======================
app.post("/register", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email=$1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      "INSERT INTO usuarios (email, senha) VALUES ($1, $2)",
      [email, senhaHash]
    );

    res.json({ mensagem: "Usuário cadastrado com sucesso" });

  } catch (err) {
    console.log("ERRO REGISTER:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// =======================
// LOGIN
// =======================
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const user = await pool.query(
      "SELECT * FROM usuarios WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.rows[0].senha);

    if (!senhaCorreta) {
      return res.status(400).json({ erro: "Senha incorreta" });
    }

    req.session.userId = user.rows[0].id;
    req.session.email = user.rows[0].email;

    res.json({ mensagem: "Login realizado com sucesso" });

  } catch (err) {
    console.log("ERRO LOGIN:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// =======================
// LOGOUT
// =======================
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao fazer logout" });
    }
    res.json({ mensagem: "Logout feito com sucesso" });
  });
});

// =======================
// CALCULAR (servidor faz a conta)
// =======================
app.post("/calcular", authMiddleware, async (req, res) => {
  try {
    const { expressao } = req.body;

    if (!expressao) {
      return res.status(400).json({ erro: "Expressão obrigatória" });
    }

    // Segurança: permitir apenas números e operadores básicos
    if (!/^[0-9+\-*/().\s]+$/.test(expressao)) {
      return res.status(400).json({ erro: "Expressão inválida" });
    }

    let resultado;
    try {
      resultado = eval(expressao);
    } catch {
      return res.status(400).json({ erro: "Erro ao calcular" });
    }

    await pool.query(
      "INSERT INTO historico (usuario_id, expressao, resultado) VALUES ($1, $2, $3)",
      [req.session.userId, expressao, resultado.toString()]
    );

    res.json({ expressao, resultado });

  } catch (err) {
    console.log("ERRO CALCULAR:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// =======================
// HISTÓRICO
// =======================
app.get("/historico", authMiddleware, async (req, res) => {
  try {
    const historico = await pool.query(
      "SELECT * FROM historico WHERE usuario_id=$1 ORDER BY criado_em DESC",
      [req.session.userId]
    );

    res.json(historico.rows);

  } catch (err) {
    console.log("ERRO HISTORICO:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// =======================
// USUÁRIO LOGADO
// =======================
app.get("/me", authMiddleware, (req, res) => {
  res.json({ email: req.session.email });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
