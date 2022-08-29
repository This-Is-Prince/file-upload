import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller";
import { uploadProductImage } from "../controllers/uploads.controller";

const productRouter = Router();

productRouter.route("/").post(createProduct).get(getProducts);
productRouter.route("/uploads").post(uploadProductImage);

export default productRouter;
