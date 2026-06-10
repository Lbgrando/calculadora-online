function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({
      erro: "Não autenticado"
    });
  }

  next();
}

module.exports = authMiddleware;
