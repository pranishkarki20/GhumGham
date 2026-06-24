import mongoose ,{Schema} from "mongoose";

const stay = new Schema(
{
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Propertytype:{
        type:String,
        lowercase:true,
        enum:["hotel","home","villa"],
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    ContactN:{
        type:Number,
        required:true
    },
    Rooms:{
        type:Number,
        required:true
    },

    availableFrom:{
        type:Date,
        required:true
    },

    availableTo:{
        type:Date,
        required:true
    },

    pricePerNight:{
        type:Number,
        required:true
    },

    maxGuests:{
        type:Number,
        required:true
    },

    aminitire:[String],
    images:[String]

},
{timestamps:true}
);
export  const Stay = mongoose.model("Stay" , stay)