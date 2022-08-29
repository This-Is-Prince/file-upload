"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = void 0;
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const uploadProductImageLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        throw new errors_1.NotFoundError("No files were uploaded.");
    }
    let productImage = req.files.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new errors_1.BadRequestError("Please Upload Image");
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new errors_1.BadRequestError("Please upload image smaller 1MB");
    }
    const imagePath = path_1.default.join(__dirname, "../public/uploads", `${productImage.name}`);
    yield productImage.mv(imagePath);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } });
});
const uploadProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield cloudinary_1.v2.uploader.upload(((_a = req.files) === null || _a === void 0 ? void 0 : _a.image).tempFilePath, {
        use_filename: true,
        folder: "file-upload",
    });
    (0, fs_1.unlinkSync)(((_b = req.files) === null || _b === void 0 ? void 0 : _b.image).tempFilePath);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ image: { src: result.secure_url } });
});
exports.uploadProductImage = uploadProductImage;
