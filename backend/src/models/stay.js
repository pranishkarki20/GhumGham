import mongoose ,{Schema} from "mongoose";

const stay =  new Schema(
    {
        Name:{
            type: String,
            require:true,
        },
        Description:{
            type:String,
            require:true,
        },
        Propertytype:{
            type:String,
            enum:["hotel","home" ,"villa"],
            require:true
        },
        Address:{
            type:String, 
            reuire:true, 
        },
        ContactN: {
            type: Number,
            required:true,
        },
        Rooms:{
            type:Number,
            reuired:true,
        },
        aminitire:[String],
        images:[String]
    },{timestamps: true}
);
export default Stay = mongoose.model("Stay" , stay)