const express = require('express');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary  = require('../lib/cloudinary');

const signup= async (req, res) => {
    let success=false
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg=errors.array().map(err=> err.msg).join(', ')
      return res.status(400).json({success, msg: errorMsg});
    }

    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({success: success, msg: 'User with the given email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({success: success, msg: 'Error creating new user.' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });
    return res.status(201).json({msg:token,data: {
      _id:user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic
    }});
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:success, msg: 'Server error.' });
  }
}

const login=async(req,res)=>{
  let success=false
  try{
      const result=validationResult(req)
      if(!result.isEmpty()){
          const errorMessages=result.array().map(err=> err.msg).join(', ')
          return res.status(400).json({success: success, msg: errorMessages});
      }
      const {email, password}=req.body
      const user=await User.findOne({email})
      if(!user){
          return res.status(400).json({success: success, msg: 'Invalid Username or Password'})
      }
      const isValidPassword=await bcrypt.compare(password, user.password)
      if(!isValidPassword)return res.status(401).json({success: success, msg:"Invalid Username or Password"})
      success=true
      const token=jwt.sign({id: user._id}, process.env.SECRET_KEY,{
        expiresIn: 60*60*24*7
      })
      return res.status(200).json({msg: token, data:{
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      }})
  }catch(error){
      return res.status(500).json({ msg: 'Server error.' });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ success: false, msg: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "user_profiles",
      transformation: { width: 300, height: 300, crop: "limit" }, // Resize image
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ success: true, msg: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal server Error" });
  }
};

const checkAuth=(req,res)=>{
  try{
    const user=req.user;
    return res.status(200).json({success: true,msg: "User Successfully updated", user: user})
  }
  catch{
    return res.status(500).json({
      success: false,
      msg:"Internal Server Error."
    })
  }
}

module.exports={signup,login, updateProfile,checkAuth}