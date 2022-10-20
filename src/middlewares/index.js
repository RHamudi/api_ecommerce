const middlewares = {
  authenticate(req, res, next) {
    const { authentication } = req.headers;
    const { user_id } = req.params;

    if (!authentication) return res.status(400).json({ error: "Token invalido" });
    if (authentication !== user_id)
      return res.status(400).json({ error: "Acesso negado!" });

    next();
  },
};

module.exports = middlewares;
