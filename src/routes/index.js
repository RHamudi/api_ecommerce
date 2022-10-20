const { Router } = require("express");
const UserController = require("../controllers/User/index");
const LoginController = require("../controllers/Login/index");
const ProductController = require("../controllers/Product/index");
const CartController = require("../controllers/Cart/index");

const { authenticate } = require("../middlewares/index");

const routes = Router();

routes.post("/create/user", UserController.createUser);
routes.get("/list/users", UserController.getUsers);

routes.get("/list/usersid/:user_id", UserController.getUserById);

routes.post("/login", LoginController.createSession);

routes.post("/create/product/:user_id", authenticate, ProductController.createProduct);
routes.get("/list/productsuser/:user_id", ProductController.getUserProducts);
routes.patch(
  "/update/product/:user_id/:product_id",
  authenticate,
  ProductController.updateProduct
);
routes.delete(
  "/delete/product/:user_id/:product_id",
  authenticate,
  ProductController.deleteProduct
);

routes.get("/list/products", ProductController.getProducts);
routes.get("/list/productid/:product_id", ProductController.getProductById);

routes.post("/create/cart/:user_id", authenticate, CartController.createCart);
routes.get("/list/cartuser/:user_id", authenticate, CartController.getUserCart);
routes.get("/cart/:user_id/:cart_id", authenticate, CartController.getCart);

module.exports = routes;
