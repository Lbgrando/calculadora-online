const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  createUser
} = require("../models/userModel");

async function register(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha obrigatórios"
      });
    }

    const userExists = await findUserByEmail(email);

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        erro: "Email já cadastrado"
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await createUser(email, senhaHash);

    res.json({
      mensagem: "Usuário cadastrado"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      erro: "Erro no servidor"
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const user = await findUserByEmail(email);

    if (user.rows.length === 0) {
      return res.status(400).json({
        erro: "Usuário não encontrado"
      });
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      user.rows[0].senha
    );

    if (!senhaCorreta) {
      return res.status(400).json({
        erro: "Senha incorreta"
      });
    }

    req.session.userId = user.rows[0].id;
    req.session.email = user.rows[0].email;

    res.json({
      mensagem: "Login realizado"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      erro: "Erro no servidor"
    });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.json({
      mensagem: "Logout realizado"
    });
  });
}

module.exports = {
  register,
  login,
  logout
};
