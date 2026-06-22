import { Flight } from "../models/flight.models.js";

const addflight =  async(req , res) => {
    try{
        const { flightID, from, to, deperaturetime, arrivaltime, price } = req.body;

        if (!flightID || !from || !to || !deperaturetime || !arrivaltime || !price) {
            return res.status(400).json({message:"All fields are requied"})
        }

        const flight = await Flight.create({
            flightID,
            from,
            to,
            deperaturetime,
            arrivaltime,
            price
        })
        res.status(201).json({
            message:"Flight is added",
            flight
        })
    }catch(error){
        res.status(500).json({message: "Internal server error" ,
        error: error.message
   })
}
}

const getallfligths = async(req , res) =>{
    try {
        const flights = await Flight.find()
        res.status(200).json(flights)
        
    } catch (error) {
        res.status(500).json({message:"Internal server error",
            error:error.message
        })
    }
}

const getsflight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({
                message: "Flight not found"
            });
        }

        return res.status(200).json(flight);
    } catch (error) {
        return res.status(500).json({message:"Internal Server error",
            error: error.message
        })
        
    }
}
export{
    addflight,
    getallfligths,
    getsflight
}
