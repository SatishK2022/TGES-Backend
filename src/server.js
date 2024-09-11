import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import morgan from "morgan"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import { connectToDb, pool as db } from "./config/db.js";
import { user, retail_user, corporate_user, vendor, train, air, volvoBus, cab, hotel, passport, healthInsurance, travelInsurance, admin, branch, employee, cab_rate_card, hotel_rate_card, room, event_rate_card, conference_hall, log_messages } from "./constants.js"

const app = express();

// Database Connection
await connectToDb()
    .then(async () => {
        await db.query("CREATE DATABASE IF NOT EXISTS tges");

        await db.query(admin)
        await db.query(user);
        await db.query(retail_user);
        await db.query(corporate_user);
        await db.query(vendor);
        await db.query(branch)
        await db.query(employee)
        await db.query(train);
        await db.query(air);
        await db.query(cab);
        await db.query(volvoBus);
        await db.query(hotel)
        await db.query(passport)
        await db.query(healthInsurance)
        await db.query(travelInsurance)
        await db.query(cab_rate_card)
        await db.query(room)
        await db.query(hotel_rate_card)
        await db.query(conference_hall)
        await db.query(event_rate_card)
        await db.query(log_messages)
    })

// middlewares
app.use(cors({
    origin: ["http://localhost:5173", "https://v1.tgestravel.com"],
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
import healthcheckRouter from "./routes/healthcheck.routes.js"
import corporateDashboardRouter from "./routes/corporateDashboard.routes.js"
import vendorDashboardRouter from "./routes/vendorDashboard.routes.js"
import miscellaneousRouter from "./routes/miscellaneous.routes.js"

// Routes Decleration
app.use("/api/v1/status", healthcheckRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/travel", travelRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/corporate", corporateDashboardRouter)
app.use("/api/v1/vendor", vendorDashboardRouter)
app.use("/api/v1", miscellaneousRouter)


// swagger routes
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        docExpansion: "none",
    },
    customSiteTitle: "TGES API Documentation",
}));

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
    console.log(`Server running on http://localhost:${PORT}`);
})