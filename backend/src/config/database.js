import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(
            `MongoDB connected: ${connectionInstance.connection.host}`
        );

        
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDb ;
