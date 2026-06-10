const { saveHistory } = require("../models/historyModel");

async function calculate(req, res) {
  try {
    const { expressao } = req.body;

    if (!/^[0-9+\-*/().\s]+$/.test(expressao)) {
      return res.status(400).json({
        erro: "Expressão inválida"
      });
    }

    let resultado;

    try {
      resultado = eval(expressao);
    } catch {
      return res.status(400).json({
        erro: "Erro ao calcular"
      });
    }

    await saveHistory(
      req.session.userId,
      expressao,
      resultado.toString()
    );

    res.json({
      resultado
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      erro: "Erro no servidor"
    });
  }
}

module.exports = {
  calculate
};
