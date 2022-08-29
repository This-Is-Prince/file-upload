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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// USE V2
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const express_1 = __importDefault(require("express"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const db_1 = __importDefault(require("./db"));
const product_route_1 = __importDefault(require("./routes/product.route"));
// app
const app = (0, express_1.default)();
// port
const port = process.env.PORT || 3000;
// middleware
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public")));
// routes
app.use("/api/v1/products", product_route_1.default);
// error middleware
app.use(error_handler_1.default);
app.use(not_found_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.error(error);
    }
});
start();
