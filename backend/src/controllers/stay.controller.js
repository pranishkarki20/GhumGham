import {Stay}from "../models/stay.js";
import { User } from "../models/user.model.js";


const searchStay = async (req, res) => {
  try {
    const {
      where,
      propertytype,
      rooms,
    } = req.query;

    const filter = {};

    if (where) {
      filter.Address = {
        $regex: where,
        $options: "i",
      };
    }

    if (propertytype) {
      filter.Propertytype = propertytype.toLowerCase();
    }

    if (rooms) {
      filter.Rooms = {
        $gte: Number(rooms),
      };
    }

    console.log("FILTER:", filter);

    const stays = await Stay.find(filter);

    console.log("RESULT:", stays);

    res.status(200).json(stays);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const addstay  = async(req,res) =>{
    try {
       const {
  Name,
  Description,
  Propertytype,
  Address,
  ContactN,
  Rooms,
  availableFrom,
  availableTo,
  pricePerNight,
  maxGuests,
  aminitire,
  images
} = req.body;
       if (
  !Name ||
  !Description ||
  !Propertytype ||
  !Address ||
  !ContactN ||
  !Rooms ||
  !availableFrom ||
  !availableTo ||
  !pricePerNight ||
  !maxGuests ||
  !aminitire ||
  !images
) {
  return res.status(400).json({
    message: "All fields are required"
  });
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
  availableFrom,
  availableTo,
  pricePerNight,
  maxGuests,
  aminitire,
  images
});
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
searchStay
}