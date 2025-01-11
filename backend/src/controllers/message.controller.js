const User=require('../models/User')

const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUser=req.user._id
        const filteredUsers=await User.find({_id: {$ne:loggedInUser}}).select('-password')  //ne means not equal to
        return res.status(200).json(filteredUsers)
    }
    catch{
        return res.status(500).json({success: false, msg: "Internal Server Error"})
    }
}



module.exports={getUsersForSidebar}