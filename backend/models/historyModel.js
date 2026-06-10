const pool = require("../db");

async function saveHistory(usuarioId, expressao, resultado) {
  return await pool.query(
    "INSERT INTO historico (usuario_id, expressao, resultado) VALUES ($1, $2, $3)",
    [usuarioId, expressao, resultado]
  );
}

async function getHistory(usuarioId) {
  return await pool.query(
    "SELECT * FROM historico WHERE usuario_id=$1 ORDER BY criado_em DESC",
    [usuarioId]
  );
}

module.exports = {
  saveHistory,
  getHistory
};
