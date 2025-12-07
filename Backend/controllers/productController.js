import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};
