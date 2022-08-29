import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.model";

const createProduct: RequestHandler = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
};

const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export { createProduct, getProducts };
