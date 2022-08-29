"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 200;
    }
}
exports.default = CustomError;
