import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const connectToDb = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "@Satish2004",
        database: process.env.DB_NAME || "tges"
    })
    return connection;
}

export default connectToDb