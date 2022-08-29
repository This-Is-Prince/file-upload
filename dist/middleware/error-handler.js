"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
exports.default = errorHandlerMiddleware;
