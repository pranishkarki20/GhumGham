import jwt from "jsonwebtoken"

const auth = async(req,res, next) =>{
    try{
        const autheHeader = req.headers.authorization ; 
        if(!autheHeader || !autheHeader.startswith("Bearer ")){
            return res.status(401).json({
                message:"Access Denied "
            });
        }
        const token = autheHeader.split(" ")[1];
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decode ;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Invalid  or expire token"
        });
    }
}

export default auth;