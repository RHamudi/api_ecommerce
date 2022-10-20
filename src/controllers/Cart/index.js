const Cart = require("../../models/Cart");

const CartController = {
  async createCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const createCart = await Cart.create({ ...bodyData, username: user_id });
      await createCart.populate("products");
      return res.status(200).json(createCart);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async getUserCart(req, res) {
    const { user_id } = req.params;
    try {
      const userCarts = await Cart.find({ username: user_id });
      return res.status(200).json(userCarts);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async getCart(req, res) {
    const { cart_id, user_id } = req.params;
    try {
      const cart = await Cart.findById(cart_id).populate("products");
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = CartController;
