import { RequestHandler } from "express";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

const uploadProductImageLocal: RequestHandler = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new NotFoundError("No files were uploaded.");
  }

  let productImage = req.files.image as UploadedFile;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller 1MB");
  }
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

const uploadProductImage: RequestHandler = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    (req.files?.image as UploadedFile).tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  unlinkSync((req.files?.image as UploadedFile).tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

export { uploadProductImage };
