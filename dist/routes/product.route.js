"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const uploads_controller_1 = require("../controllers/uploads.controller");
const productRouter = (0, express_1.Router)();
productRouter.route("/").post(product_controller_1.createProduct).get(product_controller_1.getProducts);
productRouter.route("/uploads").post(uploads_controller_1.uploadProductImage);
exports.default = productRouter;
