import mysql from "mysql2/promise";
import 'dotenv/config';

const host = process.env.HOST;
const user = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const database = process.env.DBNAME;

if (!host || !user || !database) {
  console.error("Missing DB configuration in environment variables.");
}

const connection = mysql.createPool({
  host: String(host),
  user: String(user),
  password: String(password),
  database: String(database),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;
