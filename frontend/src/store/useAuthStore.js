import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore=create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn:false,
    isUpdatingProfile: false,
    isSigningUp: false,
    onlineUsers:[],

    checkAuth: async()=>{
        try{
            const res=await axiosInstance.get("/auth/check",{
                headers:{
                    "auth-token":localStorage.getItem('auth-token')
                }
            })
            set({authUser:res.data.user})
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
            console.log(data.msg)
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp: false})
        }
    },
    
    login:async(data)=>{
        set({isLoggingIn: true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser: res.data.data});
            localStorage.setItem('auth-token',res.data.msg)
            toast.success('Logged in successfully!')
        }catch(error){
            toast.error(error)
        }finally{
            set({isLoggingIn: false})
        }
    },
    logout:()=>{
        localStorage.removeItem('auth-token'),
        authUser=null
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