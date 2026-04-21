import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";

const imagesFolder = path.join(__dirname, "..", "assets", "images");

// Ensure folder exists
if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder, { recursive: true });
}

export function saveImage(image: UploadedFile): string {
    const extension = image.name.substring(image.name.lastIndexOf("."));
    const filename = uuid() + extension;
    const absolutePath = path.join(imagesFolder, filename);
    image.mv(absolutePath);
    return filename;
}

export function deleteImage(filename: string): void {
    const absolutePath = path.join(imagesFolder, filename);
    if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
    }
}
