import mongoose , {Schema} from "mongoose";

const flightsScheme = new Schema({
    airline: {
        type:String,
        required: true, 
        lowercase:true, 
        trim: true
    },
    from:{
        type:String,
        required: true
    },

    to:{
        type:String,
        required:true,
    },
    deperaturetime:{
        type:Date,
        required:true, 
    },
    arrivaltime:{
        type: Date,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    availableseats:{
        type:Number,
        required:true,
    },
    totalseats:{
        type:Number, 
        required:true
    },
    status:{
        type:String, 
        enum:["scheduled" , "canclled" , "completed"],
        default:"Scheduled"
    },

},
    {
    timestamps:true
},
);

export const Flight = mongoose.model("Flight",flightsScheme)
