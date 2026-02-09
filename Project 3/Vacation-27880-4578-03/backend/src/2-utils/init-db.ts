import fs from "fs";
import path from "path";
import dal from "./dal";

async function initDb() {
    try {
        console.log("Starting Database Initialization...");

        const schemaSql = fs.readFileSync(path.join(__dirname, "..", "..", "..", "database", "schema.sql"), "utf8");
        const seedSql = fs.readFileSync(path.join(__dirname, "..", "..", "..", "database", "seed.sql"), "utf8");

        const schemaStatements = schemaSql.split(";").map(s => s.trim()).filter(s => s.length > 0);
        const seedStatements = seedSql.split(";").map(s => s.trim()).filter(s => s.length > 0);

        console.log("Applying Schema...");
        for (const sql of schemaStatements) {
            if (sql.toLowerCase().startsWith("use")) continue;
            await dal.query(sql);
        }

        console.log("Applying Seed...");
        for (const sql of seedStatements) {
            if (sql.toLowerCase().startsWith("use")) continue;
            await dal.query(sql);
        }

        console.log("Database Initialized Successfully!");
        process.exit(0);
    } catch (err: any) {
        console.error("Failed to initialize database:", err.message);
        process.exit(1);
    }
}

initDb();
