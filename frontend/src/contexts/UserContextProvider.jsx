import UserContext from "./createContext";

const UserContextProvider=({children})=>{
    const getUsers=async()=>{
        const response=await fetch('http://localhost:5000/api/messages/users',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        const users=await response.json()
        return users
    }
    const getUserData=async()=>{
        const response=await fetch('http://localhost:5000/api/auth/check',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        const data=await response.json()
        return data
    }
    return (<UserContext.Provider value={{getUserData, getUsers}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider