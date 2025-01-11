const User=require('../models/User')
const Message=require('../models/Message')
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
const getMessages=async(req,res)=>{
    let success=false
    try{
        const userToChatId=req.params._id
        const senderId=req.user._id
        const messages=await Message.find({
            $or:[
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId}
            ]
        })
        return res.status(200).json(messages)
    }
    catch{
        return res.status(500).json({success: success, msg:"Internal Server Error"})
    }
}

const sendMessage=async(req,res)=>{
    let success=false;
    try{
        const {text, image}=req.body;
        const {id: receiverId}=req.params
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage= await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        //Todo: realtime functionality goes here ==>socket.io
        return res.status(201).json({success: true, msg: newMessage})
        }
        catch{
            return res.status(500).json({success: success, msg:"Internal Server Error"})
        }
}

module.exports={getUsersForSidebar, getMessages, sendMessage}