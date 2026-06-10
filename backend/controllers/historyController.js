const { getHistory } = require("../models/historyModel");

async function history(req, res) {

  try {

    const historico = await getHistory(req.session.userId);

    res.json(historico.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      erro: "Erro no servidor"
    });
  }
}

module.exports = {
  history
};