import express from "express"
import userRouter from "../routes/user.route.js";
import flightrouter from "../routes/flight.routes.js"
import stayrouter from "../routes/stay.routes.js"
import multer from "multer";
const app = express(); 
const allowOrigins = (
    process.env.CORS_ORIGINS || "http://localhost:5173"
)
.split(",")
.map((origin) => origin.trim())
.filter(Boolean); 

const corsOptions = {
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

const upload = multer({dest:'uploads/'})

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || allowOrigins.includes(origin)) {
        if (origin) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Vary", "Origin");
        }
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
        res.setHeader("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(", "));

        if (req.method === "OPTIONS") {
            return res.sendStatus(204);
        }

        return next();
    }

    return res.status(403).json({ message: `CORS blocked for origin : ${origin}` });
});

app.use(express.json());
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/flight", flightrouter)
app.use("/api/v1/stay", stayrouter)
export  default app ; 
