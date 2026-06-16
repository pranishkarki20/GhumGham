import express from "express"
import userRouter from "../routes/user.route.js";
const app = express(); 


app.use(express.json());
const allowOrigins = (
    process.env.CORS_ORIGINS || "http://localhost:5173"
)
.split(",")
.map((origin) => origin.trim())
.filter(Boolean); 

const corsOptions = {
    origin: (origin , callback) =>{
        if((!origin || allowOrigins.includes(origin))){
            return callback(null , true)
        }
        return callback(new Error(`CORS blocked for origin : ${origin}`));
    },
    credentials: true ,
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use("/api/v1/users" , userRouter)
export  default app ; 
