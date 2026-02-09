import mysql, { PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const accessConfig: PoolOptions = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "vacations_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(accessConfig);

async function execute(sql: string, values?: any[]): Promise<any> {
    try {
        const [result] = await pool.execute(sql, values);
        return result;
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Database Error:", error.message);
        throw err;
    }
}

async function executeInTransaction<T>(action: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await action(connection);
        await connection.commit();
        return result;
    } catch (err: unknown) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

async function query(sql: string, values?: any[]): Promise<any> {
    try {
        const [result] = await pool.query(sql, values);
        return result;
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Database Error:", error.message);
        throw err;
    }
}

export default {
    execute,
    query,
    executeInTransaction
};
