const User=require('../models/User')
const Message=require('../models/Message')
const cloudinary  = require('../lib/cloudinary');
const { getReceiverSocketId, io } = require('../lib/socket');
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
const getMessages = async (req, res) => {
    let success = false; // Initialize success flag to false
    try {
        const userToChatId = req.params.id; // Extract the ID of the user to chat with from request parameters
        const senderId = req.user._id; // Extract the sender's ID from the authenticated user object

        // Fetch messages where either:
        // - The sender is the authenticated user and the receiver is the user to chat with, or
        // - The sender is the user to chat with and the receiver is the authenticated user
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ]
        });

        // Respond with success and the fetched messages
        return res.status(200).json({ success: true, messages: messages });
    } catch (error) {
        // Handle errors by responding with a 500 status code and an error message
        return res.status(500).json({ success: success, msg: "Internal Server Error" });
    }
};


const sendMessage=async(req,res)=>{
    let success=false;
    try{
        const {text, image}=req.body;
        const {id: receiverId}=req.params
        const senderId=req.user._id;

        let imageUrl;
        if(image){
             const uploadResponse = await cloudinary.uploader.upload(image, {
                  folder: "user_messages",
                  transformation: { width: 300, height: 300, crop: "limit" }, // Resize image
                });
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage= await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        
        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }
        
        return res.status(201).json({success: true, msg: newMessage})
        }
        catch{
            return res.status(500).json({success: success, msg:"Internal Server Error"})
        }
}

module.exports={getUsersForSidebar, getMessages, sendMessage}