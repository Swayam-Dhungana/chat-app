import UserContext from "./createContext";

const UserContextProvider=({children})=>{
    const checkAuth=async()=>{
        const response=(fetch('http://localhost:5000/api/auth/check'),{
            method: 'GET',
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
        }
    )
    const json=await response.json()
    if (json.success)return json.user
    }
 


    return (<UserContext.Provider value={checkAuth}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider