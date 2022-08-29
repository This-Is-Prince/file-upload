import { RequestHandler } from "express";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const uploadProductImage: RequestHandler = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new NotFoundError("No files were uploaded.");
  }
  let productImage = req.files.image as UploadedFile;
  const imagePath = path.join(
    __dirname,
    "../public/uploads",
    `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

export { uploadProductImage };
