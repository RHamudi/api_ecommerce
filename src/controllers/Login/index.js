const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginController = {
  async createSession(req, res) {
    const { email, password } = req.body;

    // find email exists
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ erro: "Usuario não encontrado" });
    // confirm password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ erro: "senha Invalida" });
    try {
      const secret = "kasKDKSADJKJ@J3329183i3m34,321.231jd78s";

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 1800 });
      return res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        username: user.username,
        id: user.id,
        token,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async verifyUser(req, res) {
    res.status(200).json({ msg: "Usuario autenticado!" });
  },
};

module.exports = LoginController;
