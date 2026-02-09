import mysql from 'mysql2/promise';
import config from './config';

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database!');
        connection.release();
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

testConnection();

export default pool;
