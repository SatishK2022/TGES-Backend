import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import connectToDb from "./config/db.js";
import {user, retail_user, corporate_user, vendor, train, air, volvoBus, cab} from "./constants.js"

const app = express();

// Database Connection
const dbConnection = connectToDb();

dbConnection
    .then(async () => {
        const db = await connectToDb();
        await db.query("CREATE DATABASE IF NOT EXISTS tges");
        
        await db.query(user);
        await db.query(retail_user);
        await db.query(corporate_user);
        await db.query(vendor);
        await db.query(train);
        await db.query(air);
        await db.query(cab);
        await db.query(volvoBus);

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
import userRouter from "./routes/user.routes.js"
import travelRouter from "./routes/travel.routes.js"

// Routes Decleration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/travel", travelRouter)

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