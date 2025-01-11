const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    text:{
        type:String,
    },
    image:{
        type: String
    }
},
{timestamps: true}
)

module.exports=mongoose.model('messages', messageSchema)