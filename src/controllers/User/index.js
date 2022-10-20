const User = require("../../models/User");
const bcrypt = require("bcrypt");

const UserController = {
  //Criar usuario
  async createUser(req, res) {
    const { username, email, password } = req.body;
    if (!username) return res.status(400).json({ erro: "O nome é obrigatorio" });
    if (!email) return res.status(400).json({ erro: "O E-mail é obrigatorio" });
    if (!password) return res.status(400).json({ erro: "A senha é obrigatoria" });

    // check user exists
    const userExist = await User.findOne({ email: email });

    if (userExist) return res.status(422).json({ erro: "O usuario já existe" });

    // create password
    const salt = await bcrypt.genSalt(15);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      username,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      return res.status(200).json({ msg: "Usuario criado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },
  // Listar todos os usuarios
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(
        users.map((item) => ({
          id: item.id,
          username: item.username,
          email: item.email,
        }))
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // list user by id
  async getUserById(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.findById(user_id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = UserController;
