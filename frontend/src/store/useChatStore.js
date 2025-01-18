import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore=create((set,get)=>({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers:async()=>{
        set({isUsersLoading: true});
        try{
            const res=await axiosInstance.get("/messages/users",{
                headers:{
                    "auth-token":localStorage.getItem('auth-token')
                }
            })
            set({users: res.data})
        }catch{
            toast.error("Error fetching users");
        }finally{
            set({isUsersLoading: false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading: true});
        try{
            const res=await axiosInstance.get(`/messages/${userId}`,{
                headers:{
                    "auth-token":localStorage.getItem('auth-token')
                }
            });
            set({messages: res.data.messages})
        }catch{
            toast.error("Error fetching messages");
        }finally{
            set({isMessagesLoading: false})
        }
    },
    sendMessage:async(messageData)=>{
        const {selectedUser, messages}=get()
        try{
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData,{
                headers:{
                    "auth-token":localStorage.getItem('auth-token')
                }
            })
            set({messages:[...messages,res.data.msg]})
        }catch(error){
            console.log(error)
            toast('Error sending message', error)
        }
    }
    ,
    setSelectedUser:(selectedUser)=>set({selectedUser})
}))