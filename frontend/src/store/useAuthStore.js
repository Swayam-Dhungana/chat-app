import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"
export const useAuthStore=create((set,get)=>({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn:false,
    isUpdatingProfile: false,
    isSigningUp: false,
    onlineUsers:[],
    socket:null,
    checkAuth: async()=>{
        try{
            const res=await axiosInstance.get("/auth/check",{
                headers:{
                    "auth-token":localStorage.getItem('auth-token')
                }
            })
            set({authUser:res.data.user})
            get().connectSocket()
        }catch(error){
            console.log("Error in check Auth", error)
            set({authUser: null});
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp: true});
        try{
            const res=await axiosInstance.post("/auth/signup",data);
            toast.success('Account Created Sucessfully')
            set({authUser: res.data.data})
            localStorage.setItem('auth-token',res.data.msg)
            get().connectSocket()
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp: false})
        }
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected)return;
        const socket=io("http://localhost:5000",{
            query:{
                userId:authUser._id
            }
        });
        socket.connect()
        set({socket: socket})

        socket.on('getOnlineUsers',(userIds)=>set({onlineUsers :userIds}))


    },

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnected()
    }
    ,
    login:async(data)=>{
        set({isLoggingIn: true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser: res.data.data});
            localStorage.setItem('auth-token',res.data.msg)
            toast.success('Logged in successfully!')
            get().connectSocket()
        }catch(error){
            toast.error(error)
        }finally{
            set({isLoggingIn: false})
        }
    },
    logout:()=>{
        localStorage.removeItem('auth-token'),
        authUser=null,
        get().disconnectSocket()
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put(
                "/auth/update-profile", 
                data, // Pass `data` as the second argument
                {
                    headers: {
                        "auth-token": localStorage.getItem('auth-token')
                    }
                }
            );
            set({ authUser: res.data.msg });
            toast.success('Profile Updated Successfully')
        } catch (error) {
            // Display a more descriptive error message if available
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))