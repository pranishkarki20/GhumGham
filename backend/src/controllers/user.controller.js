import { User } from "../models/user.model.js";
const registerUser = async(req ,res) =>{
    try {
        const  { username , email , password} = req.body;
        
        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are important"})
        }

        const existing = await User.findOne({email:email.toLowerCase() })
        if(existing){
            return res.status(400).json({message: "user already exists"})
        }
        const user =  await  User.create({
            username,
            email, 
            password, 
            loggedIn: false ,
        });

        res.status(201).json({
            message : "User register Successifully" ,
            user: {id: user.id}
        })
    
    } catch (error) {
        res.status(500).json({message: "Internal Server error"  ,
            error: error.message
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const{email , password} = req.body;
        const user = await User.findOne({ email: email.toLowerCase()});
        if(!user){
            return res.status(400).json({
                message: "User not registered"
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message: "Wrong password or Username"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
        
    } catch (error) {
        res.status(500).json({
            message:"Internal sever error",
            error: error.message
        })
    }
}
export {
    registerUser,
    loginUser
}
