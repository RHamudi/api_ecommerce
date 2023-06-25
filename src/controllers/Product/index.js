const Picture = require("../../models/Picture");
const Product = require("../../models/Product");

const ProductController = {
  //criando produtos
  async createProduct(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const file = req.file;

      const picture = new Picture({
        name,
        src: file.path,
      })

      await picture.save();

      const newProduct = await Product.create({ ...bodyData, username: user_id });
      await newProduct.populate("username");
      return res.status(200).send(newProduct);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // listando produto do usuario
  async getUserProducts(req, res) {
    const { user_id } = req.params;
    try {
      const productsOfAnUser = await Product.find({ username: user_id });
      return res.status(200).json(productsOfAnUser);
    } catch (error) {
      return res.status(400).json({ erro: "Produto de usuario não encontrado" });
    }
  },
  // atualizando produto
  async updateProduct(req, res) {
    const bodyData = req.body;
    const { product_id, user_id } = req.params;

    // Verificando se o id do produto está certo
    try {
      const product = await Product.findById(product_id);
    } catch (error) {
      return res.status(400).json({ erro: "Não existe produto com esse id" });
    }

    // verificando permissão de usuario
    const productOne = await Product.findById(product_id);
    if (productOne.username != user_id)
      return res.status(404).json({
        erro: "Voce não tem acesso para alterar esse produto, insira um usuario valido",
      });
    try {
      const updatedProduct = await Product.findByIdAndUpdate(product_id, bodyData, {
        new: true,
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // deletando produto
  async deleteProduct(req, res) {
    const { product_id, user_id } = req.params;

    // verificando permissão de usuario
    const productOne = await Product.findById(product_id);
    if (productOne) {
      if (productOne.username != user_id)
        return res.status(404).json({
          erro: "Voce não tem acesso para deletar esse produto",
        });
    } else {
      return res.status(400).json({ erro: "Esse produto não existe" });
    }

    try {
      const deletedProduct = await Product.findByIdAndDelete(product_id);
      return res
        .status(200)
        .json({ product: deletedProduct.username, msg: "Produto deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ erro: "Aconteceu algum erro inesperado" });
    }
  },
  // pegando todos os produtos
  async getProducts(req, res) {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // pegando produto com id
  async getProductById(req, res) {
    const { product_id } = req.params;
    try {
      const product = await Product.findById(product_id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ erro: "Produto não encontrado!" });
    }
  },
};

module.exports = ProductController;
