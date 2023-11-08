import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { tokenSchema } from "../models/Token.js";

const Token = mongoose.model("Token", tokenSchema);



//Signup API
export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    role,
    mobileNumber,
    profileImage,
    dob,
    gender,
    address,
    linkedIn,
  } = req.body;
  try {
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email or username",
      });
    }
    const hashedpwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedpwd,
      role,
      mobileNumber,
      profileImage,
      dob,
      gender,
      address,
      linkedIn,
    });

    const verificationToken = await Token.create({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    res.status(201).json({
      message: "User signed up successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};



//Login API
export const login = async (req, res) => {

    const {email, password} = req.body

    try{

        let user = await User.findOne({email: email})
        if(!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.jwtsecretKey);
        console.log(user);
        res.cookie("token", token, {
            httpOnly: true,
          }).json({
            success: true,
            message: `Welcome back! ${user.firstName}`,
            token,
        });
    } catch (err) {
        res.status(400).json({
            status: "LogIn failed",
            message: err
        })
    }
}


//fetch USER PROFILE
export const fetchProfile = async (req,res)=>{
  const userId = req.params.userID;
  console.log(userId);
  try{
    const user = await User.findOne({_id : userId});
    if(!user){
      return res.json({
        success: false,
        message: "User not found",
    });
  }
    res.status(201).json({
      success: true,
      user: user
    })
    

  }
  catch(err){
    res.status(400).json({
      status: 'Failed to get user',
      error: err
    })
  }
  
};


//Fetch ALL USERS
export const fetchallUsers = async(req,res)=>{
  try{
    const Users = await User.find({});
    res.status(201).json({
      success:true,
      users: Users
    })
  }catch(err){
    res.status(400).json({
      status: 'Failed to get all users',
      error: err
    })
  }
}