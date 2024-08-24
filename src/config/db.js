import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "@Satish2004",
    database: process.env.DB_NAME || "tges",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

const connectToDb = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("✅ Database connected successfully");
        return connection;
    } catch (err) {
        console.error("❌ Error connecting to database: ", err);
        process.exit(1);
    }
};


export { connectToDb, pool };