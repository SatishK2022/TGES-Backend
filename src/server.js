import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import connectToDb from "./config/db.js";

const app = express();

// Database Connection
const dbConnection = connectToDb();

dbConnection
    .then(async () => {
        const db = await connectToDb();
        await db.query("CREATE DATABASE IF NOT EXISTS tges");

        // User Table
        const user = `CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            zipCode VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`;
        await db.query(user);

        // Retail User Table
        const retail_user = `CREATE TABLE IF NOT EXISTS retail_user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES user (id),
            firstName VARCHAR(255) NOT NULL,
            secondName VARCHAR(255),
            lastName VARCHAR(255) NOT NULL,
            Occupation VARCHAR(255),
            residentialAddress VARCHAR(255),
            phoneNo VARCHAR(255),
            companyName VARCHAR(255),
            designation VARCHAR(255),
            companyAddress VARCHAR(255),
            reference VARCHAR(255),
            preferredCurrency VARCHAR(255),
            website VARCHAR(255),
            documentType VARCHAR(255)
        )`;
        await db.query(retail_user);

        // Corporate User Table
        const corporate_user = `CREATE TABLE IF NOT EXISTS corporate_user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES user (id),
            industry VARCHAR(255) NOT NULL,
            companyName VARCHAR(255) NOT NULL,
            phoneNo1 VARCHAR(255) NOT NULL,
            phoneNo2 VARCHAR(255),
            landlineNo VARCHAR(255),
            website VARCHAR(255) NOT NULL,
            address1 VARCHAR(255) NOT NULL,
            address2 VARCHAR(255),
            address3 VARCHAR(255)
        )`;
        await db.query(corporate_user);

        // Vendor Table
        const vendor = `CREATE TABLE IF NOT EXISTS vendor (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES user (id),
            areaOfWork VARCHAR(255) NOT NULL,
            companyName VARCHAR(255) NOT NULL,
            phoneNo1 VARCHAR(255) NOT NULL,
            phoneNo2 VARCHAR(255),
            landlineNo VARCHAR(255),
            website VARCHAR(255) NOT NULL,
            address1 VARCHAR(255) NOT NULL,
            address2 VARCHAR(255),
            address3 VARCHAR(255)
        )`;
        await db.query(vendor);

        console.log("✅ Database connected successfully");
    })
    .catch(error => console.log("❌ Error Connecting to Database : ", error));

// middlewares
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


// Routes Import
import userRouter from "../src/routes/user.routes.js"

// Routes Decleration
app.use("/api/v1/user", userRouter)

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to TGES API",
    })
})

// Catch all route to handle 404 errors
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
})