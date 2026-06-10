const pool = require("../db");

async function findUserByEmail(email) {
  return await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
  );
}

async function createUser(email, senhaHash) {
  return await pool.query(
    "INSERT INTO usuarios (email, senha) VALUES ($1, $2)",
    [email, senhaHash]
  );
}

module.exports = {
  findUserByEmail,
  createUser
};

