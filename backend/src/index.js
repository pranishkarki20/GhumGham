import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import app from "./config/app.js";

dotenv.config({
    path: "./.env"
});


const startServer = async () => {
    try {
        await connectDb();

        app.on("error", (error) => {
            console.log("Error:", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `Server is running on port ${process.env.PORT || 8000}`
            );
        });

    } catch (error) {
        console.error("Error:", error);
    }
};

startServer();