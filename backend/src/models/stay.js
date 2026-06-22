import mongoose ,{Schema} from "mongoose";

const Stay =  new Schema(
    {
        Name:{
            type: String,
            require:true,
        },
        Address:{
            type:String, 
            reuire:true, 
        },
        ContactN: {
            type: Number,
            required:true,
        }
    }
)