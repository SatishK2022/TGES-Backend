import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import morgan from "morgan"
import connectToDb from "./config/db.js";
import { user, retail_user, corporate_user, vendor, train, air, volvoBus, cab, hotel, passport, healthInsurance, travelInsurance } from "./constants.js"

const app = express();

// Database Connection
const dbConnection = connectToDb();

dbConnection
    .then(async () => {
        const db = await connectToDb();
        await db.query("CREATE DATABASE IF NOT EXISTS tges");

        await db.query(user);
        await db.query(retail_user);
        await db.query(vendor);
        await db.query(corporate_user);
        await db.query(train);
        await db.query(air);
        await db.query(cab);
        await db.query(volvoBus);
        await db.query(hotel)
        await db.query(passport)
        await db.query(healthInsurance)
        await db.query(travelInsurance)

        console.log("✅ Database connected successfully");
    })
    .catch(error => console.log("❌ Error Connecting to Database : ", error));

// middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan("dev"))


// Routes Import
import userRouter from "./routes/user.routes.js"
import travelRouter from "./routes/travel.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

// Routes Decleration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/travel", travelRouter)
app.use("/api/v1/dashboard", dashboardRouter)

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