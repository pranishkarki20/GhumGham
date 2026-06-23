import {Stay}from "../models/stay.js";
import { User } from "../models/user.model.js";



const searchflights = async(req,res) =>{
    try {

        const{from , to} = req.query ;
        const filter ={}

        if(form){
             filter.from = { $regex: from, $options: "i" }
        }
         if (to) {
      filter.to = { $regex: to, $options: "i" };
    }
        
    const flights = await f
    } catch (error) {
        res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });  
    }
}

const addstay  = async(req,res) =>{
    try {
        const{
            Name,
            Description,
            Propertytype,
            Address,
            ContactN,
            Rooms,
            aminitires,
            images,
        }  = req.body;

        if(!Name || !Description || !Propertytype || !Address || !ContactN || !Rooms || !aminitires || !images){
            return res.status(400).json({message:"All Fields are required "})
        }
        const exiting = await Stay.findOne({Name, ContactN});
    if(exiting){
        return res.status(400).json({message:"The stay already exist"})
    }
        const stay = await Stay.create({
            Name,
            Description,
            Propertytype: Propertytype.toLowerCase(),
            Address,
            ContactN,
            Rooms,
            aminitires,
            images,  
        })

        res.status(201).json({
            message:"Stays hase been added",
             stay
             })
    } catch (error) {
        res.status(500).json({message:"Internal Server Error" ,
            error: error.message
        })
    }
}

export{
addstay,
}