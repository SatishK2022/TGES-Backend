import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "@Satish2004",
    database: process.env.DB_NAME || "tges",
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

const connectToDb = async () => {
    const connection = await pool.getConnection();
    return connection;
};

export default connectToDb;