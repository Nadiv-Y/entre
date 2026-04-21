"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImage = saveImage;
exports.deleteImage = deleteImage;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesFolder = path_1.default.join(__dirname, "..", "assets", "images");
// Ensure folder exists
if (!fs_1.default.existsSync(imagesFolder)) {
    fs_1.default.mkdirSync(imagesFolder, { recursive: true });
}
function saveImage(image) {
    const extension = image.name.substring(image.name.lastIndexOf("."));
    const filename = (0, uuid_1.v4)() + extension;
    const absolutePath = path_1.default.join(imagesFolder, filename);
    image.mv(absolutePath);
    return filename;
}
function deleteImage(filename) {
    const absolutePath = path_1.default.join(imagesFolder, filename);
    if (fs_1.default.existsSync(absolutePath)) {
        fs_1.default.unlinkSync(absolutePath);
    }
}
