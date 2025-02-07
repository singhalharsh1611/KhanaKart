import userModel from "../models/userModel.js";
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user

export const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try {
        const user =await userModel.findOne({email});
        console.log(user);
        if(!user){
            return res.json({success:false,message:"email doesnot exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"incorrect password"})
        }
        const token=createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user

export const registerUser = async(req,res)=>{
    console.log(req.body);
    try {
        const {name,email,password}=req.body;
        
        const exist=await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Plase enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"});
        }
        // hashing password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser =new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        const user = await newUser.save()
        const token = createToken(user._id);
         res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
    
}