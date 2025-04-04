const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
        profilePic:{
            type: String,
            default: ""
        }
},
    {timestamps: true}
)

module.exports=mongoose.model('user', UserSchema)