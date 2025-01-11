const jwt=require('jsonwebtoken');
const User = require('../models/User');


const protectRoute=async(req,res, next)=>{
    let success=false
    try{
        const token=req.header('auth-token')
        if(!token)return res.status(401).json({success:success, msg: 'Cannot verify user login'});
        const payload=jwt.verify(token, process.env.SECRET_KEY)
        const userId=payload.id
        const user=await User.findById(userId).select('-password')
        if(!user)return res.status(404).json({success: success, msg: "Unauthorized user"})
        req.user=user
    next()
    }
    catch(error){
        return res.status(400).json({success: success, msg:'Cant create user'})
    }
}

module.exports={protectRoute}