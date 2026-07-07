import mongoose, { Schema } from "mongoose";
import passport from "passport";

const bookingSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId ,
            ref:"users",
            required:true,
        },
        flight:{
            type:String,
            required:true,
        },
        tripTitle: {
            type:String,
            trim:true,
        },
        tripType: {
            type:String,
            trim:true,
            default: "Flight",
        },
        destination: {
            type:String,
            trim:true,
        },
        startDate: {
            type:Date,
        },
        endDate: {
            type:Date,
        },

        //embedded documents
        passenger:[
            {
                FullName:{
                    type:String,
                    required:true
                },
                age:{
                    type:String,
                    required:true
                },
                gender:{
                    type:String, 
                    require:true,
                    enum: ["Male", "Female" , "other"]
                },
                passport:{
                    type:String
                },
            },
        ],

        totalAmount:{
            type:Number,
            require:true 
        },
        currency:{
            type:String, 
            default:"NPR"
        },

        bookingStatus:{
            type:String, 
            enum:["pending" , "confirmed" , "cancelled" , "completed"],
            default:"pending"
        },
        paymentStatus:{
            type:String,
            enum:["pending" , "paid" , "failed" , "refunded"]
        },
    },
    {
        timestamps:true,
    }
);
export const Booking = mongoose.model("Booking" ,bookingSchema)