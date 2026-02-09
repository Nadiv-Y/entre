const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDb() {
    try {
        // Connect without database selected first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log("Connected to MySQL");

        // Create DB if not exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database ${process.env.DB_NAME} created/verified`);

        // Use DB
        await connection.query(`USE \`${process.env.DB_NAME}\``);
        console.log(`Selected database ${process.env.DB_NAME}`);

        const schemaSql = fs.readFileSync(path.join(__dirname, 'database', 'create-schema.sql'), 'utf8');
        const seedSql = fs.readFileSync(path.join(__dirname, 'database', 'seed.sql'), 'utf8');

        console.log("Running Schema...");
        await connection.query(schemaSql);
        
        console.log("Running Seed...");
        await connection.query(seedSql);

        console.log("Database initialized successfully");
        await connection.end();
    } catch (err) {
        console.error("Error initializing DB:", err);
        process.exit(1);
    }
}

initDb();
