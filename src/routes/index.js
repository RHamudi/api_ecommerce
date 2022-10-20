const { Router } = require("express");
const UserController = require("../controllers/User/index");
const LoginController = require("../controllers/Login/index");
const ProductController = require("../controllers/Product/index");
const CartController = require("../controllers/Cart/index");

const { authenticate } = require("../middlewares/index");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("olá mundo");
});

routes.post("/create/user", UserController.createUser);
routes.get("/users", UserController.getUsers);

routes.get("/users/:user_id", UserController.getUserById);

routes.post("/login", LoginController.createSession);

routes.post("/create/product/:user_id", authenticate, ProductController.createProduct);
routes.get("/products/:user_id", ProductController.getUserProducts);
routes.patch(
  "/product/:user_id/:product_id",
  authenticate,
  ProductController.updateProduct
);
routes.delete(
  "/product/:user_id/:product_id",
  authenticate,
  ProductController.deleteProduct
);

routes.get("/products", ProductController.getProducts);
routes.get("/product/:product_id", ProductController.getProductById);

routes.post("/cart/:user_id", authenticate, CartController.createCart);
routes.get("/cart/:user_id", authenticate, CartController.getUserCart);
routes.get("/cart/:user_id/:cart_id", authenticate, CartController.getCart);

module.exports = routes;
