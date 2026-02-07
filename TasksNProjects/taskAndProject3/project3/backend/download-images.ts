import fs from "fs";
import path from "path";
import https from "https";

const images = [
    { name: "maldives.jpg", url: "https://placehold.co/600x400/007bff/ffffff.jpg?text=Maldives" },
    { name: "paris.jpg", url: "https://placehold.co/600x400/ff5733/ffffff.jpg?text=Paris" },
    { name: "newyork.jpg", url: "https://placehold.co/600x400/28a745/ffffff.jpg?text=New+York" }
];

const uploadDir = path.join(process.cwd(), "upload");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

images.forEach(img => {
    const filePath = path.join(uploadDir, img.name);
    const file = fs.createWriteStream(filePath);

    https.get(img.url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
            file.close();
            console.log(`Downloaded ${img.name}`);
        });
    }).on("error", (err) => {
        fs.unlink(filePath, () => { });
        console.error(`Error downloading ${img.name}: ${err.message}`);
    });
});
