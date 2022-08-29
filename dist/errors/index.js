"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.CustomError = void 0;
const custom_error_1 = __importDefault(require("./custom-error"));
exports.CustomError = custom_error_1.default;
const not_found_1 = __importDefault(require("./not-found"));
exports.NotFoundError = not_found_1.default;
