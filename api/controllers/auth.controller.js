import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async(req,res,next)=>{
    
    const {username,email,password} = req.body;
    
   //Decrypt the password
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});

    try{
        await newUser.save();
        res.status(201).json("User created Succesfully!!");
    }catch(error){
        next(error);
    }

       
}

export const signin =  async(req,res,next) =>{

    try{
 
     const {email,password} = req.body;
     const validUser = await User.findOne({email});
     if (!validUser) return next(errorHandler(404,"User not Found!"));
     const validPassword = bcryptjs.compareSync(password,validUser.password);
     if (!validPassword) return next(errorHandler(404,"Incorrect Credentials!"));
     const token = jwt.sign({id:validUser._id},process.env.SECRET_CODE);
     const { password: pass, ...rest } = validUser._doc;
     res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
    
    }catch(error){
 
     next(error);
    }


}


  
