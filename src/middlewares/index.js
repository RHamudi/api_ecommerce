const jwt = require("jsonwebtoken");

const middlewares = {
  authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" });

    try {
      const secret = "kasKDKSADJKJ@J3329183i3m34,321.231jd78s";
      jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.status(400).json({ msg: "Token inválido!" });
    }
  },
};

module.exports = middlewares;
