import {createContext, useState, useEffect, useContext} from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.baseURL = backendUrl;


const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    //check if user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async () => {
        try{
           const { data } = await axios.get("/api/auth/check", {
               headers: {
                   token: token || localStorage.getItem("token")
               }
           });
           if (data.success) {
            setAuthUser(data.user)
            connectSocket(data.user)
           }
        } catch (error) {
            toast.error(error.message)

        }
    }
//login fun to handle user authentication and socket connection
const login = async (state, credentials)=> {
    try {
        const { data } = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success){
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"] = data.token;
            setToken(data.token);
            localStorage.setItem("token", data.token)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}
//logout function to handle user logout and socket disconnection
const logout = async () =>{
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully")
    socket?.disconnect();
}

//update profile function to handle user profile updates
const updateProfile = async (body)=>{
    console.log("Token:", localStorage.getItem("token"));
    console.log("Sending profile update request");
    console.log("Sending request");
    try{
        const { data } = await axios.put("/api/auth/update-profile", body, {
            headers: {
                token: token || localStorage.getItem("token")
            }
        });
        console.log("updateProfile response:", data);
        if(data.success){
            setAuthUser(data.user);
            return true;
        } else {
            toast.error(data.message);
            return false;
        }
    } catch (error){
        console.error("updateProfile error:", error);
        toast.error(error.message);
        return false;
    }

}

    // Connect socket function to handle socket connection and online users updates
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        
        if(socket) {
            socket.disconnect();
        }

        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUsers(userIds);
        })
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile


    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);