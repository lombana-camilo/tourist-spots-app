"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("config"));
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary_1.v2.config({
    cloud_name: config_1.default.get("CLOUDINARY_CLOUD_NAME"),
    api_key: config_1.default.get("CLOUDINARY_API_KEY"),
    api_secret: config_1.default.get("CLOUDINARY_API_SECRET"),
});
exports.storage = new CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "tourists-spots",
        allowedFormats: ['jpeg', 'jpg', 'png']
    }
});
exports.default = cloudinary_1.v2;
