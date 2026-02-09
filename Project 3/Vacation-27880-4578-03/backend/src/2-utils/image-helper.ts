import path from "path";

function getAbsolutePath(imageName: string): string {
    return path.join(__dirname, "..", "..", "..", "upload", imageName);
}

export default {
    getAbsolutePath
};
